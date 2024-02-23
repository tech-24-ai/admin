/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// material ui icons
import MailOutline from "@material-ui/icons/Business";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import MyForm from "components/Form";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from "react-redux";
import { crudActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";
import {
  STATIC_PLAN_DURATION,
  EU_SUBSCRIPTION_CATEGORY,
} from "../../../_constants/form.constants";
import { PLAN_TYPE } from "../../../_constants/form.constants";
import { STATUS } from "../../../_constants/form.constants";

const initialState = {
  id: "new",
  form: {
    plan_name: "",
    plan_duration: "",
    plan_price: "",
    current_price_or_special_price: "",
    plan_category: "",
    paypal_plan_id: "",
    description1: "",
    description2: "",
    description3: "",
    description4: "",
  },
};
class PricingModelForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }

  handleInputChange(event) {
    const newState = Object.assign({}, this.state);
    newState.form[event.target.name] = event.target.value;
    this.setState(newState);
    this.handleError();
  }

  getFormFields = () => {
    const { form } = this.state;
    const formFields = [
      {
        name: "plan_name",
        label: "Plan Name",
        type: "textbox",
        value: form.plan_name || "",
        icon: "assignment",
        error: this.validator.message("name", form.plan_name, "required"),
      },
      {
        name: "plan_duration",
        label: "Plan Duration",
        type: "select",
        options: STATIC_PLAN_DURATION,
        value: form.plan_duration || "",
        icon: "assignment",
        error: this.validator.message(
          "plan_duration",
          form.plan_duration,
          "required"
        ),
      },
      {
        name: "plan_price",
        label: "Plan Price",
        type: "textbox",
        value: form.plan_price || "",
        icon: "assignment",
        error: this.validator.message(
          "plan price",
          form.plan_price,
          "required|numeric"
        ),
      },
      {
        name: "current_price_or_special_price",
        label: "Special Price",
        type: "textbox",
        value: form.current_price_or_special_price || "",
        icon: "assignment",
        error: this.validator.message(
          "special price",
          form.current_price_or_special_price,
          "required|numeric"
        ),
      },
      {
        name: "plan_category",
        label: "Plan Category",
        type: "select",
        options: EU_SUBSCRIPTION_CATEGORY,
        value: form.plan_category || "",
        icon: "assignment",
        error: this.validator.message(
          "plan_category",
          form.plan_category,
          "required"
        ),
      },
      {
        name: "description1",
        label: "Description1",
        type: "textbox",
        value: form.description1 || "",
        icon: "assignment",
        error: this.validator.message(
          "description1",
          form.description1,
          "required|min:10"
        ),
      },
      {
        name: "description2",
        label: "Description2",
        type: "textbox",
        value: form.description2 || "",
        icon: "assignment",
        error: this.validator.message(
          "description2",
          form.description2,
          "required|min:10"
        ),
      },
      {
        name: "description3",
        label: "Description3",
        type: "textbox",
        value: form.description3 || "",
        icon: "assignment",
        error: this.validator.message(
          "description3",
          form.description3,
          "required|min:10"
        ),
      },
      {
        name: "description4",
        label: "Description4",
        type: "textbox",
        value: form.description4 || "",
        icon: "assignment",
        error: this.validator.message(
          "description4",
          form.description4,
          "required|min:10"
        ),
      },
      {
        name: "is_active",
        label: "Is Active",
        type: "select",
        options: STATUS,
        value: form.is_active || "",
        icon: "assignment",
        error: this.validator.message("is_active", form.is_active, "required"),
      },
      {
        name: "paypal_plan_id",
        label: "Paypal Plan Id",
        type: "textbox",
        value: form.paypal_plan_id || "",
        icon: "assignment",
      },
    ];

    return formFields;
  };

  getValue(val) {
    const { id } = this.props.match.params;
    if (id && id === "new") {
      return val;
    } else {
      if (null === val) {
        return "";
      } else {
        return val;
      }
    }
  }

  handleError() {
    this.validator.showMessages();
    this.forceUpdate();
  }

  goBack = () => {
    this.props.history.goBack();
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      let data = {
        plan_name: this.state.form.plan_name,
        plan_duration: this.state.form.plan_duration,
        plan_price: this.state.form.plan_price,
        current_price_or_special_price: this.state.form
          .current_price_or_special_price,
        plan_category: this.state.form.plan_category,
        is_active: this.state.form.is_active,
        paypal_plan_id: this.state.form.paypal_plan_id,
        description1: this.state.form.description1,
        description2: this.state.form.description2,
        description3: this.state.form.description3,
        description4: this.state.form.description4,
      };
      const { id } = this.props.match.params;
      if (id && id === "new") {
        this.props.create("formData", "eusubscription/eu_plans", data);
      } else {
        this.props.update("formData", "eusubscription/eu_plans", id, data);
      }
      this.resetForm();
      this.goBack();
    } else {
      this.handleError();
    }
  }

  resetForm = () => {
    const { form } = this.state;
    const formFields = this.getFormFields();
    if (formFields) {
      formFields.forEach((element) => {
        form[element.name] = null;
      });
    }
    this.setState(form);
    this.props.clearCrud("form");
  };

  bindData = () => {
    const { id } = this.props.match.params;
    if (id && id !== "new") {
      crudService._get("eusubscription/eu_plans", id).then((response) => {
        if (response.status === 200) {
          this.setState({
            form: response.data,
          });
        }
      });
    }
  };

  componentDidMount() {
    this.bindData();
  }

  render() {
    const { classes } = this.props;
    const { id } = this.props.match.params;
    let title = "Add Subscription Plan";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Subscription Plan Details";
      btnText = "Update";
    }

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <MailOutline />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>{title}</h4>
            </CardHeader>
            <CardBody>
              <MyForm
                handleInputChange={this.handleInputChange}
                formFields={this.getFormFields()}
                handleSubmit={this.handleSubmit}
                handleCancel={this.goBack}
                btnText={btnText}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

PricingModelForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { form, confirm } = state;
  return {
    form,
    confirm,
  };
};

const actionCreators = {
  getAll: crudActions._getAll,
  getCrud: crudActions._get,
  clearCrud: crudActions._clear,
  create: crudActions._create,
  update: crudActions._update,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actionCreators
  )(PricingModelForm)
);

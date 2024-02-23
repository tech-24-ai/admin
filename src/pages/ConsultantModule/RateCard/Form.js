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
// import { YEAR, COMPANY_TYPE } from "../../../_constants/form.constants";
import Button from "@material-ui/core/Button";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from "react-redux";
import { crudActions, loaderActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";
import Icon from "@material-ui/core/Icon";

const initialState = {
  id: "new",
  form: {
    skill_id: "",
    amount_per_hour: "",
    min_minute: "",
    max_minute: "",
    from_year: "",
    is_present: "",
  },
};
class RateCardForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }

  handleInputChange(event) {
    const newState = Object.assign({}, this.state);
    if (event.target.type == "checkbox") {
      newState.form[event.target.name] = event.target.checked ? "Active" : "";
    } else {
      newState.form[event.target.name] = event.target.value;
    }
    this.setState(newState);
    this.handleError();
  }

  getFormFields = () => {
    const { form } = this.state;
    const formFields = [
      {
        name: "skill_id",
        label: "Skill",
        type: "autocomplete",
        url: "skills?only_parent=true",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.skill_id,
        option: { label: form.skill_id, value: form.skill_id },
        error: this.validator.message("skill_id", form.skill_id, "required"),
      },
      {
        name: "amount_per_hour",
        label: "Amount Per Hour",
        type: "textbox",
        value: form.amount_per_hour || "",
        icon: "assignment",
        error: this.validator.message(
          "amount_per_hour",
          form.amount_per_hour,
          "required"
        ),
      },
      {
        name: "min_minute",
        label: "Min Minute",
        type: "textbox",
        value: form.min_minute || "",
        icon: "assignment",
        error: this.validator.message(
          "min_minute",
          form.min_minute,
          "min:2|max:3"
        ),
      },
      {
        name: "max_minute",
        label: "Max Minute",
        type: "textbox",
        value: form.max_minute || "",
        icon: "assignment",
        error: this.validator.message(
          "max_minute",
          form.max_minute,
          "min:2|max:3"
        ),
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

  // goBack = () => {
  //     this.props.history.push(`/admin/rate-card`);
  // };
  goBack = () => {
    this.props.history.goBack();
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      const { childId, id } = this.props.match.params;
      let data = {
        consultant_id: id,
        amount_per_hour: this.state.form.amount_per_hour,
        min_minute: this.state.form.min_minute,
        max_minute: this.state.form.max_minute,
        skill_id: this.state.form.skill_id,
      };
      if (childId && childId === "new") {
        this.props.create("formData", "consultants/rate-card", data);
        this.goBack();
      } else {
        this.props.update("formData", "consultants/rate-card", childId, data);
      }
    } else {
      this.handleError();
    }
  }

  bindData = () => {
    const { childId } = this.props.match.params;
    if (childId && childId !== "new") {
      crudService._get("consultants/rate-card", childId).then((response) => {
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
    const { id, childId } = this.props.match.params;
    let title = "Add Rate Card";
    let btnText = "Create";
    if (childId && childId !== "new") {
      title = "Edit Rate Card Details";
      btnText = "Update";
    }
    // console.log("id", id);
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

RateCardForm.propTypes = {
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
  getAllParam: crudActions._getAllWithParam,
  clearCrud: crudActions._clear,
  create: crudActions._create,
  update: crudActions._update,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actionCreators
  )(RateCardForm)
);

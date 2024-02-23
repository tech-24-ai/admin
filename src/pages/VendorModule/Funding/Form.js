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

const initialState = {
  id: "new",
  form: {
    type_of_funding: "",
    funded_by: "",
    date_of_funding: new Date(),
    currency: "",
    funding_amount: ""
  },
};
class FundingForm extends React.PureComponent {
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
        name: "type_of_funding",
        label: "Type of Funding",
        type: "textbox",
        value: form.type_of_funding || "",
        icon: "assignment",
        error: this.validator.message("type_of_funding", form.type_of_funding, "required|min:3"),
      },
      {
        name: "funded_by",
        label: "Funded By",
        type: "textbox",
        value: form.funded_by || "",
        icon: "assignment",
        error: this.validator.message(
          "funded_by",
          form.funded_by,
          "required|min:3"
        ),
      },
      {
        name: "date_of_funding",
        label: "Date of funding",
        type: "date",
        value: form.date_of_funding || "",
        icon: "assignment",
        error: this.validator.message("date_of_funding", form.date_of_funding, "required|min:3"),
      },
      {
        name: "currency",
        label: "Currency",
        type: "autocomplete",
        url: "currency",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.currency,
        option: { label: form.country, value: form.currency },
        error: this.validator.message(
          "currency",
          form.currency,
          "required"
        ),
      },
      {
        name: "funding_amount",
        label: "Funding Amount",
        type: "textbox",
        value: form.funding_amount || "",
        icon: "assignment",
        error: this.validator.message(
          "funding_amount",
          form.funding_amount,
          "required"
        ),
      }
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
      const { childId, id } = this.props.match.params;
      let data = {
        type_of_funding: this.state.form.type_of_funding,
        funded_by: this.state.form.funded_by,
        date_of_funding: this.state.form.date_of_funding,
        vendor_id: id,
        currency: this.state.form.currency,
        funding_amount: this.state.form.funding_amount
      };
      if (childId && childId === "new") {
        this.props.create("formData", `funding-list/${this.props.match.params}`, data);
      } else {
        this.props.update("formData", `funding-list/${this.props.match.params}`, childId, data);
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
    const { childId } = this.props.match.params;
    if (childId && childId !== "new") {
      crudService._get(`funding-list/${this.props.match.params}`, childId).then((response) => {
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
    let title = "Add Funding Details";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Funding Details";
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

FundingForm.propTypes = {
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
  )(FundingForm)
);

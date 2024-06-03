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
import moment from "moment";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from "react-redux";
import { crudActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";
import { STATUS } from "../../../_constants/form.constants";

const initialState = {
  id: "new",
  form: {
    user_id: "",
    user_name: "",
    subscription_start_date: new Date(),
    subscription_end_date: new Date(),
    plan_id: "",
    plan_name: "",
    transactions: {
      payment_transaction_id: "",
      transaction_date: new Date(),
      transaction_amount: "",
      transaction_details: "",
    },
  },
  formFields: [],
};
class EuSubscriptionForm extends React.PureComponent {
  formFields = [];

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    const { form } = initialState;

    this.state = { ...initialState };
  }

  handleInputChange(event) {
    const newState = Object.assign({}, this.state);
    newState.form[event.target.name] = event.target.value;
    if (
      event.target.name == "payment_transaction_id" ||
      event.target.name == "transaction_date" ||
      event.target.name == "transaction_amount" ||
      event.target.name == "transaction_details"
    ) {
      newState.form.transactions[event.target.name] = event.target.value;
    }
    this.setState(newState);
    this.handleError();
  }

  getFormFields = () => {
    const { form } = this.state;
    const { id } = this.state;
    let formFields = [
      {
        name: "user_id",
        label: "Choose User",
        type: "autocomplete",
        url: "visitors",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.user_id,
        option: { label: form.user_name, value: form.user_id },
        readonly: id === "new" ? false : true,
        disabled: id === "new" ? false : true,
        error: this.validator.message("user_id", form.user_id, "required"),
      },

      {
        name: "plan_id",
        label: "Choose Plan",
        type: "autocomplete",
        url: "eusubscription/eu_plans",
        getOptionLabel: "plan_name",
        getOptionValue: "id",
        value: form.plan_id,
        readonly: id === "new" ? false : true,
        disabled: id === "new" ? false : true,
        option: { label: form.plan_name, value: form.plan_id },
        error: this.validator.message("plan_id", form.plan_id, "required"),
      },

      {
        name: "subscription_start_date",
        label: "Select Start Date",
        type: "date",
        value: form.subscription_start_date || new Date(),
        readonly: id === "new" ? false : true,
        disabled: id === "new" ? false : true,
        error: this.validator.message(
          "subscription_start_date",
          form.subscription_start_date,
          "required"
        ),
      },
      {
        name: "subscription_end_date",
        label: "Select End Date",
        type: "date",
        value: form.subscription_end_date || new Date(),
        readonly: id === "new" ? false : true,
        disabled: id === "new" ? false : true,
        error: this.validator.message(
          "subscription_end_date",
          form.subscription_end_date,
          "required"
        ),
      },

      {
        name: "payment_transaction_id",
        label: "Payment Transaction Id",
        type: "textbox",
        icon: "assignment",
        value: form.transactions?.payment_transaction_id || "",
        readonly: id === "new" ? false : true,
        disabled: id === "new" ? false : true,
        error: this.validator.message(
          "payment_transaction_id",
          form.transactions?.payment_transaction_id,
          "required"
        ),
      },
      {
        name: "transaction_date",
        label: "Payment Transaction Date",
        type: "date",
        value: form.transactions?.transaction_date || new Date(),
        readonly: id === "new" ? false : true,
        disabled: id === "new" ? false : true,
        error: this.validator.message(
          "Payment Transaction Date",
          form.transactions?.transaction_date,
          "required"
        ),
      },
      {
        name: "transaction_amount",
        label: "Amount",
        type: "textbox",
        value: form.transactions?.transaction_amount || "",
        error: this.validator.message(
          "Amount",
          form.transactions?.transaction_amount,
          "required"
        ),
      },
      {
        name: "transaction_details",
        label: "Transaction Details",
        type: "textbox",
        value: form.transactions?.transaction_details || "",
        error: this.validator.message(
          "Transaction Details",
          form.transactions?.transaction_details,
          ""
        ),
      },
    ];

    return formFields || [];
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
      let transaction = {
        transaction_amount: this.state.form.transactions.transaction_amount,
        transaction_date: this.state.form.transactions.transaction_date,
        payment_transaction_id: this.state.form.transactions
          .payment_transaction_id,
        transaction_details: this.state.form.transactions.transaction_details,
        user_id: this.state.form.user_id,
        type: 1,
      };

      let data = {
        user_id: this.state.form.user_id,
        subscription_start_date: this.state.form.subscription_start_date,
        subscription_end_date: this.state.form.subscription_end_date,
        plan_id: this.state.form.plan_id,
        type: 1,
        transaction: JSON.stringify(transaction),
      };

      const { id } = this.props.match.params;
      if (id && id === "new") {
        this.props.create("formData", "eusubscription/subscriptions", data);
      } else {
        this.props.update("formData", "eusubscription/subscriptions", id, data);
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
    // Old Code

    // if (formFields) {
    //   formFields.forEach((element) => {
    //     console.log("Element", element);
    //     form[element.name] = null;
    //   });
    // }

    form &&
      Object.entries(form).forEach(([key, value]) => {
        if (typeof value == "object") {
          if (key === "plans" || key === "transactions") {
            Object.entries(value).forEach(([key2, value2]) => {
              form[key][key2] = null;
            });
          }
        } else {
          form[key] = null;
        }
      });
    this.setState(form);
    this.props.clearCrud("form");
  };

  bindData = () => {
    const { id } = this.props.match.params;
    if (id && id !== "new") {
      crudService._get("eusubscription/subscriptions", id).then((response) => {
        if (response.status === 200) {
          let formData = {
            ...response.data[0],
            subscription_end_date: moment(
              response.data[0].subscription_end_date,
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            subscription_start_date: moment(
              response.data[0].subscription_start_date,
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
          };
          this.setState((prevState) => ({
            form:
              response.data && response.data.length > 0
                ? formData
                : prevState.form,
          }));
          //this.setState({form.transaction_amount : form.transactions.transaction_amount})
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

EuSubscriptionForm.propTypes = {
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
  )(EuSubscriptionForm)
);

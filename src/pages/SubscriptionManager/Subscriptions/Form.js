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

const initialState = {
  id: "new",
  form: {
    user_id: "",
    subscription_start_date: new Date(),
    subscription_end_date: new Date(),
    segment_id: "0",
    plan_id: "",
    countries: [],
    modules: [],
    country_groups: [],
    transactions: {
      payment_transaction_id: "",
      transaction_date: new Date(),
      transaction_amount: "",
      transaction_details: "",
    },
  },
  formFields: [],
};
class PricingModelForm extends React.PureComponent {
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
    console.log("Event", event);
    newState.form[event.target.name] = event.target.value;
    if (
      event.target.name == "payment_transaction_id" ||
      event.target.name == "transaction_date" ||
      event.target.name == "transaction_amount" ||
      event.target.name == "transaction_details"
    ) {
      newState.form.transactions[event.target.name] = event.target.value;
    }

    if (event.target.name == "segment_id") {
      newState.form.plan_id = "";
    }
    this.setState(newState);
    this.handleError();
  }

  isDisabled(val) {
    return val !== "new";
  }

  getFormFields = () => {
    const { form } = this.state;
    const { id } = this.props.match.params;

    let formFields = [
      {
        name: "user_id",
        label: "Choose User",
        type: "autocomplete",
        url: "investors",
        getOptionLabel: "name",
        getOptionValue: "id",
        disabled: this.isDisabled(id),
        value: form.user_id,
        option: { label: form.country, value: form.user_id },
        error: this.validator.message("user_id", form.user_id, "required"),
      },
      {
        name: "segment_id",
        label: "Choose MI Segment",
        type: "autocomplete",
        url: "mi-segment",
        getOptionLabel: "name",
        getOptionValue: "id",
        disabled: this.isDisabled(id),
        value: form.segment_id,
        option: { label: form.country, value: form.segment_id },
        error: this.validator.message(
          "segment_id",
          form.segment_id,
          "required"
        ),
      },
      {
        name: "plan_id",
        label: "Choose Plan",
        type: "autocomplete",
        url: "subscription/market_plans?segment_id=" + form.segment_id,
        getOptionLabel: "plan_name",
        getOptionValue: "id",
        disabled: this.isDisabled(id),
        value: form.plan_id,
        option: { label: form.country, value: form.plan_id },
        error: this.validator.message("plan_id", form.plan_id, "required"),
      },
      {
        name: "modules",
        label: "Choose Market",
        type: [1, 2, 3, 4].includes(this.state.form.segment_id)
          ? "treebox"
          : "NA",
        url: "app/module/categories?not_categories=[5]",
        getOptionLabel: "name",
        getOptionValue: "id",
        disabled: this.isDisabled(id),
        value: form.modules,
        error: "",
      },
      {
        name: "countries",
        label: "Select Country",
        type: [1, 3].includes(this.state.form.segment_id)
          ? "multiSelect"
          : "NA",
        url: "countries",
        getOptionLabel: "name",
        getOptionValue: "id",
        option: form.countries,
        value: form.countries || [],
        disabled: this.isDisabled(id),
        icon: "assignment",
        error: this.validator.message(
          "countries",
          form.countries,
          [1, 3].includes(this.state.form.segment_id) ? "required" : ""
        ),
      },
      {
        name: "country_groups",
        label: "Select Region",
        type: [1, 5].includes(this.state.form.segment_id)
          ? "multiSelect"
          : "NA",
        url: "country_groups",
        getOptionLabel: "name",
        getOptionValue: "id",
        option: form.country_groups,
        value: form.country_groups || [],
        disabled: this.isDisabled(id),
        icon: "assignment",
        error: this.validator.message(
          "country_groups",
          form.country_groups,
          [1, 5].includes(this.state.form.segment_id) ? "required" : ""
        ),
      },
      {
        name: "subscription_start_date",
        label: "Select Start Date",
        type: "date",
        value: form.subscription_start_date,
        disabled: this.isDisabled(id),
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
        value: form.subscription_end_date,
        disabled: this.isDisabled(id),
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
        disabled: this.isDisabled(id),
        value: form.transactions.payment_transaction_id || "",
        error: this.validator.message(
          "payment_transaction_id",
          form.transactions.payment_transaction_id,
          "required"
        ),
      },
      {
        name: "transaction_date",
        label: "Payment Transaction Date",
        type: "date",
        value: form.transactions.transaction_date,
        disabled: this.isDisabled(id),
        error: this.validator.message(
          "payment_transaction_date",
          form.transactions.transaction_date,
          "required"
        ),
      },
      {
        name: "transaction_amount",
        label: "Amount",
        type: "textbox",
        disabled: this.isDisabled(id),
        value: form.transactions.transaction_amount || "",
        error: this.validator.message(
          "transaction_amount",
          form.transactions.transaction_amount,
          "required"
        ),
      },
      {
        name: "transaction_details",
        label: "Transaction Details",
        type: "textbox",
        disabled: this.isDisabled(id),
        value: form.transactions.transaction_details || "",
        error: this.validator.message(
          "Transaction Details",
          form.transactions.transaction_details,
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
        transcation_amount: this.state.form.transactions.transaction_amount,
        transcation_date: this.state.form.transactions.transaction_date,
        payment_transcation_id: this.state.form.transactions
          .payment_transaction_id,
        transcation_details: this.state.form.transactions.transaction_details,
        user_id: this.state.form.user_id,
        type: 1,
      };

      let data = {
        user_id: this.state.form.user_id,
        subscription_start_date: this.state.form.subscription_start_date,
        subscription_end_date: this.state.form.subscription_end_date,
        plan_id: this.state.form.plan_id,
        modules: JSON.stringify(this.state.form.modules),
        countries: JSON.stringify(this.state.form.countries),
        country_groups: JSON.stringify(this.state.form.country_groups),
        transaction: JSON.stringify(transaction),
      };

      const { id } = this.props.match.params;
      if (id && id === "new") {
        this.props.create(
          "formData",
          "subscription/subscriptionsData?is_admin=1",
          data
        );
      } else {
        this.props.update(
          "formData",
          "subscription/subscriptionsData?is_admin=1",
          id,
          data
        );
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
    // if (formFields) {
    //   formFields.forEach((element) => {
    //     form[element.name] = null;
    //   });
    // }
    form &&
      Object.entries(form).forEach(([key, value]) => {
        if (typeof value == "object") {
          if (key === "plans" || key === "transactions") {
            Object.entries(value).forEach(([key2, value2]) => {
              if (key2 === "transaction_date") {
                form[key][key2] = new Date();
              } else {
                form[key][key2] = null;
              }
            });
          }
        } else {
          if (
            key === "subscription_start_date" ||
            key === "subscription_end_date"
          ) {
            form[key] = new Date();
          } else {
            form[key] = null;
          }
        }
      });
    this.setState(form);
    this.props.clearCrud("form");
  };

  bindData = () => {
    const { id } = this.props.match.params;
    if (id && id !== "new") {
      crudService._get("subscription/subscriptions", id).then((response) => {
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
            segment_id: response.data[0].plans.segment_id,
          };
          this.setState((prevState) => ({
            form:
              response.data && response.data.length > 0
                ? formData
                : prevState,
          }));
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
    let displayAddBtn = true;
    if (id && id !== "new") {
      title = "Edit Subscription Plan Details";
      btnText = "Update";
      displayAddBtn = false;
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
                displayAddBtn={displayAddBtn}
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

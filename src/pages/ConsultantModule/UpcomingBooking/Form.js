/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import moment from "moment";

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
import {
  CO_TRANSACTION_TYPE,
  BOOKING_STATUS_TYPE,
  DURATION_TYPE,
  SKILL_TYPE,
} from "../../../_constants/form.constants";
// import { YEAR, COMPANY_TYPE } from "../../../_constants/form.constants";
import Button from "@material-ui/core/Button";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from "react-redux";
import { crudActions, loaderActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";
import Icon from "@material-ui/core/Icon";
import { UserHelper } from "_helpers";

const initialState = {
  id: "new",
  form: {
    consultant: {
      first_name: "",
      consultant_id: "",
    },
    visitor_id: "",
    consultant_id: "",
    transaction: {
      type: "",
      total_amount: 0,
      sub_amount: 0,
      transaction_details: "",
      transaction_date: moment().format("YYYY-MM-DD"),
      paypal_transaction_id: "",
      taxes: "",
    },
    amount_per_min: 0,
    skill: "",
    is_credit: false,
    remarks: "",
    duration: 0,
    booking_date: moment().format("YYYY-MM-DD"),
    booking_time: "",
    visitor_time_zone_id: "",
  },
};
class UpcomingBookingForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }

  checkValue(val) {
    return val || "";
  }

  getFormFields = () => {
    const { form } = this.state;
    const formFields = [];
    const { id, childId } = this.props.match.params;
    const consultantId = id ? id : this.state.form.consultant_id;
    if (!id && childId) {
      formFields.push({
        name: "consultant_id",
        label: "Consultant Name",
        value: this.checkValue(form.consultant_id),
        type: "autocomplete",
        url: "consultants",
        icon: "assignment",
        getOptionLabel: "first_name",
        getOptionValue: "id",
        error: this.validator.message(
          "consultant_id",
          form.consultant_id,
          "required"
        ),
      });
    }

    formFields.push(
      {
        name: "visitor_id",
        label: "Visitor Name",
        type: "autocomplete",
        url: "visitors",
        value: this.checkValue(form.visitor_id),
        icon: "assignment",
        getOptionLabel: "name",
        getOptionValue: "id",
        error: this.validator.message(
          "visitor_id",
          form.visitor_id,
          "required"
        ),
      },
      {
        name: "visitor_time_zone_id",
        label: "Visitor Timezone",
        type: "time_zone_autocomplete",
        url: "time-zone",
        getOptionLabel: ["offset", "name"],
        getOptionValue: "id",
        value: this.checkValue(form.visitor_time_zone_id),
        icon: "assignment",
        error: this.validator.message(
          "visitor_time_zone_id",
          form.visitor_time_zone_id,
          "required"
        ),
      },
      {
        name: "booking_date",
        label: "Booking Date",
        type: "date",
        value: form.booking_date,
        icon: "assignment",
        error: this.validator.message(
          "booking_date",
          form.booking_date,
          "required"
        ),
      }
    );
    if (childId != "new") {
      formFields.push(
        {
          name: "skill",
          label: "Skill",
          type: "textbox",
          value: this.checkValue(form.skill),
          icon: "assignment",
        },
        {
          name: "duration",
          label: "Duration",
          type: "textbox",
          value: this.checkValue(form.duration),
          icon: "assignment",
        },
        {
          name: "booking_time",
          label: "Start Time",
          type: "textbox",
          value: this.checkValue(form.booking_time),
          icon: "assignment",
        }
      );
    } else {
      formFields.push(
        {
          name: "skill",
          label: "Skill",
          type: "group_autocomplete",
          url: "consultants/rate-card",
          getOptionLabel: "skill",
          getOptionValue: "skill",
          getOptionAmount: "amount_per_min",
          value: this.checkValue(form.skill),
          icon: "assignment",
          options: [
            {
              name: "consultant_id",
              // value: this.props.match.params.id,
              value: consultantId,
            },
          ],
          error: this.validator.message("skill", form.skill, "required"),
        },
        {
          name: "duration",
          label: "Duration",
          type: "group_autocomplete",
          url: "consultants/duration",
          // getOptionLabel: "skill",
          // getOptionValue: "id",
          value: form.duration || "",
          icon: "assignment",
          options: [
            {
              name: "consultant_id",
              value: consultantId,
            },
            {
              name: "skill",
              value: form.skill,
            },
          ],
          error: this.validator.message("skill", form.skill, "required"),
        },
        {
          name: "booking_time",
          label: "Start Time",
          type: "slot_autocomplete",
          url: "consultants/available-slots",
          getOptionLabel: "start",
          getOptionValue: "start",
          value: form.booking_time || "",
          icon: "assignment",
          options: [
            {
              name: "consultant_id",
              value: consultantId,
            },
            {
              name: "duration",
              value: form.duration || 30,
            },
            {
              name: "date",
              value: form.booking_date,
            },
          ],
          error: this.validator.message(
            "booking_time",
            form.booking_time,
            "required"
          ),
        }
      );
    }

    formFields.push(
      {
        name: "amount_per_min",
        label: "Amount Per Min",
        value: this.checkValue(form.amount_per_min),
        icon: "assignment",
        type: "textbox",
        readOnly: true,
        disabled: true,
      },
      {
        name: "sub_amount",
        label: "Sub Amount",
        type: "textbox",
        value: this.checkValue(form.transaction.sub_amount),
        icon: "assignment",
        readOnly: true,
        disabled: true,
        error: this.validator.message(
          "sub_amount",
          form.transaction.sub_amount,
          "required"
        ),
      },

      {
        name: "taxes",
        label: "Taxes",
        type: "textbox",
        value: this.checkValue(form.transaction.taxes),
        icon: "assignment",
        // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
      },
      {
        name: "total_amount",
        label: "Total Amount",
        type: "textbox",
        value: this.checkValue(form.transaction.total_amount),
        icon: "assignment",
        readOnly: true,
        disabled: true,
        error: this.validator.message(
          "total_amount",
          form.transaction.total_amount,
          "required"
        ),
      },
      {
        name: "paypal_transaction_id",
        label: "Paypal Transaction Id",
        type: "textbox",
        value: this.checkValue(form.transaction.paypal_transaction_id),
        icon: "assignment",
        // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
      },
      {
        name: "transaction_details",
        label: "Transaction Details",
        type: "textbox",
        value: this.checkValue(form.transaction.transaction_details),
        icon: "assignment",
        readonly: true,
        // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
      },
      {
        name: "transaction_date",
        label: "Transaction Date",
        type: "date",
        value: this.checkValue(form.transaction.transaction_date),
        icon: "assignment",
        // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
      },

      {
        name: "type",
        label: "Type",
        type: "select",
        options: CO_TRANSACTION_TYPE,
        value: form.transaction.type || "",
        icon: "assignment",
        error: this.validator.message(
          "type",
          form.transaction.type,
          "required"
        ),
      },
      {
        name: "is_credit",
        label: "Is Credit",
        type: "checkbox",
        value: form.is_credit ? true : false,
      },
      {
        name: "remarks",
        label: "Remarks",
        type: "textbox",
        value: this.checkValue(form.remarks),
        icon: "assignment",
        // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
      }
    );

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

  handleCheckboxChange(newState, event) {
    newState.form[event.target.name] = event.target.checked;
  }

  handleInputChangeEvent(newState, event) {
    const isNumeric = value => !isNaN(Number(value));
    const name = event.target.name;
    const value = isNumeric(event.target.value) ? Number(event.target.value) : event.target.value;

    if (name === "taxes") {
      newState.form.transaction["total_amount"] =
      Number(newState.form.transaction["sub_amount"]) + Number(value);
    } else if (name === "type" || name === "paypal_transaction_id" || name === "transaction_details" || name === "transaction_date") {
        newState.form.transaction[name] = value;
    } else {
      newState.form[name] = value;
      if (name === "skill" && event.target.amount) {
          newState.form["amount_per_min"] = event.target.amount;
          const subAmt = Number(this.state.form.duration) * Number(event.target.amount);
          newState.form.transaction["sub_amount"] = subAmt;
          newState.form.transaction["total_amount"] = subAmt + Number(this.state.form.transaction.taxes);
      } else if (name === "duration") {
          const subAmt = Number(this.state.form.amount_per_min) * Number(value);
          newState.form.transaction["sub_amount"] = subAmt;
          newState.form.transaction["total_amount"] = subAmt + Number(this.state.form.transaction.taxes);
      }
    }
  }

  handleInputChange(event) {
    const newState = Object.assign({}, this.state);

    if (event.target.type === "checkbox") {
      this.handleCheckboxChange(newState, event);
    } else {
      this.handleInputChangeEvent(newState, event);
    }
  
    this.setState(newState);
    this.handleError();
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
        consultant_id: id ? id : this.state.form.consultant_id,
        visitor_id: this.state.form.visitor_id,
        visitor_time_zone_id: this.state.form.visitor_time_zone_id,
        amount_per_min: this.state.form.amount_per_min,
        duration: this.state.form.duration,
        skill: this.state.form.skill,
        remarks: this.state.form.remarks,
        booking_date: this.state.form.booking_date,
        type: this.state.form.transaction.type,
        taxes: this.state.form.transaction.taxes,
        booking_time: this.state.form.booking_time,
        total_amount: this.state.form.transaction.total_amount,
        total_payment: this.state.form.total_payment,
        sub_amount: this.state.form.transaction.sub_amount,
        transaction_details: this.state.form.transaction.transaction_details,
        transaction_date: this.state.form.transaction.transaction_date,
      };

      if (UserHelper.isConsultant()) {
        // if (id && id === "new") {
        //   this.props.create("formData", "consultants/booking", data);
        //   this.goBack();
        // } else {
        //   this.props.update("formData", "consultants/booking", id, data);
        // }
      } else {
        if (childId && childId === "new") {
          this.props.create("formData", "consultants/booking", data);
          this.goBack();
        } else {
          // this.props.update("formData", "consultants/booking", childId, data);
        }
      }
      this.resetForm();
      this.goBack();
    } else {
      this.handleError();
    }
  }

  bindData = () => {
    const { childId, id } = this.props.match.params;
    console.log("Param", this.props.match.params);
    if (childId && childId !== "new") {
      crudService._get("consultants/booking", childId).then((response) => {
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
    let title = "Add Booking";
    let btnText = "Create";
    if (childId && childId !== "new") {
      title = "Edit Booking Details";
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
                displayAddBtn={childId && childId !== "new" ? false : true}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

UpcomingBookingForm.propTypes = {
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
  )(UpcomingBookingForm)
);

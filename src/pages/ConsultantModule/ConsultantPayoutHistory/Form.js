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
import { UserHelper } from "_helpers";

const initialState = {
  id: "new",
  form: {
    consultant_id: "",
    transaction_details: "",
    total_payment: "",
    payment_date: "",
    remarks: "",
    option_type: "textbox",
  },
  dynamicForm: [],
  bookingIds: [],
};
class ConsultantPayoutHistoryForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
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
        value: form.consultant_id || "",
        icon: "assignment",
        type: "autocomplete",
        url: "consultants",
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
        name: "transaction_details",
        label: "Transaction Details",
        type: "textbox",
        value: form.transaction_details || "",
        icon: "assignment",
        // error: this.validator.message("image", form.image, "required"),
      },
      {
        name: "total_payment",
        label: "Total Payment",
        type: "textbox",
        value: form.total_payment || "",
        icon: "assignment",
        error: this.validator.message(
          "total_payment",
          form.total_payment,
          "required"
        ),
      },
      {
        name: "payment_date",
        label: "Payment Date",
        type: "date",
        value: form.payment_date || "",
        icon: "assignment",
        error: this.validator.message(
          "payment_date",
          form.payment_date,
          "required"
        ),
      },
      {
        name: "remarks",
        label: "Remarks",
        type: "textbox",
        value: form.remarks || "",
        icon: "assignment",
        // error: this.validator.message("image", form.image, "required"),
      },
      {
        name: "bookingIds",
        label: "Pending Bookings",
        type: "dynamicTableList",
        url: "consultants/unpaid-booking",
        getOptionLabel: "booking_id",
        getOptionValue: "booking_id",
        formData: this.state.bookingIds || [],
        formColumn: [
          "Basic Amount",
          "Deduction",
          "Net Amount",
          "Skill",
          "Date",
        ],
        options: [
          {
            name: "consultant_id",
            value: consultantId,
          },
          {
            name: "payment_id",
            value: this.props.match.params.childId,
          },
        ],
        error: this.validator.message(
          "bookingIds",
          this.state.bookingIds,
          "required"
        ),
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
  addDynamicConsultantForm = (dynamicForm) => {
    this.setState({
      dynamicForm: dynamicForm,
    });
  };
  handleFormInputChange = (dynamicForm) => {
    this.setState({ dynamicForm: dynamicForm });
  };

  handleCheckboxChange(newState, event) {
    if (isNaN(Number(event.target.name))) {
        newState.form[event.target.name] = event.target.checked;
    } else {
        const bookingId = Number(event.target.name);
        if (event.target.checked) {
            newState.bookingIds.push(bookingId);
            newState.form.total_payment += Number(event.target.value);
        } else {
            const index = newState.bookingIds.indexOf(bookingId);
            if (index > -1) {
                newState.bookingIds.splice(index, 1);
                newState.form.total_payment -= Number(event.target.value);
            }
        }
    }
  }

  handleInputChangeEvent(newState, event) {
    const value = isNaN(Number(event.target.value)) ? event.target.value : Number(event.target.value);
    newState.form[event.target.name] = value;
    if (event.target.name === "consultant_id") {
        newState.form.total_payment = 0;
        newState.bookingIds = [];
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
      const {
        consultant_id,
        payment_date,
        remarks,
        total_payment,
        transaction_details,
      } = this.state.form;
      let data = {
        consultant_id,
        remarks,
        total_payment,
        payment_date,
        transaction_details,
        bookingIds: this.state.bookingIds,
      };
      if (UserHelper.isConsultant()) {
        if (id && id === "new") {
          this.props.create("formData", "consultants/payment", data);
        } else {
          this.props.update("formData", "consultants/payment", id, data);
        }
      } else {
        if (childId && childId === "new") {
          this.props.create("formData", "consultants/payment", data);
        } else {
          this.props.update("formData", "consultants/payment", childId, data);
        }
      }
      this.resetForm();
      this.goBack();
    } else {
      this.handleError();
    }
  }

  componentDidMount() {
    this.bindData();
  }

  bindData = () => {
    const { childId, id } = this.props.match.params;
    if (childId && childId !== "new") {
      crudService._get("consultants/payment", childId).then((response) => {
        if (response.status === 200) {
          const ids = response.data.paymentDetail.map(
            (data) => data.booking_id
          );
          this.setState({
            form: response.data,
            bookingIds: ids,
          });
        }
      });
    }
  };

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

  render() {
    const { classes } = this.props;
    const { childId, id } = this.props.match.params;
    let title = "Add Consultant Payout Form";
    let btnText = "Create";
    if (childId && childId !== "new") {
      title = "Edit Consultant Payout Details";
      btnText = "Update";
    }
    console.log("State", this.state);
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
                handleFormInputChange={this.handleFormInputChange}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

ConsultantPayoutHistoryForm.propTypes = {
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
  )(ConsultantPayoutHistoryForm)
);

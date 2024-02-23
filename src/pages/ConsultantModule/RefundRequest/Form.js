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
import { UserHelper } from "_helpers";
// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from "react-redux";
import { crudActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";

const initialState = {
  id: "new",
  form: {
    booking_id: "",
    reason: "",
    refund_status: "",
    booking: {
      booking_date: "",
    },
    // booking_status: "",
    approved_amount: "",
    refund_amount: "",
    reason: "",
    refund_by: "",
    admin_remarks: "",
  },
};
class RefundRequestForm extends React.PureComponent {
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
        name: "refund_by",
        label: "Refund By",
        type: "textbox",
        value: form.refund_by || "",
        icon: "assignment",
        readonly: true,
        disabled: true,
      },
      // {
      //   name: "booking_id",
      //   label: "Booking Id",
      //   type: "textbox",
      //   value: form.booking_id || "",
      //   readonly: true,
      //   disabled: true,
      //   // error: this.validator.message(
      //   //   "document_file_name",
      //   //   form.document_file_name,
      //   //   "url"
      //   // ),
      // },
      {
        name: "reason",
        label: "Reason",
        type: "textbox",
        value: form.reason || "",
        icon: "assignment",
        readonly: true,
        disabled: true,
      },
      {
        name: "refund_status",
        label: "Refund Status",
        type: "textbox",
        value: form.refund_status || "",
        icon: "assignment",
        readonly: true,
        disabled: true,
      },
      // {
      //   name: "booking_status",
      //   label: "Booking Status",
      //   type: "textbox",
      //   value: form.booking_status || "",
      //   icon: "assignment",
      //   readonly: true,
      //   disabled: true,
      // },
      {
        name: "booking_date",
        label: "Booking Date",
        type: "date",
        value: form.booking.booking_date || "",
        icon: "assignment",
        readonly: true,
        disabled: true,
      },
      {
        name: "refund_amount",
        label: "Refund Amount",
        type: "textbox",
        value: form.refund_amount || "",
        icon: "assignment",
        readonly: true,
        disabled: true,
      },
      {
        name: "approved_amount",
        label: "Approved Amount",
        type: "textbox",
        value: form.approved_amount || "",
        icon: "assignment",
      },
      {
        name: "admin_remarks",
        label: "Admin Remarks",
        type: "textbox",
        value: form.admin_remarks || "",
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
      const { childId, id } = this.props.match.params;
      let data = {
        consultant_id: UserHelper.isConsultant() ? null : id,
        // booking_id: this.state.form.booking_id,
        // reason: this.state.form.reason,
        // refund_by: this.state.form.refund_by,
        // booking_id: this.state.form.booking_id,
        // booking_date: this.state.form.booking_date,
        // booking_status: this.state.form.booking_status,
        // refund_amount: this.state.form.refund_amount,
        // refund_status: this.state.form.refund_status,
        approved_amount: this.state.form.approved_amount,
        admin_remarks: this.state.form.admin_remarks,
      };
      // if (UserHelper.isConsultant()) {
      //   if (id && id === "new") {
      //     this.props.create("formData", "refund-approve", data);
      //     this.goBack();
      //   } else {
      //     this.props.update("formData", "refund-approve", id, data);
      //   }
      // } else {
      if (childId && childId === "new") {
        this.props.create("formData", "refund-approve", data);
        this.goBack();
      } else {
        this.props.update("formData", "refund-approve", childId, data);
      }
      // }
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
    const { childId, id } = this.props.match.params;
    console.log("param", this.props.match.params);
    if (childId && childId !== "new") {
      crudService._get(`booking/refund-request`, childId).then((response) => {
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
    const { childId, id } = this.props.match.params;
    let title = "Add Refund Request";
    let btnText = "Create";
    if (childId && childId !== "new") {
      title = "Edit Refund Request Details";
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
                displayAddBtn={UserHelper.isConsultant() ? false : true}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

RefundRequestForm.propTypes = {
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
  )(RefundRequestForm)
);

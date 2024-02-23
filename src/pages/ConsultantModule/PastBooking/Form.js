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
    consultant: {
      first_name: "",
    },
    visitor: {
      name: "",
    },
    transaction: {
      total_amount: "",
    },
    duration: "",
    booking_status: "",
    booking_date: "",
    booking_time: "",
  },
};
class PastBookingForm extends React.PureComponent {
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
        name: "visitor.name",
        label: "Name",
        type: "textbox",
        value: form.visitor.name || "",
        icon: "assignment",
        readOnly: true,
        disabled: true,
        // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
      },
      {
        name: "consultant.first_name",
        label: "Consultant Name",
        type: "textbox",
        value: form.consultant.first_name || "",
        icon: "assignment",
        readOnly: true,
        disabled: true,
        // error: this.validator.message("image", form.image, "required"),
      },
      {
        name: "booking_date",
        label: "Booking Date",
        type: "date",
        value: form.booking_date || "",
        icon: "assignment",
        readOnly: true,
        disabled: true,
        // error: this.validator.message("email", form.email, "email"),
      },
      {
        name: "booking_time",
        label: "Booking Time",
        type: "time",
        value: form.booking_time || "",
        icon: "assignment",
        readOnly: true,
        disabled: true,
        // error: this.validator.message("email", form.email, "email"),
      },
      {
        name: "duration",
        label: "Duration",
        type: "textbox",
        value: form.duration || "",
        icon: "assignment",
        readOnly: true,
        disabled: true,
        // error: this.validator.message("email", form.email, "email"),
      },
      {
        name: "transaction.total_amount",
        label: "Total Amount",
        type: "textbox",
        value: form.transaction.total_amount || "",
        icon: "assignment",
        readOnly: true,
        disabled: true,
        // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
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
        consultant_id: UserHelper.isConsultant() ? null : id,
        name: this.state.form.visitor.name,
        first_name: this.state.form.consultant.first_name,
        duration: this.state.form.duration,
        booking_status: this.state.form.booking_status,
        booking_date: this.state.form.booking_date,
        booking_time: this.state.form.booking_time,
        total_amount: this.state.form.transaction.total_amount,
      };
      if (childId && childId === "new") {
        this.props.create("formData", "consultants/booking", data);
        this.goBack();
      } else {
        this.props.update("formData", "consultants/booking", id, data);
      }
    } else {
      this.handleError();
    }
  }

  bindData = () => {
    const { childId } = this.props.match.params;
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
    let title = "Add Upcoming Form";
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
                displayAddBtn={(UserHelper.isConsultant()) ? true : false}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

PastBookingForm.propTypes = {
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
  )(PastBookingForm)
);

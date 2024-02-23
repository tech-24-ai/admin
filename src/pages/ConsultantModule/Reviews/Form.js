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
import { YEAR } from "../../../_constants/form.constants";

import SimpleReactValidator from "simple-react-validator";

const initialState = {
  id: "new",
  form: {
    rating: "",
    review: "",
    rate_date: "",
    approval_status: "",
    visitor: {
      name: "",
    },
    bookings: {
      booking: {
        booking_date: "",
      },
    },
  },
};

class ReviewsForm extends React.PureComponent {
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
      newState.form[event.target.name] = event.target.checked ? true : false;
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
        label: "Visitor Name",
        type: "textbox",
        value: form.visitor.name || "",
        icon: "assignment",
        readOnly: true,
        disabled: true,
        // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
      },
      // {
      //     name: "bookings?.booking?.booking_date",
      //     label: "Booking Date",
      //     type: "date",
      //     value: form.bookings?.booking?.booking_date || "",
      //     icon: "date",
      //     // error: this.validator.message("image", form.image, "required"),
      // },
      {
        name: "rating",
        label: "Rating",
        type: "textbox",
        value: form.rating || "",
        icon: "assignment",
      },
      {
        name: "review",
        label: "Review",
        type: "textbox",
        value: form.review || "",
        icon: "assignment",
        error: this.validator.message("review", form.review, ""),
      },
      {
        name: "rate_date",
        label: "Rate date",
        type: "date",
        value: form.rate_date,
        icon: "date",
      },
      {
        name: "status",
        label: "Status",
        type: "textbox",
        value: form.status || "",
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

  handleReject = (e) => {
    e.preventDefault();
    const { childId, id } = this.props.match.params;
    if (id && id !== "new") {
      this.props.update("formData", `consultants/reviews`, id, {
        status: "Rejected",
      });
    }
    this.resetForm();
    this.goBack();
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      const { childId, id } = this.props.match.params;
      let data = {
        consultant_id: id,
        // name: this.state.form.visitor.name,
        // bookings: this.state.form.bookings?.booking?.booking_date,
        rating: this.state.form.rating,
        review: this.state.form.review,
        // rate_date: this.state.form.rate_date,
      };
      let response_data = {
        approval_status: this.state.form.approval_status,
      };
      if (id && id === "new") {
        // this.props.create("formData", `consultants/reviews`, data);
      } else {
        this.props.update("formData", `consultants/reviews`, id, {
          status: "Approved",
        });
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
      crudService._get(`consultants/reviews`, id).then((response) => {
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
    const { status } = this.state.form;
    let title = "Add New Reviews";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Reviews Details";
      btnText = "Approve";
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
                displayAddBtn={status == "Pending" ? true : false}
                handleReject={status == "Pending" ? this.handleReject : null}
                btnText={btnText}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

ReviewsForm.propTypes = {
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
  )(ReviewsForm)
);

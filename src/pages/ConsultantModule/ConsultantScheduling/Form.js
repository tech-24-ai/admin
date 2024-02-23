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
import { SCHEDULING_TYPE, DAY_TYPE } from "../../../_constants/form.constants";

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
    type: "weekly",
    time_zone_id: "",
    created_at: "",
    day_of_week: "",
    id: "",
    start_time: "",
    end_time: "",
    option_type: "textbox",
  },
  dynamicForm: [],
  options: [],
  dynamicFormFields: {},
};
class ConsultantSchedulingForm extends React.PureComponent {
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
      if (event.target.name == "id" && event.target.label) {
        newState.form["day_of_week"] = event.target.label;
      }
    }
    this.setState(newState);
    this.handleError();
  }

  getFormFields = () => {
    const { form, dynamicForm } = this.state;
    let formFieldData = null;
    if (form.id) {
      formFieldData = {
        id: form.id,
        day_of_week: form.day_of_week,
        schedules: [
          {
            start_time: form.start_time,
            end_time: form.end_time,
          },
        ],
      };
    }
    const formFields = [
      {
        name: "type",
        label: "Type",
        type: "textbox",
        value: form.type || "",
        icon: "assignment",
        readOnly: true,
        disabled: true,
      },
      {
        name: "time_zone_id",
        label: "Timezone",
        type: "time_zone_autocomplete",
        url: "time-zone",
        getOptionLabel: ["offset", "name"],
        getOptionValue: "id",
        value: form.time_zone_id || "",
        icon: "assignment",
        error: this.validator.message(
          "time_zone_id",
          form.time_zone_id,
          "required"
        ),
      },
      {
        name: "scheduling_days",
        label: "Week days",
        type: "dynamicScheduleForm",
        formColumn: ["Start time", "End time"],
        formData: dynamicForm,
        formFieldData: formFieldData,
        options: [
          {
            name: "id",
            label: "Days",
            type: "autocomplete",
            url: "consultants/schedule-days",
            getOptionLabel: "day_of_week",
            getOptionValue: "id",
            value: form.id || "",
            error: this.validator.message("id", form.id, "required"),
          },
          {
            name: "start_time",
            label: "Start time",
            type: "time",
            value: form.start_time || "",
            icon: "assignment",
            error: this.validator.message(
              "start_time",
              form.start_time,
              "required"
            ),
          },
          {
            name: "end_time",
            label: "End Time",
            type: "time",
            value: form.end_time || "",
            icon: "assignment",
            error: this.validator.message(
              "end_time",
              form.end_time,
              "required"
            ),
          },
        ],
      },
    ];
    return formFields;
  };
  addDynamicConsultantForm = (dynamicForm) => {
    this.setState(
      {
        dynamicForm: dynamicForm,
      },
      () => this.forceUpdate()
    );
  };
  removeScheduleDynamicForm = (dynamicForm) => {
    this.setState(
      {
        dynamicForm: dynamicForm,
      },
      () => this.forceUpdate()
    );
  };
  handleFormInputChange = (dynamicForm) => {
    this.setState({ dynamicForm: dynamicForm });
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
    this.resetForm();
    this.props.history.goBack();
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      const { childId, id } = this.props.match.params;
      console.log("PARAM", this.props.match.params);
      let data = {
        consultant_id: id,
        type: this.state.form.type,
        time_zone_id: this.state.form.time_zone_id,
        schedule_times: this.state.dynamicForm,
      };
      if (childId && childId === "new") {
        this.props.create("formData", "consultants/schedules", data);
        this.goBack();
      } else {
        this.props.update("formData", "consultants/schedules", childId, data);
      }
      this.resetForm();
      this.goBack();
    } else {
      this.handleError();
    }
  }

  bindData = () => {
    const { id, childId } = this.props.match.params;

    if (childId && childId !== "new") {
      crudService._get("consultants/schedules", childId).then((response) => {
        if (response.status === 200) {
          this.setState({
            form: response.data,
            dynamicForm: response.data.scheduleDays
              ? response.data.scheduleDays
              : [],
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
    let title = "Add Consultant Scheduling";
    let btnText = "Create";
    if (childId && childId !== "new") {
      title = "Edit Consultant Scheduling Details";
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
                handleFormInputChange={this.handleFormInputChange}
                addDynamicForm={this.addDynamicConsultantForm}
                removeScheduleDynamicForm={this.removeScheduleDynamicForm}
                dynamicFormFields={this.state.dynamicFormFields}
                dynamicForm={this.state.dynamicForm}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

ConsultantSchedulingForm.propTypes = {
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
  )(ConsultantSchedulingForm)
);

/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import MyForm from "components/Form";
import { OptionTypes } from "../../../_constants/form.constants";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from "react-redux";
import { crudActions } from "../../../_actions";
import { crudService } from "../../../_services";
import SimpleReactValidator from "simple-react-validator";
import { apiConfig } from "_services/api";

const initialState = {
  id: "new",
  form: {
    step_id: "",
    step: "",
    name: "",
    tags: "",
    notes: "",
    option_type: "textbox",
    isNotSure: false,
  },
  dynamicForm: [],
  options: [],
  dynamicFormFields: {
    option_id: "",
  },
};

class QuestionForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }

  getFormFields = () => {
    const { form, options } = this.state;
    const formFields = [];

    formFields.push({
      name: "name",
      label: "Name",
      type: "textbox",
      value: form.name || "",
      icon: "assignment",
      error: this.validator.message("name", form.name, "required|min:3"),
    });

    formFields.push({
      name: "step_id",
      label: "Choose Step",
      type: "autocomplete",
      url: "steps",
      getOptionLabel: "name",
      getOptionValue: "id",
      value: form.step_id,
      option: {
        label: form.step && form.step.name,
        value: form.step && form.step_id,
      },
      error: this.validator.message("step_id", form.step_id, "required"),
    });

    formFields.push({
      name: "option_type",
      label: "Choose Option Type",
      type: "select",
      value: form.option_type || "",
      options: OptionTypes,
      error: this.validator.message(
        "option_type",
        form.option_type,
        "required"
      ),
    });

    formFields.push({
      name: "isNotSure",
      label: "is Not Sure",
      value: form.isNotSure,
      type: "checkbox",
    });

    if (
      form.option_type !== "country_select" &&
      form.option_type !== "industry_select"
    ) {
      formFields.push({
        name: "options",
        label: "Options",
        type: "dynamic",
        value: [],
        options: [
          {
            name: "option_id",
            label: "Options",
            type: "autocomplete_option",
            getOptionLabel: "name",
            getOptionValue: "id",
            options: options,
          },
        ],
      });
    }

    formFields.push({
      name: "tags",
      label: "Tags",
      type: "textbox",
      value: form.tags || "",
      error: this.validator.message("tags", form.tags, "min:3"),
    });
    formFields.push({
      name: "notes",
      label: "Notes",
      type: "textbox",
      value: form.notes || "",
      error: this.validator.message("notes", form.notes, "min:3"),
    });

    return formFields;
  };

  addDynamicForm = (dynamicForm) => {
    this.setState({
      dynamicForm: dynamicForm,
    });
  };
  removeDynamicForm = (dynamicForm) => {
    this.setState({
      dynamicForm: dynamicForm,
    });
  };

  handleFormInputChange = (dynamicForm) => {
    this.setState({ dynamicForm: dynamicForm });
  };

  handleInputChange(event) {
    const newState = Object.assign({}, this.state);
    if (event.target.type == "checkbox") {
      newState.form[event.target.name] = event.target.checked;
    } else {
      newState.form[event.target.name] = event.target.value;
    }
    console.log("New", newState);
    this.setState(newState);
    this.handleError();
  }

  handleError() {
    this.validator.showMessages();
    this.forceUpdate();
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

  goBack = () => {
    this.resetForm();
    this.props.history.goBack();
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      let data = {
        step_id: this.state.form.step_id,
        name: this.state.form.name,
        option_type: this.state.form.option_type,
        tages: this.state.form.tages,
        notes: this.state.form.notes,
        isNotSure: this.state.form.isNotSure,
        options: this.state.dynamicForm.length
          ? JSON.stringify(this.state.dynamicForm)
          : null,
      };
      const { id } = this.props.match.params;
      if (id && id === "new") {
        this.props.create("formData", "questions", data);
      } else {
        this.props.update("formData", "questions", id, data);
      }
      this.resetForm();
      this.goBack();
    } else {
      this.handleError();
    }
  }

  bindData = () => {
    const { id } = this.props.match.params;
    if (id && id !== "new") {
      crudService._get("questions", id).then((response) => {
        if (response.status === 200) {
          this.setState({
            form: response.data,
            dynamicForm: response.data.option,
          });
        }
      });
    }
  };

  componentDidMount() {
    this.bindData();
    crudService._getAllWithParam("options").then((response) => {
      if (response.status === 200) {
        this.setState({ options: response.data });
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { id } = this.props.match.params;
    let title = "Add Questions";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Question";
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
                handleFormInputChange={this.handleFormInputChange}
                addDynamicForm={this.addDynamicForm}
                removeDynamicForm={this.removeDynamicForm}
                dynamicFormFields={this.state.dynamicFormFields}
                dynamicForm={this.state.dynamicForm}
                btnText={btnText}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

QuestionForm.propTypes = {
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
  )(QuestionForm)
);

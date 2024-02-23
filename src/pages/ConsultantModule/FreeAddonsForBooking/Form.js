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
import { FREE_ADDON_TYPE } from "../../../_constants/form.constants";
// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from "react-redux";
import { crudActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";

const initialState = {
  id: "new",
  form: {
    type: "",
    duration: "",
    module_id: "",
    category_id: "",
    document_id: "",
    categories: {
      name: ""
    },
    modules: {
      name: "",
      type: ""
    },
    document: {
      name: ""
    },
  },
};
class FreeAddonsForm extends React.PureComponent {
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
        name: "type",
        label: "Type",
        type: "select",
        options: FREE_ADDON_TYPE,
        value: form.type || "",
        icon: "assignment",
        error: this.validator.message("type", form.type, "required"),
      },
      {
        name: "duration",
        label: "Duration",
        type: "textbox",
        value: form.duration || "",
        icon: "assignment",
        error: this.validator.message("duration", form.duration, "required|min:3"),
      },
      {
        name: "module_id",
        label: "Module Id",
        value: form.module_id || "",
        type: "autocomplete",
        url: "modules",
        icon: "assignment",
        getOptionLabel: "name",
        getOptionValue: 'id',
        error: this.validator.message("module_id", form.module_id, "required"),
      },
      {
        name: "category_id",
        label: "Category Id",
        type: "autocomplete",
        url: "categories",
        value: form.category_id || "",
        icon: "assignment",
        getOptionLabel: "name",
        getOptionValue: 'id',
        error: this.validator.message("category_id", form.category_id, "required"),
      },
      {
        name: "document_id",
        label: "Document Id",
        type: "autocomplete",
        value: form.document_id || "",
        url: "documents",
        icon: "assignment",
        getOptionLabel: "name",
        getOptionValue: 'id',
        error: this.validator.message("document_id", form.document_id, "required"),
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
        type: this.state.form.type,
        duration: this.state.form.duration,
        document_id: this.state.form.document_id,
        module_id: this.state.form.module_id,
        category_id: this.state.form.category_id,

      };
      if (id && id === "new") {
        this.props.create("formData", `free-addons`, data);
      } else {
        this.props.update("formData", `free-addons`, id, data);
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

    const { childId, id } = this.props.match.params;
    if (childId && childId !== "new") {
      crudService._get(`free-addons/${this.props.match.params}`, id).then((response) => {
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
    let title = "Add Free Addon Details";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Free Addon Details";
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

FreeAddonsForm.propTypes = {
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
  )(FreeAddonsForm)
);

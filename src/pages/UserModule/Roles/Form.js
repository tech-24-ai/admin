/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// material ui icons
import MailOutline from "@material-ui/icons/PeopleOutline";

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
import SimpleReactValidator from "simple-react-validator";

const initialState = {
  id: "new",
  form: {
    name: "",
    permissions: [],
  },
};
class RoleForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }

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

  handleInputChange(event) {
    const newState = Object.assign({}, this.state);
    newState.form[event.target.name] = event.target.value;
    this.setState(newState);
    this.handleError();
  }

  getFormFields = () => {
    const { form } = this.state;

    const formFields = [
      {
        name: "name",
        label: "Name",
        type: "textbox",
        value: form.name || "",
        icon: "assignment",
        error: this.validator.message("name", form.name, "required|min:2"),
      },
      {
        name: "permissions",
        label: "Choose Permissions",
        type: "multi_group_checkbox",
        url: "permission_groups",
        getOptionLabel: "name",
        getOptionValue: "id",
        getSubOptionLabel: "description",
        getSubOptionValue: "id",
        value: form.permissions || "",
        error: this.validator.message(
          "permissions",
          form.permissions,
          "required"
        ),
      },
      {
        name: "modules",
        label: "Choose modules",
        type: "treebox",
        url: "app/module/categories",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.modules,
        error: this.validator.message("modules", form.modules, "required"),
      },
    ];

    return formFields;
  };

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
        name: this.state.form.name,
        permissions: JSON.stringify(this.state.form.permissions),
        modules: JSON.stringify(this.state.form.modules),
      };
      const { id } = this.props.match.params;
      if (id && id === "new") {
        this.props.create("formData", "roles", data);
      } else {
        this.props.update("formData", "roles", id, data);
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
      crudService._get("roles", id).then((response) => {
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

    const { id } = this.props.match.params;
    let title = "Add New User Role";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit User Role";
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

RoleForm.propTypes = {
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
  )(RoleForm)
);

/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// material ui icons
import MailOutline from "@material-ui/icons/Public";

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

import SimpleReactValidator from "simple-react-validator";
import { crudService } from "../../../_services";

const initialState = {
  id: "new",
  form: {
    name: "",
    sort_name: "",
    zone: "",
    offset: "",
  },
};
class TimeZoneForm extends React.PureComponent {
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

  handleError() {
    this.validator.showMessages();
    this.forceUpdate();
  }

  getFormFields = () => {
    const { form } = this.state;
    const formFields = [
      {
        name: "name",
        label: "Country Name",
        type: "textbox",
        value: form.name || "",
        icon: "assignment",
        error: this.validator.message("name", form.name, "required|min:3"),
      },
      {
        name: "sort_name",
        label: "Country Code (e.g. US)",
        type: "textbox",
        value: form.sort_name || "",
        error: this.validator.message("sort_name", form.sort_name, "min:2"),
      },
      {
        name: "zone",
        label: "Zone",
        type: "textbox",
        value: form.zone || "",
        error: this.validator.message("zone", form.zone, "required"),
      },
      {
        name: "offset",
        label: "Offset",
        type: "textbox",
        value: form.offset || "",
        error: this.validator.message("offset", form.offset, "required"),
      },
    ];

    return formFields;
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

  goBack = () => {
    this.resetForm();
    this.props.history.goBack();
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      let data = {
        name: this.state.form.name,
        sort_name: this.state.form.sort_name,
        zone: this.state.form.zone,
        offset: this.state.form.offset,
      };
      const { id } = this.props.match.params;
      if (id && id === "new") {
        this.props.create("formData", "time-zone", data);
      } else {
        this.props.update("formData", "time-zone", id, data);
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
      crudService._get("time-zone", id).then((response) => {
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
    let title = "Add New Time Zone";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Time Zone Details";
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

TimeZoneForm.propTypes = {
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
  getCrud: crudActions._get,
  clearCrud: crudActions._clear,
  create: crudActions._create,
  update: crudActions._update,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actionCreators
  )(TimeZoneForm)
);

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
import { ANOMALY_STATUS } from "_constants/form.constants";

import SimpleReactValidator from "simple-react-validator";
import moment from "moment";

const initialState = {
  id: "new",
  form: {
    vendors: {
      name: "",
    },
    descriptions: "",
    current_status: "",
    errors: "",
    table_name: "",
    fields: "",
    detected_datetime: null,
  },
};
class AnomalyForm extends React.PureComponent {
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
        name: "name",
        label: "Vendor Name",
        type: "text",
        value: form.vendors.name || "",
        icon: "assignment",
        disabled: true,
      },
      {
        name: "table_name",
        label: "Table Name",
        type: "text",
        value: form.table_name || "",
        icon: "assignment",
        disabled: true,
      },
      {
        name: "fields",
        label: "Field",
        type: "text",
        value: form.fields || "",
        icon: "assignment",
        disabled: true,
      },
      {
        name: "errors",
        label: "Error",
        type: "text",
        value: form.errors || "",
        icon: "assignment",
        disabled: true,
      },
      {
        name: "descriptions",
        label: "Fixed Descriptions",
        type: "text",
        value: form.descriptions || "",
        icon: "assignment",
        error: this.validator.message(
          "descriptions",
          form.descriptions,
          "required"
        ),
      },
      {
        name: "current_status",
        label: "Status",
        type: "select",
        options: ANOMALY_STATUS,
        value: form.current_status || "",
        icon: "assignment",
        error: this.validator.message(
          "status",
          form.current_status,
          "required"
        ),
      },
      {
        name: "detected_datetime",
        label: "Detected Date",
        type: "date",
        value:
          moment(form.detected_datetime, "DD-MM-YYYY").format("YYYY-MM-DD") ||
          "",
        icon: "assignment",
        disabled: true,
      },
    ];
    return formFields || [];
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
      const { id } = this.props.match.params;
      let data = {
        descriptions: this.state.form.descriptions,
        status: this.state.form.current_status,
      };
      if (id && id === "new") {
        // this.props.create("formData", `cron-job`, data);
      } else {
        this.props.update("formData", `anomaly`, id, data);
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
    // if (formFields) {
    //   formFields.forEach((element) => {
    //     form[element.name] = null;
    //   });
    // }

    form &&
      Object.entries(form).forEach(([key, value]) => {
        if (typeof value == "object") {
          if (key === "plans" || key === "transactions") {
            Object.entries(value).forEach(([key2, value2]) => {
              form[key][key2] = null;
            });
          }
        } else {
          form[key] = null;
        }
      });
    this.setState(form);
    this.props.clearCrud("form");
  };

  bindData = () => {
    const { id } = this.props.match.params;
    if (id && id !== "new") {
      crudService._get(`anomaly`, id).then((response) => {
        if (response.status === 200) {
          this.setState((prevState) => ({
            form:
              response.data && response.data.length > 0
                ? response.data[0]
                : prevState.form,
          }));
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
    let title = "Add Anomaly Details";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Anomaly Details";
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

AnomalyForm.propTypes = {
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
  )(AnomalyForm)
);

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
    company_name: "",
    company_logo: "",
    image: "",
    designation: "",
    from_year: "",
    to_year: "",
    is_present: false,
  },
};

class WorkExperienceForm extends React.PureComponent {
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
        name: "company_name",
        label: "Company Name",
        type: "textbox",
        value: form.company_name || "",
        icon: "assignment",
        error: this.validator.message("company_name", form.company_name, "required|min:3"),
      },
      {
        name: "company_logo",
        label: "Upload Image",
        type: "imageUpload",
        uploadUrl: "upload/image",
        value: form.company_logo || "",
        icon: "image",
        error: this.validator.message("company_logo", form.company_logo, "required"),
      },
      // {
      //     name: "image",
      //     label: "Upload Image",
      //     type: "imageUpload",
      //     uploadUrl: "upload/image",
      //     value: form.image || "",
      //     icon: "image",
      //     // error: this.validator.message("image", form.image, "required"),
      // },
      {
        name: "designation",
        label: "Designation",
        type: "textbox",
        value: form.designation || "",
        icon: "assignment",
        error: this.validator.message("designation", form.designation, "required"),
      },
      {
        name: "from_year",
        label: "From Year",
        type: "select",
        options: YEAR(1900, new Date().getFullYear()),
        value: form.from_year || "",
        icon: "assignment",
        error: this.validator.message("From Year", form.from_year, ""),
      },
      {
        name: "to_year",
        label: "To Year",
        type: "select",
        options: YEAR(1900, new Date().getFullYear()),
        value: form.to_year || "",
        icon: "assignment",
        error: this.validator.message("To Year", form.to_year, ""),
      },
      {
        name: "is_present",
        label: "Is Present",
        type: "checkbox",
        value: form.is_present ? true : false,
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
        consultant_id: id,
        company_name: this.state.form.company_name,
        company_logo: this.state.form.company_logo,
        designation: this.state.form.designation,
        from_year: this.state.form.from_year,
        to_year: this.state.form.to_year,
        is_present: this.state.form.is_present,
      };
      if (childId && childId === "new") {
        this.props.create("formData", `consultants/work-experience`, data);
      } else {
        this.props.update(
          "formData",
          `consultants/work-experience`,
          childId,
          data
        );
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
    const { childId } = this.props.match.params;
    if (childId && childId !== "new") {
      crudService
        ._get(`consultants/work-experience`, childId)
        .then((response) => {
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
    let title = "Add New Work Experience";
    let btnText = "Create";
    if (childId && childId !== "new") {
      title = "Edit Work Experience Details";
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

WorkExperienceForm.propTypes = {
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
  )(WorkExperienceForm)
);

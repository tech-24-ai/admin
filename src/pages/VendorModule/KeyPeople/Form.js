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

import { YEAR, COMPANY_TYPE } from "../../../_constants/form.constants";
import Button from "@material-ui/core/Button";
// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from "react-redux";
import { crudActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";
import Icon from "@material-ui/core/Icon";

const initialState = {
  id: "new",
  form: {
    name: "",
    designation: "",
    photo: "",
    twitter_link: "",
    linkedin_link: "",
    is_executive_managment: false,
    is_board_of_directors: false,
    is_active: false,
    start_date: "",
    end_date: "",
  },
};
class KeyPeopleForm extends React.PureComponent {
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
        label: "Name",
        type: "textbox",
        value: form.name || "",
        icon: "assignment",
        error: this.validator.message("name", form.name, "required|min:3"),
      },
      {
        name: "designation",
        label: "Designation",
        type: "textbox",
        value: form.designation || "",
        icon: "assignment",
        error: this.validator.message(
          "designation",
          form.designation,
          "required|min:3"
        ),
      },
      {
        name: "photo",
        label: "Upload Image",
        type: "imageUpload",
        value: form.photo || "",
        uploadUrl: "upload/image",
        icon: "upload",
        error: this.validator.message("image", form.photo, ""),
      },
      {
        name: "twitter_link",
        label: "Twitter Link",
        type: "textbox",
        value: form.twitter_link || "",
        icon: "assignment",
        error: this.validator.message("twitter_link", form.twitter_link, "url"),
      },
      {
        name: "linkedin_link",
        label: "Linkedin Link",
        type: "textbox",
        value: form.linkedin_link || "",
        icon: "assignment",
        error: this.validator.message(
          "linkedin_link",
          form.linkedin_link,
          "url"
        ),
      },
      {
        name: "is_executive_managment",
        label: "Is Executive Managment",
        value: form.is_executive_managment ? true : false,
        type: "checkbox",
      },
      {
        name: "is_board_of_directors",
        label: "Is board of directors",
        value: form.is_board_of_directors ? true : false,
        type: "checkbox",
      },
      {
        name: "is_active",
        label: "Is Active",
        value: form.is_active ? true : false,
        type: "checkbox",
      },
      {
        name: "start_date",
        label: "Start Date",
        type: "date",
        value: form.start_date || "",
        icon: "assignment",
        error: this.validator.message("start_date", form.start_date, "required"),
      },
      {
        name: "end_date",
        label: "End Date",
        type: "date",
        value: form.end_date || "",
        icon: "assignment",
        error: this.validator.message("end_date", form.end_date, ""),
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
        name: this.state.form.name,
        designation: this.state.form.designation,
        photo: this.state.form.photo,
        vendor_id: id,
        twitter_link: this.state.form.twitter_link,
        linkedin_link: this.state.form.linkedin_link,
        is_board_of_directors: this.state.form.is_board_of_directors
          ? true
          : false,
        is_executive_managment: this.state.form.is_executive_managment
          ? true
          : false,
        is_active: this.state.form.is_active ? true : false,
        start_date: this.state.form.start_date,
        end_date: this.state.form.end_date,
      };
      if (childId && childId === "new") {
        this.props.create(
          "formData",
          `key-people/${this.props.match.params}`,
          data
        );
      } else {
        this.props.update(
          "formData",
          `key-people/${this.props.match.params}`,
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
        ._get(`key-people/${this.props.match.params}`, childId)
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
    const { id } = this.props.match.params;
    let title = "Add New MI Segment";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Vendors Key People Details";
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
              <Button
                size="small"
                variant="contained"
                color="success"
                style={{ float: "right", marginLeft: "10px" , marginTop:"15px" }}
                onClick={() => this.fetchInfo()}
                endIcon={<Icon>import_export</Icon>}
              >
                 Fetch Info
              </Button>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                style={{ float: "right", marginLeft: "10px", marginTop:"15px" }}
                onClick={() => this.fetchLogo(true)}
                endIcon={<Icon>import_export</Icon>}
              >
                Fetch Logo - Paid
              </Button>
              <Button
              size="small"
                variant="contained"
                color="primary"
                style={{ float: "right", marginLeft: "10px", marginTop:"15px" }}
                onClick={() => this.fetchLogo()}
                endIcon={<Icon>import_export</Icon>}
              >
                Fetch Logo
              </Button>
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

KeyPeopleForm.propTypes = {
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
  )(KeyPeopleForm)
);

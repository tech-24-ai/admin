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
    first_name: "",
    image: "",
    tags: "",
    avg_rating: "",
    mobile: "",
    email: "",
    country_id: "",
    profile_summary: "",
    details: "",
    linkedin_url: "",
    is_company: "",
    number_of_employee: "",
    regions: [],
    modules: [],
  },
};
class ConsultantForm extends React.PureComponent {
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
      newState.form[event.target.name] = event.target.checked;
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
        name: "first_name",
        label: "Name",
        type: "textbox",
        value: form.first_name || "",
        icon: "assignment",
        error: this.validator.message(
          "name",
          form.first_name,
          "required|min:3"
        ),
      },
      {
        name: "image",
        label: "Upload Image",
        type: "imageUpload",
        uploadUrl: "upload/image",
        value: form.image || "",
        icon: "image",
        // error: this.validator.message("image", form.image, "required"),
      },
      {
        name: "avg_rating",
        label: "Avg Rating",
        type: "textbox",
        value: form.avg_rating || "",
        icon: "assignment",
        // error: this.validator.message("email", form.email, "email"),
      },
      {
        name: "tags",
        label: "Tags",
        type: "textbox",
        value: form.tags || "",
        icon: "assignment",
        // error: this.validator.message("email", form.email, "email"),
      },
      {
        name: "mobile",
        label: "Mobile",
        type: "textbox",
        value: form.mobile || "",
        icon: "call",
        // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
      },
      {
        name: "email",
        label: "Email",
        type: "textbox",
        value: form.email || "",
        icon: "email",
        error: this.validator.message("email", form.email, "required"),
      },
      {
        name: "country_id",
        label: "Country",
        type: "autocomplete",
        url: "countries",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.country_id,
        option: { label: form.country_id, value: form.country_id },
        error: this.validator.message(
          "country_id",
          form.country_id,
          "required"
        ),
      },
      {
        name: "profile_summary",
        label: "Profile Summary",
        type: "textbox",
        value: form.profile_summary || "",
        icon: "assignment",
        // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
      },
      {
        name: "details",
        label: "Details",
        type: "textbox",
        value: form.details || "",
        icon: "assignment",
        error: this.validator.message("details", form.details, "min:3"),
      },
      {
        name: "linkedin_url",
        label: "Linkedin URL",
        type: "textbox",
        value: form.linkedin_url || "",
        error: this.validator.message(
          "Linkedin URL",
          form.linkedin_url,
          "required|url"
        ),
      },
      {
        name: "is_company",
        label: "Is Company",
        type: "checkbox",
        value: form.is_company || "",
      },
      // {
      //   name: "regions",
      //   label: "Regions",
      //   type: "treebox",
      //   url: "country_groups",
      //   getOptionLabel: "name",
      //   getOptionValue: "id",
      //   value: form.regions,
      //   error: "",
      // },
      // {
      //   name: "modules",
      //   label: "Modules",
      //   type: "treebox",
      //   url: "app/module/categories?not_categories=[5]",
      //   getOptionLabel: "name",
      //   getOptionValue: "id",
      //   value: form.modules,
      //   error: "",
      // },
    ];
    if (form.is_company) {
      formFields.push({
        name: "number_of_employee",
        label: "Number of Employee",
        type: "textbox",
        value: form.number_of_employee || "",
        icon: "assignment",
        error: this.validator.message(
          "number_of_employee",
          form.number_of_employee,
          "min:2"
        ),
      });
    }
    formFields.push({
      name: "regions",
      label: "Regions",
      type: "treebox",
      url: "country_groups",
      getOptionLabel: "name",
      getOptionValue: "id",
      value: form.regions,
      error: "",
    });

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
    this.props.history.push(`/admin/consultant`);
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      let data = {
        first_name: this.state.form.first_name,
        tags: this.state.form.tags,
        mobile: this.state.form.mobile,
        avg_rating: this.state.form.avg_rating,
        email: this.state.form.email,
        details: this.state.form.details,
        profile_summary: this.state.form.profile_summary,
        company: this.state.form.company,
        linkedin_url: this.state.form.linkedin_url,
        image: this.state.form.image,
        country_id: this.state.form.country_id,
        is_company: this.state.form.is_company,
        number_of_employee: this.state.form.number_of_employee,
        regions: JSON.stringify(this.state.form.regions),
        // modules: JSON.stringify(this.state.form.modules),
      };
      const { id } = this.props.match.params;
      if (id && id === "new") {
        this.props.create("formData", "consultants", data);
        this.goBack();
      } else {
        this.props.update("formData", "consultants", id, data);
      }
    } else {
      this.handleError();
    }
  }

  bindData = () => {
    const { id } = this.props.match.params;
    if (id && id !== "new") {
      crudService._get("consultants", id).then((response) => {
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

  // fetchLogo(riteKite = false) {
  //   const { id } = this.props.match.params;
  //   if (
  //     this.validator.fieldValid("website") &&
  //     this.state.form.website !== ""
  //   ) {
  //     let url = riteKite
  //       ? `vendors/${id}/fetch_ritekit_logo`
  //       : `vendors/${id}/fetch_logo`;
  //     this.props.showLoader();
  //     crudService
  //       ._getAllWithParam(url, {
  //         url: this.state.form.website,
  //       })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           this.setState(
  //             {
  //               form: {
  //                 ...this.state.form,
  //                 image: response.data.url,
  //               },
  //             },
  //             () => this.props.hideLoader()
  //           );
  //         }
  //       });
  //   } else {
  //     // this.handleError();
  //     this.validator.showMessageFor("website");
  //   }
  // }

  // fetchInfo() {
  //   const { id } = this.props.match.params;
  //   if (
  //     this.state.form.linkedin_url !== "" &&
  //     this.state.form.linkedin_url !== null &&
  //     this.state.form.linkedin_salesurl !== "" &&
  //     this.state.form.linkedin_salesurl !== null
  //   ) {
  //     let url = `vendors/${id}/fetch_info?linkedin_url=${this.state.form.linkedin_url}&linkedin_salesurl=${this.state.form.linkedin_salesurl}`;
  //     this.props.showLoader();
  //     crudService._getAllWithParam(url).then((response) => {
  //       if (response.status === 200) {
  //         this.props.hideLoader();
  //         this.bindData();
  //       }
  //     });
  //   } else {
  //     this.validator.showMessageFor("Linkedin URL");
  //   }
  // }

  render() {
    const { classes } = this.props;
    const { id } = this.props.match.params;
    let title = "Add New Consultant";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Consultant Details";
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
              {/* <Button
                size="small"
                variant="contained"
                color="success"
                style={{
                  float: "right",
                  marginLeft: "10px",
                  marginTop: "15px",
                }}
                onClick={() => this.fetchInfo()}
                endIcon={<Icon>import_export</Icon>}
              >
                Fetch Info
              </Button>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                style={{
                  float: "right",
                  marginLeft: "10px",
                  marginTop: "15px",
                }}
                onClick={() => this.fetchLogo(true)}
                endIcon={<Icon>import_export</Icon>}
              >
                Fetch Logo - Paid
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                style={{
                  float: "right",
                  marginLeft: "10px",
                  marginTop: "15px",
                }}
                onClick={() => this.fetchLogo()}
                endIcon={<Icon>import_export</Icon>}
              >
                Fetch Logo
              </Button> */}
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

ConsultantForm.propTypes = {
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
  )(ConsultantForm)
);

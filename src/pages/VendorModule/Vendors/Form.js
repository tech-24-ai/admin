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
import { crudActions, loaderActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";
import Icon from "@material-ui/core/Icon";

const initialState = {
  id: "new",
  form: {
    name: "",
    email: "",
    mobile: "",
    company: "",
    website: "",
    linkedin_url: "",
    linkedin_salesurl: "",
    vendor_category: "",
    logo: "",
    notes: "",
    ticker: "",
    twitter_handle: "",
    is_login: false,
    founded: "",
    company_type: "",
    country_id: "",
    country: "",
    industries: [],
    modules: [],
    vendor_category_id: "",
    image: "",
    company_size_on_linkedin: "",
  },
};
class VendorForm extends React.PureComponent {
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
        name: "email",
        label: "Email",
        type: "textbox",
        value: form.email || "",
        icon: "email",
        // error: this.validator.message("email", form.email, "email"),
      },
      {
        name: "vendor_category_id",
        label: "Choose Category",
        type: "autocomplete",
        url: "vendors/vendor_category",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.vendor_category_id,
        option: {
          label: (form.vendor_category && form.vendor_category.name) || "",
          value: form.vendor_category_id,
        },
        error: this.validator.message(
          "vendor_category_id",
          form.vendor_category_id,
          "required"
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
        name: "mobile",
        label: "Mobile",
        type: "textbox",
        value: form.mobile || "",
        icon: "call",
        // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
      },
      {
        name: "website",
        label: "Website",
        type: "textbox",
        value: form.website || "",
        // error: this.validator.message("website", form.website, "url"),
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
        name: "company_size_on_linkedin",
        label: "Company Size On Linkedin",
        type: "textbox",
        value: form.company_size_on_linkedin || "",
      },
      {
        name: "linkedin_salesurl",
        label: "Linkedin SalesURL",
        type: "textbox",
        value: form.linkedin_salesurl || "",
        // error: this.validator.message(
        //   "Linkedin SalesURL",
        //   form.linkedin_salesurl,
        //   "url"
        // ),
      },

      {
        name: "company",
        label: "Company",
        type: "textbox",
        value: form.company || "",
        icon: "assignment",
        error: this.validator.message("company", form.company, "min:1"),
        extra_info: (
          <p>
            Check Company name from Assignee section in 
            <a href="https://datatool.patentsview.org/#search" target="_blank">
              https://datatool.patentsview.org/#search
            </a>
          </p>
        ),
      },
      {
        name: "notes",
        label: "Notes",
        type: "textarea",
        value: form.notes || "",
        icon: "assignment",
        error: this.validator.message("notes", form.notes, "min:1"),
      },
      {
        name: "ticker",
        label: "Ticker",
        type: "textbox",
        value: form.ticker || "",
        icon: "assignment",
        error: this.validator.message("ticker", form.ticker, "min:3"),
      },
      {
        name: "twitter_handle",
        label: "Twitter Handle",
        type: "textbox",
        value: form.twitter_handle || "",
        icon: "assignment",
        error: this.validator.message(
          "twitter_handle",
          form.twitter_handle,
          "min:1"
        ),
      },
      {
        name: "is_login",
        label: "Is Active",
        type: "checkbox",
        value: form.is_login ? true : false,
      },
      {
        name: "founded",
        label: "Founded",
        type: "select",
        options: YEAR(1900, new Date().getFullYear()),
        value: form.founded || "",
        icon: "assignment",
      },
      {
        name: "company_type",
        label: "Company Type",
        type: "select",
        options: COMPANY_TYPE,
        value: form.company_type || "",
        icon: "assignment",
        error: this.validator.message(
          "company_type",
          form.company_type,
          "min:1"
        ),
      },
      {
        name: "main_country",
        label: "Main Country",
        type: "autocomplete",
        url: "countries",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.main_country,
        option: { label: form.country, value: form.main_country },
      },
      {
        name: "industries",
        label: "Choose Industries",
        type: "multi_checkbox",
        url: "app/industries",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.industries,
        error: "",
      },
      {
        name: "modules",
        label: "Choose modules",
        type: "treebox",
        url: "app/module/categories?not_categories=[5]",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.modules,
        error: "",
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
    this.props.history.push(`/admin/vendors`);
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      let data = {
        name: this.state.form.name,
        email: this.state.form.email,
        mobile: this.state.form.mobile,
        company: this.state.form.company,
        website: this.state.form.website,
        linkedin_url: this.state.form.linkedin_url,
        linkedin_salesurl: this.state.form.linkedin_salesurl,
        notes: this.state.form.notes,
        ticker: this.state.form.ticker,
        image: this.state.form.image,
        main_country: this.state.form.main_country,
        twitter_handle: this.state.form.twitter_handle,
        is_login: this.state.form.is_login ? true : false,
        founded: this.state.form.founded,
        company_type: this.state.form.company_type,
        industries: JSON.stringify(this.state.form.industries),
        modules: JSON.stringify(this.state.form.modules),
        vendor_category_id: this.state.form.vendor_category_id,
        company_size_on_linkedin: this.state.form.company_size_on_linkedin,
      };
      const { id } = this.props.match.params;
      if (id && id === "new") {
        this.props.create("formData", "vendors", data);
        this.goBack();
      } else {
        this.props.update("formData", "vendors", id, data);
      }
    } else {
      this.handleError();
    }
  }

  bindData = () => {
    const { id } = this.props.match.params;
    if (id && id !== "new") {
      crudService._get("vendors", id).then((response) => {
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

  fetchLogo(riteKite = false) {
    const { id } = this.props.match.params;
    if (
      this.state.form.website !== ""
    ) {
      let url = riteKite
        ? `vendors/${id}/fetch_ritekit_logo`
        : `vendors/${id}/fetch_logo`;
      this.props.showLoader();
      crudService
        ._getAllWithParam(url, {
          url: this.state.form.website,
        })
        .then((response) => {
          if (response.status === 200) {
            this.setState((prevState) => (
              {
                form: {
                  ...prevState.form,
                  image: response.data.url,
                },
              }),
              () => this.props.hideLoader()
            );
          }
        });
    } else {
      // this.handleError();
      this.validator.showMessageFor("website");
    }
  }

  fetchInfo() {
    const { id } = this.props.match.params;

    if (
      this.state.form.linkedin_url !== "" &&
      this.state.form.linkedin_url !== null &&
      this.state.form.linkedin_salesurl !== "" &&
      this.state.form.linkedin_salesurl !== null
    ) {
      let url = `vendors/${id}/fetch_info?linkedin_url=${this.state.form.linkedin_url}&linkedin_salesurl=${this.state.form.linkedin_salesurl}`;
      this.props.showLoader();
      crudService._getAllWithParam(url).then((response) => {
        if (response.status === 200) {
          this.props.hideLoader();
          this.bindData();
        }
      });
    } else {
      this.validator.showMessageFor("linkedin_url");
    }
  }

  render() {
    const { classes } = this.props;
    const { id } = this.props.match.params;
    let title = "Add New Vendor";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Vendor Details";
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

VendorForm.propTypes = {
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
  )(VendorForm)
);

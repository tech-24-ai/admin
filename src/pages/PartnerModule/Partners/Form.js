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
import Button from "@material-ui/core/Button";
import { ORG_SIZE } from "../../../_constants/form.constants";
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
    itmap_rating: "",
    website: "",
    org_size: "",
    countries: [],
    modules: [],
    vendors: [],
    regions: [],
    partner_type_id: "",
  },
};
class PartnerForm extends React.PureComponent {
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
        name: "partner_type_id",
        label: "Choose Partner",
        type: "autocomplete",
        url: "partner-types",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.partner_type_id,
        option: {
          label: (form.vendor_category && form.vendor_category.name) || "",
          value: form.partner_type_id,
        },
        error: this.validator.message(
          "partner_type_id",
          form.partner_type_id,
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
        error: this.validator.message("image", form.image, "required"),
      },
      {
        name: "website",
        label: "Website",
        type: "textbox",
        value: form.website || "",
        error: this.validator.message("website", form.website, "required|url"),
      },
      {
        name: "itmap_rating",
        label: "ITMAP Rating",
        type: "textbox",
        value: form.itmap_rating || "",
        icon: "assignment",
        error: this.validator.message(
          "itmap_rating",
          form.itmap_rating,
          "required|between:1,5,num"
        ),
      },
      {
        name: "org_size",
        label: "Org Size",
        type: "select",
        options: ORG_SIZE,
        value: form.org_size || "",
        icon: "assignment",
        error: this.validator.message(
          "org_size",
          form.org_size,
          "required|aplhanumeric"
        ),
      },
      {
        name: "vendors",
        label: "Vendors",
        type: "multiSelect",
        url: "vendors",
        getOptionLabel: "name",
        getOptionValue: "id",
        option: form.vendors,
        value: form.vendors || [],
        icon: "assignment",
        error: this.validator.message(
          "vendors",
          form.vendors,
          "required"
        ),
      },
      {
        name: "countries",
        label: "Country",
        type: "multiSelect",
        url: "countries",
        getOptionLabel: "name",
        getOptionValue: "id",
        option: form.countries,
        value: form.countries || [],
        icon: "assignment",
        error: this.validator.message(
          "countries",
          form.countries,
          "required"
        ),
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
    this.props.history.push(`/admin/partners`);
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      let data = {
        name: this.state.form.name,
        website: this.state.form.website,
        image: this.state.form.image,
        countries: JSON.stringify(this.state.form.countries),
        regions: JSON.stringify(this.state.form.regions),
        org_size: this.state.form.org_size,
        itmap_rating: this.state.form.itmap_rating,
        modules: JSON.stringify(this.state.form.modules),
        partner_type_id: this.state.form.partner_type_id,
        vendors: JSON.stringify(this.state.form.vendors),
      };
      const { id } = this.props.match.params;
      if (id && id === "new") {
        this.props.create("formData", "partners", data);
        this.goBack();
      } else {
        this.props.update("formData", "partners", id, data);
      }
    } else {
      this.handleError();
    }
  }

  bindData = () => {
    const { id } = this.props.match.params;
    if (id && id !== "new") {
      crudService._get("partners", id).then((response) => {
        if (response.status === 200) {          
          this.setState({
            form: { ...response.data },
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
      this.validator.fieldValid("website") &&
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
  render() {
    const { classes } = this.props;
    const { id } = this.props.match.params;
    let title = "Add New Partner";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Partner Details";
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
                variant="contained"
                color="secondary"
                style={{ float: "right", marginLeft: "10px" }}
                onClick={() => this.fetchLogo(true)}
                endIcon={<Icon>import_export</Icon>}
              >
                Fetch Paid
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ float: "right", marginLeft: "10px" }}
                onClick={() => this.fetchLogo()}
                endIcon={<Icon>import_export</Icon>}
              >
                Fetch Free
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

PartnerForm.propTypes = {
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
  )(PartnerForm)
);

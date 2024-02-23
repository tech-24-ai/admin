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
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import { connect } from "react-redux";
import { crudActions, loaderActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";

const initialState = {
  id: "new",
  form: {
    logo_acquried_company: "",
    acquired_company_name: "",
    date_of_acquisition: new Date(),
    currency: "",
    acquired_amount: "",
  },
};
class AcquisitionForm extends React.PureComponent {
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
        name: "logo_acquried_company",
        label: "Logo Acquried Company",
        type: "imageUpload",
        value: form.logo_acquried_company || "",
        uploadUrl: "upload/image",
        icon: "assignment",
        error: this.validator.message(
          "logo_acquried_company",
          form.logo_acquried_company,
          "min:3"
        ),
      },
      {
        name: "acquired_company_name",
        label: "Acquired Company Name",
        type: "textbox",
        value: form.acquired_company_name || "",
        icon: "assignment",
        error: this.validator.message(
          "acquired_company_name",
          form.acquired_company_name,
          "required|min:3"
        ),
      },
      {
        name: "website",
        label: "Acquired Company Website",
        type: "textbox",
        value: form.website || "",
        icon: "assignment",
        error: this.validator.message("website", form.website, "required|url"),
      },
      {
        name: "date_of_acquisition",
        label: "Date of Acquisition",
        type: "date",
        value: form.date_of_acquisition || "",
        icon: "assignment",
        error: this.validator.message(
          "date_of_acquisition",
          form.date_of_acquisition,
          "required|min:3"
        ),
      },
      {
        name: "currency",
        label: "Currency",
        type: "autocomplete",
        url: "currency",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.currency,
        option: { label: form.country, value: form.currency },
        error: this.validator.message("currency", form.currency, "required"),
      },
      {
        name: "acquired_amount",
        label: "Acquired Amount",
        type: "textbox",
        value: form.acquired_amount || "",
        icon: "assignment",
        error: this.validator.message(
          "acquired_amount",
          form.acquired_amount,
          "required|numeric"
        ),
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
        logo_acquried_company: this.state.form.logo_acquried_company,
        acquired_company_name: this.state.form.acquired_company_name,
        date_of_acquisition: this.state.form.date_of_acquisition,
        vendor_id: id,
        currency: this.state.form.currency,
        website: this.state.form.website,
        acquired_amount: this.state.form.acquired_amount,
      };
      if (childId && childId === "new") {
        this.props.create(
          "formData",
          `acquisition/${this.props.match.params}`,
          data
        );
      } else {
        this.props.update(
          "formData",
          `acquisition/${this.props.match.params}`,
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
            this.setState(
              {
                form: {
                  ...this.state.form,
                  logo_acquried_company: response.data.url,
                },
              },
              () => this.props.hideLoader()
            );
          }
        });
    } else {
      // this.handleError();
      this.validator.showMessageFor("website");
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
        ._get(`acquisition/${this.props.match.params}`, childId)
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
    let title = "Add New Vendors Acquisition";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Vendors Acquisition Details";
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

AcquisitionForm.propTypes = {
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
  )(AcquisitionForm)
);

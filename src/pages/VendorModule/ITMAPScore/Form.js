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
import { YEAR } from "../../../_constants/form.constants";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from "react-redux";
import { crudActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";

const initialState = {
  id: "new",
  form: {
    overall_score: 0,
    vendor_visiblity_score: 0,
    vendor_visiblity_score_system: 0,
    short_term_technology_score: 0,
    long_term_technology_score: 0,
    innovation_value_score: 0,
    year: "",
  },
};
class ITMAPScoreForm extends React.PureComponent {
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
    newState.form.overall_score =
      (parseInt(newState.form.vendor_visiblity_score) +
        parseInt(newState.form.short_term_technology_score) +
        parseInt(newState.form.long_term_technology_score) +
        parseInt(newState.form.innovation_value_score)) /
      4;
    this.setState(newState);
    this.handleError();
  }

  getFormFields = () => {
    const { form } = this.state;
    const formFields = [
      {
        name: "vendor_visiblity_score_system",
        label: "Vendor Visiblity Score System",
        type: "textbox",
        value: form.vendor_visiblity_score_system,
        icon: "assignment",
        error: this.validator.message(
          "vendor_visiblity_score_system",
          form.vendor_visiblity_score_system,
          "required|between:1,5,num"
        ),
      },
      {
        name: "vendor_visiblity_score",
        label: "Vendor Visiblity Score",
        type: "textbox",
        value: form.vendor_visiblity_score,
        icon: "assignment",
        error: this.validator.message(
          "vendor_visiblity_score",
          form.vendor_visiblity_score,
          "required|between:1,5,num"
        ),
      },
      {
        name: "short_term_technology_score",
        label: "Short Term Technology Score",
        type: "textbox",
        value: form.short_term_technology_score,
        icon: "assignment",
        error: this.validator.message(
          "short_term_technology_score",
          form.short_term_technology_score,
          "required|between:1,5,num"
        ),
      },
      {
        name: "long_term_technology_score",
        label: "Long Term Technology Score",
        type: "textbox",
        value: form.long_term_technology_score,
        icon: "assignment",
        error: this.validator.message(
          "long_term_technology_score",
          form.long_term_technology_score,
          "required|between:1,5,num"
        ),
      },
      {
        name: "innovation_value_score",
        label: "Innovation Value Score",
        type: "textbox",
        value: form.innovation_value_score,
        icon: "assignment",
        error: this.validator.message(
          "innovation_value_score",
          form.innovation_value_score,
          "required|between:1,5,num"
        ),
      },
      {
        name: "overall_score",
        label: "Overall Score",
        type: "textbox",
        disabled: true,
        value: form.overall_score,
        icon: "assignment",
        error: this.validator.message(
          "overall_score",
          form.overall_score,
          "required|numeric"
        ),
      },
      {
        name: "year",
        label: "Year",
        type: "select",
        options: YEAR(),
        value: form.year || "",
        icon: "assignment",
        error: this.validator.message("year", form.year, "required"),
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
        overall_score: this.state.form.overall_score,
        vendor_visiblity_score: this.state.form.vendor_visiblity_score,
        vendor_visiblity_score_system: this.state.form
          .vendor_visiblity_score_system,
        vendor_id: id,
        short_term_technology_score: this.state.form
          .short_term_technology_score,
        long_term_technology_score: this.state.form.long_term_technology_score,
        innovation_value_score: this.state.form.innovation_value_score,
        year: this.state.form.year,
      };
      if (childId && childId === "new") {
        this.props.create(
          "formData",
          `itmap-scores/${this.props.match.params}`,
          data
        );
      } else {
        this.props.update(
          "formData",
          `itmap-scores/${this.props.match.params}`,
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
        ._get(`itmap-scores/${this.props.match.params}`, childId)
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
    let title = "Add New ITMAP Score Details";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit ITMAP Score Details";
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

ITMAPScoreForm.propTypes = {
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
  )(ITMAPScoreForm)
);

/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// material ui icons
import ViewModule from "@material-ui/icons/ViewModule";

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
    about: "",
    notes: "",
    report_notes: "",
    min_price: "",
    max_price: "",
    category_id: "",
    category: "",
    parent_id: "",
    parent: "",
    document_type_id: "",
    meta_keywords: "",
    seo_url_slug: "",
    meta_description: "",
    meta_title: "",
    documents: [],
    status: false,
  },
};
class ModuleForm extends React.PureComponent {
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
        name: "name",
        label: "Name",
        type: "textbox",
        value: form.name || "",
        icon: "assignment",
        error: this.validator.message("name", form.name, "required|min:3"),
      },
      {
        name: "category_id",
        label: "Choose Category",
        type: "autocomplete",
        url: "categories?not_categories=[5]",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.category_id,
        option: { label: form.category, value: form.category_id },
        error: this.validator.message(
          "category_id",
          form.category_id,
          "required"
        ),
      },
    ];

    if (form.category_id) {
      formFields.push({
        name: "parent_id",
        label: "Choose Parent",
        type: "autocomplete",
        url: "modules",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.parent_id,
        filters: {
          category_id: form.category_id,
        },
        option: { label: form.parent, value: form.parent_id },
        error: "",
      });
    }
    formFields.push({
      name: "about",
      label: "About",
      type: "textarea",
      value: form.about || "",
      icon: "assignment",
      error: this.validator.message("about", form.about, "min:1"),
    });
    formFields.push({
      name: "notes",
      label: "Pricing Notes",
      type: "textarea",
      value: form.notes || "",
      icon: "assignment",
      error: this.validator.message("notes", form.notes, "min:1"),
    });

    formFields.push({
      name: "report_notes",
      label: "Report Notes",
      type: "textarea",
      value: form.report_notes || "",
      icon: "assignment",
      error: this.validator.message("report_notes", form.report_notes, "min:1"),
    });
    formFields.push({
      name: "min_price",
      label: "Min Price",
      type: "textbox",
      value: form.min_price || "",
      icon: "assignment",
      error: this.validator.message("min_price", form.min_price, "min:1"),
    });
    formFields.push({
      name: "max_price",
      label: "Max Price",
      type: "textbox",
      value: form.max_price || "",
      icon: "assignment",
      error: this.validator.message("max_price", form.max_price, "min:1"),
    });
    formFields.push({
      name: "seo_url_slug",
      label: "SEO SLUG URL",
      type: "textbox",
      value: form.seo_url_slug || "",
      icon: "assignment",
      error: this.validator.message("seo_url_slug", form.seo_url_slug, "min:0"),
    });
    formFields.push({
      name: "meta_title",
      label: "Meta Title",
      type: "textbox",
      value: form.meta_title || "",
      icon: "assignment",
      error: this.validator.message("meta_title", form.meta_title, "min:1"),
    });
    formFields.push({
      name: "meta_description",
      label: "Meta Description",
      type: "textarea",
      value: form.meta_description || "",
      icon: "assignment",
      error: this.validator.message(
        "meta_description",
        form.meta_description,
        "min:1"
      ),
    });
    formFields.push({
      name: "meta_keywords",
      label: "Meta Keywords",
      type: "textbox",
      value: form.meta_keywords || "",
      icon: "assignment",
      error: this.validator.message(
        "meta_keywords",
        form.meta_keywords,
        "min:1"
      ),
    });
    formFields.push({
      name: "status",
      label: "Status",
      value: form.status ? true : false,
      type: "checkbox",
    });

    formFields.push({
      name: "documents",
      label: "Choose documents",
      type: "multi_group_checkbox",
      url: "app/documents/children",
      getOptionLabel: "name",
      getOptionValue: "id",
      getSubOptionLabel: "name",
      getSubOptionValue: "id",
      value: form.documents || "",
      // error: this.validator.message('documents', form.documents, 'required')
    });

    return formFields;
  };

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
      let data = {
        name: this.state.form.name,
        category_id: this.state.form.category_id,
        parent_id: this.state.form.parent_id,
        about: this.state.form.about,
        notes: this.state.form.notes,
        report_notes: this.state.form.report_notes,
        min_price: this.state.form.min_price,
        max_price: this.state.form.max_price,
        meta_description: this.state.form.meta_description,
        meta_title: this.state.form.meta_title,
        meta_keywords: this.state.form.meta_keywords,
        seo_url_slug: this.state.form.seo_url_slug,
        status: this.state.form.status ? true : false,
        documents: JSON.stringify(this.state.form.documents),
      };
      const { id } = this.props.match.params;
      if (id && id === "new") {
        this.props.create("formData", "modules", data);
      } else {
        this.props.update("formData", "modules", id, data);
      }
      this.goBack();
    } else {
      this.handleError();
    }
  }

  bindData = () => {
    const { id } = this.props.match.params;
    if (id && id !== "new") {
      crudService._get("modules", id).then((response) => {
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
    let title = "Add Modules";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Module";
      btnText = "Update";
    }

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <ViewModule />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>{title}</h4>
            </CardHeader>
            <CardBody>
              <MyForm
                handleInputChange={this.handleInputChange}
                formFields={this.getFormFields()}
                handleSubmit={this.handleSubmit}
                handleCancel={this.goBack}
                fileUpload={this.fileUpload}
                btnText={btnText}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

ModuleForm.propTypes = {
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
  create: crudActions._create,
  update: crudActions._update,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actionCreators
  )(ModuleForm)
);

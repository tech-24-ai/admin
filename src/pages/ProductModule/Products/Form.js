/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// material ui icons
import Palette from "@material-ui/icons/Palette";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import MyForm from "components/Form";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

import { connect } from "react-redux";
import { crudActions, fileActions } from "../../../_actions";
import { crudService } from "../../../_services";
import SimpleReactValidator from "simple-react-validator";

import StepsForm from "./Steps";

const initialState = {
  id: "new",
  form: {
    name: "",
    notes: "",
    vendor: "",
    categoryId: "",
    moduleId: "",
    rating: "",
    link: "",
    countryGroups: [],
    stepsData: [],
  },
};
class ProductForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileUpload = this.fileUpload.bind(this);

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

  setStepsData = (data) => {
    this.setState({ stepsData: data });
  };

  getFormFields = () => {
    const { form, stepsData } = this.state;
    const formFields = [
      {
        name: "name",
        label: "Name",
        type: "textbox",
        value: form.name || "",
        icon: "assignment",
        error: this.validator.message("name", form.name, "required"),
      },
      {
        name: "countryGroups",
        label: "Choose Country Category",
        type: "multi_autocomplete",
        url: `country_groups`,
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.countryGroups,
        error: this.validator.message(
          "countryGroups",
          form.countryGroups,
          "required"
        ),
      },
      {
        name: "vendor",
        label: "Choose Vendor",
        type: "autocomplete",
        url: "vendors",
        getOptionLabel: "name",
        getOptionValue: "name",
        value: form.vendor,
        option: { label: form.vendor, value: form.vendor },
        error: this.validator.message("vendor", form.vendor, "required"),
      },
      {
        name: "categoryId",
        label: "Choose Category",
        type: "autocomplete",
        url: "categories",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.categoryId,
        error: this.validator.message(
          "categoryId",
          form.categoryId,
          "required"
        ),
      },
      {
        name: "moduleId",
        label: "Choose Module",
        type: "group_autocomplete",
        url: "app/module/children",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.moduleId,
        options: [
          {
            name: "category_id",
            value: form.categoryId,
          },
        ],
        error: this.validator.message("moduleId", form.moduleId, "required"),
      },
      {
        name: "rating",
        label: "Rating",
        type: "textbox",
        value: form.rating || "",
        icon: "star_border",
        error: this.validator.message("rating", form.rating, "min:1"),
      },
      {
        name: "link",
        label: "Product Webpage",
        type: "textbox",
        value: form.link || "",
        icon: "link",
        error: this.validator.message("link", form.link, "url"),
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
        name: "steps",
        label: "steps",
        type: "steps",
        btnText: "Open Steps",
        component: (
          <StepsForm
            onSubmit={this.setStepsData}
            stepsData={stepsData}
            moduleId={form.moduleId}
          />
        ),
      },
    ];

    return formFields;
  };

  handleError() {
    this.validator.showMessages();
    this.forceUpdate();
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

  goBack = () => {
    this.resetForm();
    this.props.history.goBack();
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      const countryCategories = this.state.form.countryGroups.map(
        (option) => option.id
      );
      let stepsData = [];
      if (this.state.stepsData) {
        this.state.stepsData.forEach((element) => {
          let value = element.value;
          if (Array.isArray(element.value)) {
            value = element.value.map((index) => String(index));
          } else {
            value = element.value;
          }
          stepsData.push({
            ...element,
            value: value,
          });
        });
      }

      let data = {
        name: this.state.form.name,
        vendor: this.state.form.vendor,
        categoryId: this.state.form.categoryId,
        moduleId: this.state.form.moduleId,
        rating: this.state.form.rating,
        notes: this.state.form.notes,
        link: this.state.form.link,
        countryCategories: JSON.stringify(countryCategories),
        questions: JSON.stringify(stepsData),
      };

      const { id } = this.props.match.params;
      if (id && id === "new") {
        this.props.create("formData", "products", data);
      } else {
        this.props.update("formData", "products", id, data);
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
      crudService._get("products", id).then((response) => {
        if (response.status === 200) {
          this.setState({
            form: response.data,
            stepsData: response.data.questions,
          });
        }
      });
    }
  };

  componentDidMount() {
    this.bindData();
  }

  fileUpload(e) {
    let file = e.target.files[0];
    this.props.upload(file, "image");
  }

  render() {
    const { classes } = this.props;
    const { id } = this.props.match.params;
    let title = "Add Products";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Product";
      btnText = "Update";
    }

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Palette />
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

ProductForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { form, fileUpload, confirm } = state;

  return {
    form,
    fileUpload,
    confirm,
  };
};

const actionCreators = {
  getCrud: crudActions._get,
  clearCrud: crudActions._clear,
  create: crudActions._create,
  update: crudActions._update,
  upload: fileActions._upload,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actionCreators
  )(ProductForm)
);

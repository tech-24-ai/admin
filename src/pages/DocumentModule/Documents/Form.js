/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// material ui icons
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import MyForm from "components/Form";
import {
  EU_SUBSCRIPTION_CATEGORY,
  EU_DOCUMENT_CATEGORY,
} from "../../../_constants/form.constants";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

import { connect } from "react-redux";
import { crudActions, fileActions } from "../../../_actions";
import { crudService } from "../../../_services";
import SimpleReactValidator from "simple-react-validator";
import { Assignment, Category } from "@material-ui/icons";

const initialState = {
  id: "new",
  document_types: null,
  documentUpload: null,
  form: {
    document_type_id: "",
    document_type: "",
    name: "",
    url: "",
    price: "",
    is_embedded: 0,
    seo_url_slug: "",
    tag: "",
    description: "",
    document_category: "3",
    subscription_category: "",
    basic_document_price: "",
    basic_document_special_price: "",
    advance_document_price: "",
    advance_document_special_price: "",
  },
};

class DocumentForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }

  handleInputChange(event) {
    const newState = Object.assign({}, this.state);
    console.log(event.targe);
    // newState.form[event.target.name] = event.target.value;
    if (!!event.target) {
      if (event.target.type == "checkbox") {
        newState.form[event.target.name] = event.target.checked;
      } else {
        newState.form[event.target.name] = event.target.value;
      }
    } else {
      newState.form["description"] = event;
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
        error: this.validator.message("name", form.name, "required"),
      },
      {
        name: "document_type_id",
        label: "Choose Document Type",
        type: "autocomplete",
        url: "document_types",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.document_type_id || "",
        option: { label: form.document_type, value: form.document_type_id },
        error: this.validator.message(
          "document_type_id",
          form.document_type_id,
          "required"
        ),
      },
      {
        name: "url",
        label: "Url",
        type: "file",
        value: form.url || "",
        uploadUrl: "upload/document",
        error: this.validator.message("url", form.url, "url"),
      },
      {
        name: "is_embedded",
        label: "Is Embedded",
        type: "checkbox",
        value: form.is_embedded == 1 ? true : false,
      },
      {
        name: "seo_url_slug",
        label: "Seo Slug Url",
        type: "textbox",
        value: form.seo_url_slug || "",
        icon: "assignment",
        error: this.validator.message(
          "seo_url_slug",
          form.seo_url_slug,
          "required|min:3"
        ),
      },
      {
        name: "tag",
        label: "Tag",
        type: "textbox",
        value: form.tag || "",
        icon: "assignment",
      },
      {
        name: "description",
        label: "Description",
        type: "editor",
        value: form.description,
        icon: "assignment",
        error: this.validator.message("editor1", form.description, "min:3"),
      },
      // {
      //   name: "document_category",
      //   label: "Document Category",
      //   type: "select",
      //   options: EU_DOCUMENT_CATEGORY,
      //   value: form.document_category || "",
      //   icon: "assignment",
      //   error: this.validator.message(
      //     "document_category",
      //     form.document_category,
      //     "required"
      //   ),
      // },
      {
        name: "subscription_category",
        label: "Subscription Category",
        type: "select",
        options: EU_SUBSCRIPTION_CATEGORY,
        value: form.subscription_category || "",
        icon: "assignment",
        error: this.validator.message(
          "subscription_category",
          form.subscription_category,
          "required"
        ),
      },
      {
        name: "basic_document_price",
        label: "Basic Document Price",
        type: "textbox",
        value: form.basic_document_price || "",
        icon: "assignment",
        hidden:
          form.subscription_category == "3" || form.subscription_category == "2"
            ? false
            : true,
        error: this.validator.message(
          "basic_document_price",
          form.basic_document_price,
          form.subscription_category == "3" || form.subscription_category == "2"
            ? ""
            : ""
        ),
      },
      {
        name: "basic_document_special_price",
        label: "Basic Document Special Price",
        type: "textbox",
        value: form.basic_document_special_price || "",
        icon: "assignment",
        hidden:
          form.subscription_category == "3" || form.subscription_category == "2"
            ? false
            : true,
        error: this.validator.message(
          "basic_document_special_price",
          form.basic_document_special_price,
          form.subscription_category == "3" || form.subscription_category == "2"
            ? ""
            : ""
        ),
      },
      {
        name: "advance_document_price",
        label: "Advance Document Price",
        type: "textbox",
        value: form.advance_document_price || "",
        icon: "assignment",
        hidden: form.subscription_category == "3" ? false : true,
        error: this.validator.message(
          "advance_document_price",
          form.advance_document_price,
          form.subscription_category == "3" ? "" : ""
        ),
      },
      {
        name: "advance_document_special_price",
        label: "Advance Document Special Price",
        type: "textbox",
        value: form.advance_document_special_price || "",
        hidden: form.subscription_category == "3" ? false : true,
        icon: "assignment",
        error: this.validator.message(
          "advance_document_special_price",
          form.advance_document_special_price,
          form.subscription_category == "3" ? "" : ""
        ),
      },
    ];

    return formFields;
  };

  handleError() {
    this.validator.showMessages();
    this.forceUpdate();
  }

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
      let data = {
        document_type_id: this.state.form.document_type_id,
        name: this.state.form.name,
        url: this.state.form.url,
        price: this.state.form.price,
        description: this.state.form.description,
        document_category: this.state.form.document_category,
        seo_url_slug: this.state.form.seo_url_slug,
        tag: this.state.form.tag,
        is_embedded: this.state.form.is_embedded == true ? 1 : 0,
        advance_document_price: this.state.form.advance_document_price,
        advance_document_special_price: this.state.form
          .advance_document_special_price,
        basic_document_price: this.state.form.basic_document_price,
        basic_document_special_price: this.state.form
          .basic_document_special_price,
        subscription_category: this.state.form.subscription_category,
      };
      const { id } = this.props.match.params;
      if (id && id === "new") {
        this.props.create("formData", "documents", data);
      } else {
        this.props.update("formData", "documents", id, data);
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
      crudService._get("documents", id).then((response) => {
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
    let title = "Add New Document";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Document Details";
      btnText = "Update";
    }

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <InsertDriveFile />
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

DocumentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapState(state) {
  const { form, confirm } = state;
  return { form, confirm };
}

const actionCreators = {
  getDocumentTypes: crudActions._getAll,
  getCrud: crudActions._get,
  clearCrud: crudActions._clear,
  create: crudActions._create,
  update: crudActions._update,
  upload: fileActions._upload,
};

export default withStyles(styles)(
  connect(
    mapState,
    actionCreators
  )(DocumentForm)
);

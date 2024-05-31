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
  DOCUMENT_STATUS,
  EU_SUBSCRIPTION_CATEGORY,
  EU_DOCUMENT_CATEGORY,
  DOCUMENT_CONTENT_TYPE,
} from "../../../_constants/form.constants";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

import { connect } from "react-redux";
import {
  crudActions,
  fileActions,
  alertActions,
  loaderActions,
} from "../../../_actions";
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
    category_id: "",
    category_name: "",
    research_topic_id: "",
    topic_name: "",
    name: "",
    image: "",
    document_content_type: "",
    google_doc_url: "",
    url: "",
    drive_document_id: "",
    price: "",
    // is_embedded: 0,
    seo_url_slug: "",
    tags: [],
    description: "",
    details: "",
    document_category: "3",
    // subscription_category: "",
    // basic_document_price: "",
    // basic_document_special_price: "",
    // advance_document_price: "",
    // advance_document_special_price: "",
    status: "",
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
    // newState.form[event.target.name] = event.target.value;
    if (!!event.target) {
      if (event.target.type == "checkbox") {
        newState.form[event.target.name] = event.target.checked;
      } else if (event.target.name == "document_content_type") {
        newState.form[event.target.name] = event.target.value;
        newState.form["url"] = "";
        newState.form["description"] = "";
        // newState.form["drive_document_id"] = "";
        // newState.form["google_doc_url"] = "";
      }
      // else if (event.target.name == "url") {
      //   let val = event.target.value;
      //   if(checkValidUrl(val)) {
      //     newState.form[event.target.name] = event.target.value;
      //   } else {
      //     newState.form[event.target.name] = "";
      //     this.props.showError("please enter valid url, Valid only google docs url.");
      //   }
      // }
      else {
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
        name: "category_id",
        label: "Choose Category",
        type: "autocomplete",
        url: "categories/all",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.category_id || "",
        option: { label: form.category_name, value: form.category_id },
        error: this.validator.message(
          "category_id",
          form.category_id,
          "required"
        ),
      },
      {
        name: "research_topic_id",
        label: "Choose Research Topic",
        type: "autocomplete",
        url: "research_topics",
        getOptionLabel: "title",
        getOptionValue: "id",
        value: form.research_topic_id || "",
        option: { label: form.topic_name, value: form.research_topic_id },
        error: this.validator.message(
          "research_topic_id",
          form.research_topic_id,
          "required"
        ),
      },
      {
        name: "image",
        label: "Thumbnail Image",
        type: "imageUpload",
        uploadUrl: "upload/image",
        value: form.image || "",
        icon: "image",
        error: this.validator.message("image", form.image, "required"),
      },
      {
        name: "document_content_type",
        label: "Document Content Type",
        type: "select",
        options: DOCUMENT_CONTENT_TYPE,
        value: form.document_content_type || "",
        icon: "assignment",
        error: this.validator.message(
          "document_content_type",
          form.document_content_type,
          "required"
        ),
      },
    ];

    // if (form.document_content_type && form.document_content_type == 1) {
    //   formFields.push({
    //     name: "drive_document_id",
    //     label: "Upload Document",
    //     type: "googleDriveFileUpload",
    //     value: form.drive_document_id || "",
    //     uploadUrl: "uploadDocumentOnGoogleDrive",
    //     error: this.validator.message(
    //       "url",
    //       form.drive_document_id,
    //       "required"
    //     ),
    //   });
    // } else if (form.document_content_type && form.document_content_type == 2) {
    //   formFields.push({
    //     name: "google_doc_url",
    //     label: "Document Url",
    //     type: "textbox",
    //     value: form.google_doc_url || "",
    //     error: this.validator.message(
    //       "url",
    //       form.google_doc_url,
    //       "required|url"
    //     ),
    //   });
    // } 
    if (form.document_content_type && form.document_content_type == 3) {
      formFields.push({
        name: "url",
        label: "Upload Document",
        type: "file",
        value: form.url || "",
        uploadUrl: "upload/researchDocument",
        error: this.validator.message("url", form.url, "required|url"),
      });
    }

    formFields.push(
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
        name: "tags",
        label: "Choose Tags",
        type: "multi_autocomplete",
        url: `research_tags`,
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.tags,
        error: this.validator.message("Tag", form.tags, "required"),
      },
      {
        name: "details",
        label: "Details",
        type: "textarea",
        value: form.details || "",
        error: this.validator.message("details", form.details, "required"),
      }
    );

    if (form.document_content_type && form.document_content_type == 4) {
      formFields.push({
        name: "description",
        label: "Editor",
        type: "pageBuilder",
        value: form.description,
        icon: "assignment",
        // error: this.validator.message("editor2", form.description, "min:3"),
      });
    } 
    else 
    {
      formFields.push({
        name: "description",
        label: "Description",
        type: "editor",
        value: form.description,
        icon: "assignment",
        error: this.validator.message("editor1", form.description, "min:3"),
      });
    }

    formFields.push({
      name: "status",
      label: "Status",
      type: "select",
      options: DOCUMENT_STATUS,
      value: form.status || "",
      icon: "assignment",
      error: this.validator.message("status", form.status, "required"),
    });

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
      const documentTags = this.state.form.tags.map((option) => option.id);

      let description = "";

      if (this.state.form.document_content_type == 4) {
        description = this.state.form.description;
        if (typeof this.state.form.description === "object") {
          description = JSON.stringify(this.state.form.description);
        }
      } else {
        description = this.state.form.description;
      }

      let data = {
        document_type_id: this.state.form.document_type_id,
        category_id: this.state.form.category_id,
        research_topic_id: this.state.form.research_topic_id,
        name: this.state.form.name,
        image: this.state.form.image,
        document_content_type: this.state.form.document_content_type,
        drive_document_id: this.state.form.drive_document_id,
        url: this.state.form.url,
        google_doc_url: this.state.form.google_doc_url,
        price: this.state.form.price,
        description: description,
        document_category: this.state.form.document_category,
        seo_url_slug: this.state.form.seo_url_slug,
        tags: JSON.stringify(documentTags),
        status: this.state.form.status,
        details: this.state.form.details,
        // is_embedded: this.state.form.is_embedded == true ? 1 : 0,
        // advance_document_price: this.state.form.advance_document_price,
        // advance_document_special_price: this.state.form
        //   .advance_document_special_price,
        // basic_document_price: this.state.form.basic_document_price,
        // basic_document_special_price: this.state.form
        //   .basic_document_special_price,
        // subscription_category: this.state.form.subscription_category,
      };

      if (
        data.url &&
        data.document_content_type == 1 &&
        drive_document_id == ""
      ) {
        this.props.showError(
          "Please choose the file to upload over Google Drive."
        );
        return false;
      } else if (
        data.url &&
        data.document_content_type == 2 &&
        !checkValidUrl(data.google_doc_url)
      ) {
        this.props.showError("Only Google docs URL is allowed.");
        return false;
      } else if (
        data.url &&
        data.document_content_type == 3 &&
        !checkDomainUrl(data.url)
      ) {
        this.props.showError("Please choose the file to upload.");
        return false;
      }

      const { id } = this.props.match.params;
      if (id && id === "new") {
        this.props.showLoader();
        crudService._create("documents", data).then((response) => {
          if (response.status === 200) {
            this.props.hideLoader();
            this.resetForm();
            this.goBack();
          }
        });
      } else {
        this.props.showLoader();
        crudService._update("documents", id, data).then((response) => {
          if (response.status === 200) {
            this.props.hideLoader();
            this.resetForm();
            this.goBack();
          }
        });
      }
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

function checkValidUrl(val) {
  let urlRegx = new RegExp("(docs.google.com)(://[A-Za-z]+-)?", "i");
  if (urlRegx.test(val)) {
    return true;
  } else {
    return false;
  }
}

function checkDomainUrl(val) {
  let urlRegx = new RegExp("(tech24)(://[A-Za-z]+-)?", "i");
  if (urlRegx.test(val)) {
    return true;
  } else {
    return false;
  }
}

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
  showError: alertActions.error,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default withStyles(styles)(
  connect(
    mapState,
    actionCreators
  )(DocumentForm)
);

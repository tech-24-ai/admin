import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MailOutline from "@material-ui/icons/Business";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import MyForm from "components/Form";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import { connect } from "react-redux";
import { crudActions } from "../../../_actions";
import { crudService } from "../../../_services";
import { BLOG_STATUS } from "../../../_constants/form.constants";

import SimpleReactValidator from "simple-react-validator";

const initialState = {
  id: "new",
  form: {
    name: "",
    description: "",
    category: "",
    meta_description: "",
    details: "",
    blog_topic_id: "",
    meta_title: "",
    meta_keywords: "",
    status: "",
    image: "",
    banner: "",
    slug: "",
    html: { html: "", css: "" },
  },
};

class BlogListForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }

  handleInputChange(event) {
    console.log("EVent", event);
    const newState = Object.assign({}, this.state);
    if (!!event.target) {
      newState.form[event.target.name] = event.target.value;
    } else {
      newState.form["html"] = event;
    }
    this.setState(newState);
    this.handleError();
  }

  getFormFields = () => {
    const { form } = this.state;
    const formFields = [
      {
        name: "blog_topic_id",
        label: "Choose Category",
        type: "autocomplete",
        url: "categories?not_categories=[5]",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.blog_topic_id,
        option: { label: form.category, value: form.blog_topic_id },
        error: this.validator.message(
          "blog_topic_id",
          form.blog_topic_id,
          "required"
        ),
      },
      {
        name: "name",
        label: "Name",
        type: "textbox",
        value: form.name || "",
        icon: "assignment",
        error: this.validator.message("name", form.name, "required|min:3"),
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
        name: "details",
        label: "Tags",
        type: "textbox",
        value: form.details || "",
        icon: "assignment",
        error: this.validator.message(
          "details",
          form.details,
          "required|min:3"
        ),
      },

      {
        name: "status",
        label: "Status",
        type: "select",
        options: BLOG_STATUS,
        value: form.status || "",
        icon: "assignment",
        error: this.validator.message("status", form.status, "required"),
      },
      {
        name: "banner",
        label: "Banner Image",
        type: "imageUpload",
        aspect: Number(20 / 5),
        uploadUrl: "upload/image",
        value: form.banner || "",
        icon: "image",
        error: this.validator.message("banner", form.banner, "required"),
      },
      {
        name: "slug",
        label: "Slug",
        type: "textbox",
        value: form.slug || "",
        icon: "assignment",
        error: this.validator.message("slug", form.slug, "required|min:3"),
      },
      {
        name: "meta_title",
        label: "Meta Title",
        type: "textbox",
        value: form.meta_title || "",
        icon: "assignment",
        error: this.validator.message(
          "meta_title",
          form.meta_title,
          "required|min:3"
        ),
      },
      {
        name: "meta_description",
        label: "Meta Description",
        type: "textbox",
        value: form.meta_description || "",
        icon: "assignment",
        error: this.validator.message(
          "meta_description",
          form.meta_description,
          "required|min:3"
        ),
      },
      {
        name: "meta_keywords",
        label: "Meta Keywords",
        type: "textbox",
        value: form.meta_keywords || "",
        icon: "assignment",
        error: this.validator.message(
          "meta_keywords",
          form.meta_keywords,
          "required|min:3"
        ),
      },
      {
        name: "html",
        label: "Editor",
        type: "pageBuilder",
        value: form.html,
        icon: "assignment",
        // error: this.validator.message("editor2", form.html, "min:3"),
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
    console.log("IsValid", this.validator.allValid());
    if (this.validator.allValid()) {
      let data = {
        blog_topic_id: this.state.form.blog_topic_id,
        name: this.state.form.name,
        status: this.state.form.status,
        meta_title: this.state.form.name,
        details: this.state.form.details,
        meta_description: this.state.form.meta_description,
        meta_keywords: this.state.form.meta_keywords,
        image: this.state.form.image,
        banner: this.state.form.banner,
        slug: this.state.form.slug,
        html: JSON.stringify(this.state.form.html),
      };
      console.log("DATA", data);
      const { id } = this.props.match.params;
      if (id && id === "new") {
        this.props.create("formData", "blogs", data);
      } else {
        this.props.update("formData", "blogs", id, data);
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
    const { id } = this.props.match.params;
    if (id && id !== "new") {
      crudService._get("blogs", id).then((response) => {
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
    let title = "Add Blog";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Blog List";
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

BlogListForm.propTypes = {
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
  )(BlogListForm)
);

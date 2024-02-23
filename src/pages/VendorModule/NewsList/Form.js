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

import { connect } from "react-redux";
import { crudActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";

const initialState = {
  id: "new",
  form: {
    news_title: "",
    news_link: "",
    news_thumbnail: "",
    is_news_active: "",
    news_date: new Date(),
    news_source: ""
  },
};
class NewsListForm extends React.PureComponent {
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
        name: "news_title",
        label: "News Title",
        type: "textbox",
        value: form.news_title || "",
        icon: "assignment",
        error: this.validator.message("news_title", form.news_title, "min:3"),
      },
      {
        name: "news_link",
        label: "News Link",
        type: "textbox",
        value: form.news_link || "",
        icon: "assignment",
        error: this.validator.message(
          "news_link",
          form.news_link,
          "required|url"
        ),
      },
      {
        name: "news_thumbnail",
        label: "News Thumbnail",
        type: "imageUpload",
        value: form.news_thumbnail || "",
        icon: "assignment",
        uploadUrl: "upload/image",
        error: this.validator.message("news_thumbnail", form.news_thumbnail, "required|min:3"),
      },
      {
        name: "is_news_active",
        label: "Is News Active",
        type: "checkbox",
        value: form.is_news_active ? true : false,
      },
      {
        name: "news_date",
        label: "News Date",
        type: "date",
        value: form.news_date || "",
        icon: "assignment",
        error: this.validator.message(
          "news_date",
          form.news_date,
          "required"
        ),
      },
      {
        name: "news_source",
        label: "News Source",
        type: "autocomplete",
        url: "rss",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.news_source,
        option: { label: form.country, value: form.news_source },
        error: this.validator.message(
          "news_source",
          form.news_source,
          "required"
        ),
      }
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
        news_title: this.state.form.news_title,
        news_link: this.state.form.news_link,
        news_thumbnail: this.state.form.news_thumbnail,
        vendor_id: id,
        is_news_active: this.state.form.is_news_active ? true : false,
        news_date: this.state.form.news_date,
        news_source: this.state.form.news_source
      };
      if (childId && childId === "new") {
        this.props.create("formData", `news-list/${this.props.match.params}`, data);
      } else {
        this.props.update("formData", `news-list/${this.props.match.params}`, childId, data);
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
      crudService._get(`news-list/${this.props.match.params}`, childId).then((response) => {
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
    let title = "Add New Vendors News";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Vendors News Details";
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

NewsListForm.propTypes = {
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
  )(NewsListForm)
);

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
import { MONTH, YEAR } from "../../../_constants/form.constants"
import { connect } from "react-redux";
import { crudActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";

const initialState = {
  id: "new",
  form: {
    tweet_count: "",
    retweet_count: "",
    number_followers: "",
    like_count: "",
    reply_count: "",
    quote_count: "",
    // mentions: "",
    year: "",
    month: "",
    // sentiment: "",
  },
};
class TwitterDataForm extends React.PureComponent {
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
        name: "tweet_count",
        label: "Tweet Count",
        type: "textbox",
        value: form.tweet_count || "",
        icon: "assignment",
        error: this.validator.message("tweet_count", form.tweet_count, "required|numeric"),
      },
      {
        name: "retweet_count",
        label: "Retweet Count",
        type: "textbox",
        value: form.retweet_count || "",
        icon: "assignment",
        error: this.validator.message(
          "retweet_count",
          form.retweet_count,
          "required|numeric"
        ),
      },
      {
        name: "like_count",
        label: "Like Count",
        type: "textbox",
        value: form.like_count || "",
        icon: "assignment",
        error: this.validator.message(
          "like_count",
          form.like_count,
          "required|numeric"
        ),
      },
      {
        name: "reply_count",
        label: "Reply Count",
        type: "textbox",
        value: form.reply_count || "",
        icon: "assignment",
        error: this.validator.message(
          "reply_count",
          form.reply_count,
          "required|numeric"
        ),
      },
      {
        name: "quote_count",
        label: "Quote Count",
        type: "textbox",
        value: form.quote_count || "",
        icon: "assignment",
        error: this.validator.message(
          "quote_count",
          form.quote_count,
          "required|numeric"
        ),
      },
      {
        name: "number_followers",
        label: "Number followers",
        type: "textbox",
        value: form.number_followers || "",
        icon: "assignment",
        error: this.validator.message("number_followers", form.number_followers, "required|numeric"),
      },
      {
        name: "year",
        label: "Year",
        type: "select",
        options: YEAR(),
        value: form.year || "",
        icon: "assignment",
        error: this.validator.message(
          "year",
          form.year,
          "required"
        ),
      },
      {
        name: "month",
        label: "Month",
        type: "select",
        options: MONTH,
        value: form.month || "",
        icon: "assignment",
        error: this.validator.message(
          "month",
          form.month,
          "required"
        ),
      },
      // {
      //   name: "mentions",
      //   label: "Mentions",
      //   type: "textbox",
      //   value: form.mentions || "",
      //   icon: "assignment",
      //   error: this.validator.message("mentions", form.mentions, "required|numeric"),
      // },
      // {
      //   name: "sentiment",
      //   label: "Sentiment",
      //   type: "textbox",
      //   value: form.sentiment || "",
      //   icon: "assignment",
      //   error: this.validator.message(
      //     "sentiment",
      //     form.sentiment,
      //     "required"
      //   ),
      // }
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
        tweet_count: this.state.form.tweet_count,
        retweet_count: this.state.form.retweet_count,
        quote_count: this.state.form.quote_count,
        reply_count: this.state.form.reply_count,
        like_count: this.state.form.like_count,
        number_followers: this.state.form.number_followers,
        vendor_id: id,
        mentions: this.state.form.mentions,
        // sentiment: this.state.form.sentiment,
        year: this.state.form.year,
        month: this.state.form.month,
      };
      if (childId && childId === "new") {
        this.props.create("formData", `twitter-data/${this.props.match.params}`, data);
      } else {
        this.props.update("formData", `twitter-data/${this.props.match.params}`, childId, data);
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
      crudService._get(`twitter-data/${this.props.match.params}`, childId).then((response) => {
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
    let title = "Add New Twitter data";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Twitter data Details";
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

TwitterDataForm.propTypes = {
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
  )(TwitterDataForm)
);

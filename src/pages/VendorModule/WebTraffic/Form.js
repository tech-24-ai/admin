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
import moment from 'moment';
const initialState = {
  id: "new",
  form: {
    web_ranking: "",
    page_view_per_user: "",
    page_view_per_million: "",
    reach_per_million: "",
    year: "",
    month: ""
  },
};
class WebTrafficForm extends React.PureComponent {
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
        name: "web_ranking",
        label: "Web Ranking",
        type: "textbox",
        value: form.web_ranking || "",
        icon: "assignment",
        error: this.validator.message("web_ranking", form.web_ranking, "required|numeric"),
      },
      {
        name: "page_view_per_user",
        label: "Page Views per User",
        type: "textbox",
        value: form.page_view_per_user || "",
        icon: "assignment",
        error: this.validator.message(
          "page_view_per_user",
          form.page_view_per_user,
          "required|numeric"
        ),
      },
      {
        name: "page_view_per_million",
        label: "Page View per Million",
        type: "textbox",
        value: form.page_view_per_million || "",
        icon: "assignment",
        error: this.validator.message("page_view_per_million", form.page_view_per_million, "required|numeric"),
      },
      {
        name: "reach_per_million",
        label: "Reach per Million",
        type: "textbox",
        value: form.reach_per_million || "",
        icon: "assignment",
        error: this.validator.message("reach_per_million", form.reach_per_million, "required|numeric"),
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
        web_ranking: this.state.form.web_ranking,
        page_view_per_user: this.state.form.page_view_per_user,
        page_view_per_million: this.state.form.page_view_per_million,
        reach_per_million: this.state.form.reach_per_million,
        vendor_id: id,
        month_id:moment().month(this.state.form.month).format("M"),
        month: this.state.form.month,
        year: this.state.form.year,
      };
      if (childId && childId === "new") {
        this.props.create("formData", `web-traffic/${this.props.match.params}`, data);
      } else {
        this.props.update("formData", `web-traffic/${this.props.match.params}`, childId, data);
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
      crudService._get(`web-traffic/${this.props.match.params}`, childId).then((response) => {
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
    let title = "Add Web Traffic Details";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Web Traffic Details";
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

WebTrafficForm.propTypes = {
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
  )(WebTrafficForm)
);

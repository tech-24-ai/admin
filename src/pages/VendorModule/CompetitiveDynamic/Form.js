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
import { YEAR } from "../../../_constants/form.constants";
import { connect } from "react-redux";
import { crudActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";

const initialState = {
  id: "new",
  form: {
    bubble_name: "",
    bubble_size: "",
    bubble_x: "",
    bubble_y: "",
    bubble_color: "black",
    year: "",
    market: "",
  },
};
class CompetitiveDynamicForm extends React.PureComponent {
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
        name: "bubble_name",
        label: "Choose Vendor",
        type: "autocomplete",
        url: `vendors?vendor_Category=${this.props.selectCategory}`,
        getOptionLabel: "name",
        getOptionValue: "name",
        value: form.bubble_name,
        option: { label: form.bubble_name, value: form.bubble_name },
        error: this.validator.message(
          "bubble_name",
          form.bubble_name,
          "required"
        ),
      },
      {
        name: "bubble_size",
        label: "Bubble Size - Size should be between 1 to 100",
        type: "textbox",
        value: form.bubble_size || "",
        icon: "assignment",
        error: this.validator.message(
          "bubble_size",
          form.bubble_size,
          "required|between:1,100,num"
        ),
      },
      {
        name: "bubble_x",
        label: "Bubble X",
        type: "textbox",
        value: form.bubble_x || "",
        icon: "assignment",
        error: this.validator.message(
          "bubble_x",
          form.bubble_x,
          "required|numeric"
        ),
      },
      {
        name: "bubble_y",
        label: "Bubble Y",
        type: "textbox",
        value: form.bubble_y || "",
        icon: "assignment",
        error: this.validator.message(
          "bubble_y",
          form.bubble_y,
          "required|numeric"
        ),
      },
      {
        name: "bubble_color",
        label: "Bubble Color",
        type: "colorPicker",
        value: form.bubble_color || "",
        icon: "assignment",
      },
      {
        name: "revenue",
        label: "Revenue",
        type: "textbox",
        value: form.revenue || "",
        icon: "assignment",
        error: this.validator.message("revenue", form.revenue, "required"),
      },
      {
        name: "year",
        label: "Year",
        type: "textbox",
        disabled: true,
        value: form.year || "",
        icon: "assignment",
        error: this.validator.message("year", form.year, "required"),
      },
      {
        name: "market",
        label: "Market",
        type: "textbox",
        disabled: true,
        value: form.market.label || "",
        icon: "assignment",
        error: this.validator.message(
          "market",
          form.market,
          "required|aplhanumeric"
        ),
      },
    ];

    return formFields;
  };

  getValue(val) {
    const { id } = this.props;
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
    this.props.closeModal();
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      const { childId, id } = this.props;
      let data = {
        bubble_name: this.state.form.bubble_name,
        bubble_size: this.state.form.bubble_size,
        bubble_x: this.state.form.bubble_x,
        vendor_id: id,
        bubble_y: this.state.form.bubble_y,
        revenue: this.state.form.revenue,
        bubble_color: this.state.form.bubble_color,
        year: this.state.form.year,
        market: this.state.form.market.id,
        category_id: this.state.form.category_id,
      };
      if (childId && childId === "new") {
        this.props.create(
          "formData",
          this.props.url ? this.props.url : `competitive-dynamic/${this.props}`,
          data
        );
      } else {
        this.props.update(
          "formData",
          this.props.url ? this.props.url : `competitive-dynamic/${this.props}`,
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
    const { childId } = this.props;
    if (childId && childId !== "new") {
      crudService
        ._get(
          this.props.url ? this.props.url : `competitive-dynamic/${this.props}`,
          childId
        )
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              form: {
                ...response.data,
                market: this.props.selectedMarket,
                year: this.props.selectedYear,
                category_id: this.props.selectCategory,
              },
            });
          }
        });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          bubble_x: Math.round(this.props.x),
          bubble_y: Math.round(this.props.y),
          market: this.props.selectedMarket,
          year: this.props.selectedYear,
          category_id: this.props.selectCategory,
        },
      });
    }
  };

  componentDidMount() {
    this.bindData();
  }

  render() {
    const { classes } = this.props;
    const { id } = this.props;
    let title = "Add New Bubble";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Bubble";
      btnText = "Update";
    }

    return (
      <GridContainer>
        <GridItem xs={12} sm={12}>
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

CompetitiveDynamicForm.propTypes = {
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
  )(CompetitiveDynamicForm)
);

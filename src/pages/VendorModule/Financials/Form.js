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
import { QUARTER, YEAR } from "../../../_constants/form.constants"

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from "react-redux";
import { crudActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";

const initialState = {
  id: "new",
  form: {
    name: "",
    designation: "",
    photo: "",
    twitter_link: "",
    linkedin_link: "",
    instagram_link: "",
    is_board_of_directors: false,
    is_active: false,
    start_date: "",
    end_date: "",
  },
};
class FinancialsForm extends React.PureComponent {
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
        name: "net_income",
        label: "Net Income",
        type: "textbox",
        value: form.net_income || "",
        icon: "assignment",
        error: this.validator.message("net_income", form.net_income, "numeric"),
      },
      {
        name: "total_assets",
        label: "Total Assets",
        type: "textbox",
        value: form.total_assets || "",
        icon: "assignment",
        error: this.validator.message(
          "total_assets",
          form.total_assets,
          "numeric"
        ),
      },
      {
        name: "total_liabilities",
        label: "Total Liabilities",
        type: "textbox",
        value: form.total_liabilities || "",
        icon: "assignment",
        error: this.validator.message("total_liabilities", form.total_liabilities, "numeric"),
      },
      {
        name: "total_equity",
        label: "Total Equity",
        type: "textbox",
        value: form.total_equity || "",
        icon: "assignment",
        error: this.validator.message("total_equity", form.total_equity, "numeric"),
      },
      {
        name: "reported_eps",
        label: "Reported EPS",
        type: "textbox",
        value: form.reported_eps || "",
        icon: "assignment",
        error: this.validator.message("reported_eps", form.reported_eps, "numeric"),
      },
      {
        name: "gross_profit",
        label: "Gross Profit",
        type: "textbox",
        value: form.gross_profit || "",
        icon: "assignment",
        error: this.validator.message("gross_profit", form.gross_profit, "numeric"),
      },
      {
        name: "rd_investment",
        label: "RD Investment",
        type: "textbox",
        value: form.rd_investment || "",
        icon: "assignment",
        error: this.validator.message("rd_investment", form.rd_investment, "numeric"),
      },
      {
        name: "current_debt",
        label: "Current Debt",
        type: "textbox",
        value: form.current_debt || "",
        icon: "assignment",
        error: this.validator.message("current_debt", form.current_debt, "numeric"),
      },
      {
        name: "total_shares",
        label: "Total Shares",
        type: "textbox",
        value: form.total_shares || "",
        icon: "assignment",
        error: this.validator.message("total_shares", form.total_shares, "numeric"),
      },
      {
        name: "financial_leverage",
        label: "Financial Leverage",
        type: "textbox",
        value: form.financial_leverage || "",
        icon: "assignment",
        error: this.validator.message(
          "financial_leverage",
          form.financial_leverage,
          "numeric"
        ),
      },
      {
        name: "debt_equity_ratio",
        label: "Debt Equity Ratio",
        type: "textbox",
        value: form.debt_equity_ratio || "",
        icon: "assignment",
        error: this.validator.message(
          "debt_equity_ratio",
          form.debt_equity_ratio,
          "numeric"
        ),
      },
      {
        name: "revenue",
        label: "Revenue",
        type: "textbox",
        value: form.revenue || "",
        icon: "assignment",
        error: this.validator.message(
          "revenue",
          form.revenue,
          "numeric"
        ),
      },
      {
        name: "p_e_ratio",
        label: "P E Ratio",
        type: "textbox",
        value: form.p_e_ratio || "",
        icon: "assignment",
        error: this.validator.message(
          "p_e_ratio",
          form.p_e_ratio,
          "numeric"
        ),
      },
      {
        name: "revenue_range",
        label: "Revenue Range",
        type: "textbox",
        value: form.revenue_range || "",
        icon: "assignment",
        error: this.validator.message(
          "revenue_range",
          form.revenue_range,
          "numeric"
        ),
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
        name: "quarter",
        label: "Quarter",
        type: "select",
        options: QUARTER,
        value: form.quarter || "",
        icon: "assignment",
        error: this.validator.message(
          "quarter",
          form.quarter,
          "required"
        ),
      },
      {
        name: "source",
        label: "Source",
        type: "textbox",
        value: form.source || "",
        icon: "assignment",
        error: this.validator.message(
          "source",
          form.source,
          "aplhanumeric"
        ),
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
        net_income: this.state.form.net_income,
        total_assets: this.state.form.total_assets,
        total_liabilities: this.state.form.total_liabilities,
        vendor_id: id,
        total_equity: this.state.form.total_equity,
        financial_leverage: this.state.form.financial_leverage,
        debt_equity_ratio: this.state.form.debt_equity_ratio,
        revenue: this.state.form.revenue,
        reported_eps: this.state.form.reported_eps,
        gross_profit: this.state.form.gross_profit,
        rd_investment: this.state.form.rd_investment,
        current_debt: this.state.form.current_debt,
        total_shares: this.state.form.total_shares,
        p_e_ratio: this.state.form.p_e_ratio,
        year: this.state.form.year,
        quarter: this.state.form.quarter,
        revenue_range: this.state.form.revenue_range,
        source: this.state.form.source,
      };
      if (childId && childId === "new") {
        this.props.create("formData", `financials/${this.props.match.params}`, data);
      } else {
        this.props.update("formData", `financials/${this.props.match.params}`, childId, data);
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
      crudService._get(`financials/${this.props.match.params}`, childId).then((response) => {
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
    let title = "Add New Vendors Financials Details";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Vendors Financials Details";
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

FinancialsForm.propTypes = {
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
  )(FinancialsForm)
);

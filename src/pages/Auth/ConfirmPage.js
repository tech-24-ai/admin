/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MyForm from "components/Form";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

import { connect } from "react-redux";
import { userActions, alertActions } from "../../_actions";

import SimpleReactValidator from "simple-react-validator";
import { useParams } from "react-router-dom";

const initialState = {
  form: {
    password: "",
    confirmPassword: "",
  },
  token: "",
};

class ConfirmPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
    });
  }

  handleInputChange(event) {
    const newState = Object.assign({}, this.state);
    newState.form[event.target.name] = event.target.value;
    this.setState(newState);
    this.handleError();
  }

  getFormFields = () => {
    const { form } = this.state;
    const formFields = [
      {
        name: "password",
        label: "New Password",
        type: "password",
        value: form.password,
        icon: "lock_outline",
        error: this.validator.message(
          "password",
          form.password,
          "required|min:6|max:20"
        ),
      },
      {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        value: form.confirmPassword,
        icon: "lock_outline",
        error: this.validator.message(
          "confirmPassword",
          form.confirmPassword,
          "required|min:6|max:20"
        ),
      },
    ];

    return formFields;
  };

  handleError() {
    this.validator.showMessages();
    this.forceUpdate();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      const { password, confirmPassword } = this.state.form;
      if (password === confirmPassword) {
        this.props.resetPassword(password, this.state.token);
      } else {
        this.props.showError("Both password not matched!");
      }
    } else {
      this.handleError();
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    this.setState({
      token: query.get("token"),
    });
  }

  render() {
    const { classes } = this.props;
    let title = "Tech24 Admin Reset Password";
    let btnText = "Submit";

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <Card login>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="primary"
              >
                <h4 className={classes.cardTitle}>{title}</h4>
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
      </div>
    );
  }
}

ConfirmPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapState(state) {
  const { loggedIn } = state.authentication;
  return { loggedIn };
}

const actionCreators = {
  resetPassword: userActions.resetPassword,
  showError: alertActions.error,
};

export default withStyles(styles)(
  connect(
    mapState,
    actionCreators
  )(ConfirmPage)
);

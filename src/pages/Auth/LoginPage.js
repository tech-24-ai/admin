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
import { userActions } from "../../_actions";

import SimpleReactValidator from "simple-react-validator";

import { Link } from "react-router-dom";

const initialState = {
  form: {
    email: "",
    password: "",
  },
};

class LoginForm extends React.PureComponent {
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
        name: "email",
        label: "Email",
        type: "textbox",
        value: form.email,
        icon: "email",
        error: this.validator.message("email", form.email, "required|email"),
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        value: form.password,
        icon: "lock_outline",
        error: this.validator.message(
          "password",
          form.password,
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
      const { email, password } = this.state.form;
      this.props.login(email, password);
    } else {
      this.handleError();
    }
  }

  // loginStyle = () => {
  //   return {
  //     paddingLeft: "12rem",
  //     color: "Blue"
  //   }
  // }

  render() {
    const { classes } = this.props;
    let title = "Tech24 Admin Login";
    let forget = "Forget Password";
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
                <Link to="/auth/forgot-page">{forget}</Link>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapState(state) {
  const { loggedIn } = state.authentication;
  return { loggedIn };
}

const actionCreators = {
  login: userActions.login,
};

export default withStyles(styles)(
  connect(
    mapState,
    actionCreators
  )(LoginForm)
);

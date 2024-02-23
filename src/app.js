import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "./_helpers";
import {
  alertActions,
  loaderActions,
  confirmActions,
  fileActions,
  crudActions,
} from "./_actions";

import AuthLayout from "layouts/Auth.js";
import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";
import ConsultantLayout from "layouts/Consultant";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.js";
import AlertConfirmDialog from "components/Alert/AlertConfirmDialog.js";
import Loader from "components/Alert/Loader.js";

import Modal from "./components/Modal";

function App(props) {
  history.listen((location, action) => {
    if (props) {
      // props.clearAlerts();
      // props.clearFile();
      // props.hideLoader();
      // props.clearCrud('form');
    }
  });
  const user = props.user && props.user.user;

  console.log("User", user);
  return (
    <React.Fragment>
      {props.modal.open && <Modal open={props.modal.open} />}

      <Loader open={props.loader} />

      {props.alert.message && (
        <Snackbar
          place="tr"
          color={props.alert.type}
          icon={AddAlert}
          message={props.alert.message}
          open={true}
          closeNotification={() => props.clearAlerts()}
          close
        />
      )}
      {props.confirm.show && (
        <AlertConfirmDialog
          title={props.confirm.title}
          text={props.confirm.text}
          open={true}
          handleConfirm={() => props.setConfirm(props.confirm.data)}
          handleClose={() => props.clearConfirms()}
        />
      )}

      <Router history={history}>
        <Switch>
          <Route path="/rtl" component={RtlLayout} />
          <Route path="/auth" component={AuthLayout} />
          <Route path="/admin" component={AdminLayout} />
          <Route path="/consultant" component={ConsultantLayout} />

          <Redirect
            from="/"
            to={
              user && user.role === "Consultant"
                ? "/consultant/dashboard"
                : "/admin/dashboard"
            }
          />
          {/* <Redirect from="/" to="/admin/dashboard" /> */}
        </Switch>
      </Router>
    </React.Fragment>
  );
}

function mapState(state) {
  const { alert, loader, modal, confirm } = state;
  const { user } = state.authentication;
  return { alert, loader, modal, confirm, user };
}

const actionCreators = {
  clearCrud: crudActions._clear,
  clearAlerts: alertActions.clear,
  clearConfirms: confirmActions.clear,
  clearFile: fileActions._clear,
  setConfirm: confirmActions.confirm,
  hideLoader: loaderActions.hide,
};

export default connect(
  mapState,
  actionCreators
)(App);

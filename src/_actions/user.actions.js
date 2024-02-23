import { userConstants } from "../_constants";
import { userService } from "../_services";
import { alertActions } from "./alert.actions";
import { history } from "../_helpers";

export const userActions = {
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      (user) => {
        if (user.status == 200) {
          dispatch(success(user.message));
          window.location.replace("/");
          // history.push('/');
        }
      },
      (error) => {
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function forgotPassword(username) {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.forgotPassword(username).then(
      (user) => {
        if (user.status === 200) {
          dispatch(success(user.message));
          history.push("/login");
          dispatch(
            alertActions.success("Forgot password email sent successful.")
          );
        }
      },
      (error) => {
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request(user) {
    return { type: userConstants.FORGOT_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.FORGOT_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.FORGOT_FAILURE, error };
  }
}

function resetPassword(username, token) {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.resetPassword(username, token).then(
      (user) => {
        if (user.status === 200) {
          dispatch(success(user.message));
          history.push("/login");
          dispatch(
            alertActions.success("Password has been reset successfully.")
          );
        }
      },
      (error) => {
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request(user) {
    return { type: userConstants.CONFIRM_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.CONFIRM_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.CONFIRM_FAILURE, error };
  }
}

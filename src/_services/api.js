import axios from "axios";
import { authHeader, store } from "../_helpers";
import { configConstants } from "../_constants";
import { alertActions, userActions, loaderActions } from "../_actions";
import https from "https";

let apiUrl = process.env.REACT_APP_URL;

if (process.env.NODE_ENV === "production") {
  apiUrl = process.env.REACT_APP_URL;
}

let instance = axios.create({
  baseURL: apiUrl,
  headers: authHeader(),
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const { dispatch } = store;
const successHandler = (response) => {
  if (response.status === 200) {
    if (response.data && response.data.message) {
      dispatch(alertActions.success(response.data.message));
    }
  }
  dispatch(loaderActions.hide());
  return response;
};

const errorHandler = (error) => {
  const { response } = error;

  switch (response.status) {
    case 401:
      const user = JSON.parse(localStorage.getItem("user"));
      if (
        user &&
        user.access_token.token &&
        window.location.pathname !== "/auth/login-page"
      ) {
        setTimeout(() => {
          dispatch(userActions.logout());
          dispatch(
            alertActions.error("Session has expired, please login again.")
          );
        }, 1000);
      } else {
        dispatch(alertActions.warning(response.data.message));
      }
      break;
    case 422:
      if(response.data.message) {
        dispatch(alertActions.error(response.data.message));
      } else {
        if(response.data.length > 0) {
          dispatch(alertActions.error(response.data[0].message));
        }  
      }  
      break;
    case 423:
      dispatch(alertActions.warning(response.data.message));
      break;
    case 500:
      dispatch(alertActions.error(response.data.message));
      break;
    default:
      dispatch(alertActions.error(response.statusText));
      break;
  }

  dispatch(loaderActions.hide());
  return error;
};

instance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export const apiConfig = instance;

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


import routes from "authRoutes.js";

import styles from "assets/jss/material-dashboard-pro-react/layouts/authStyle.js";

import bgimg from "assets/img/bgimg.png";

const useStyles = makeStyles(styles);

export default function Pages(props) {
  // ref for the wrapper div
  const wrapper = React.createRef();
  // styles
  const classes = useStyles();
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBgImage = () => {
    // if (window.location.pathname.indexOf("/auth/register-page") !== -1) {
    //   return register;
    // } else if (window.location.pathname.indexOf("/auth/login-page") !== -1) {
    //   return login;
    // } else if (window.location.pathname.indexOf("/auth/pricing-page") !== -1) {
    //   return pricing;
    // } else if (
    //   window.location.pathname.indexOf("/auth/lock-screen-page") !== -1
    // ) {
    //   return lock;
    // } else if (window.location.pathname.indexOf("/auth/error-page") !== -1) {
    //   return error;
    // }

    return bgimg;
  };
  
  return (
    <div>      
      <div className={classes.wrapper} ref={wrapper}>
        <div
          className={classes.fullPage}
          style={{ backgroundImage: "url(" + getBgImage() + ")" }}
        >
          <Switch>
            {getRoutes(routes)}
            <Redirect from="/auth" to="/auth/login-page" />
          </Switch>
          {/* <Footer white /> */}
        </div>
      </div>
    </div>
  );
}

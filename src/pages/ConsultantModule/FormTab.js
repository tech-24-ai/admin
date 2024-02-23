import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "routes.js";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { crudService } from "../../_services";
import { PermissionHelper } from "_helpers";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const menuItems = [];

if (PermissionHelper.checkMainPermission(["view_work_experience"])) {
  menuItems.push(
    {
      path: "work-experience",
      label: "Work Experience",
      accessKey: "view_work_experience",
    },
    // {
    //   path: "technology",
    //   label: "Technology",
    //   accessKey: "view_technology",
    // },
    {
      path: "rate-card",
      label: "Rate Card",
      accessKey: "view_rate_card",
    },
    {
      path: "weekly_scheduling",
      label: "Weekly Scheduling",
      accessKey: "view_schedule",
    },
    {
      path: "daily_scheduling",
      label: "Daily Scheduling",
      accessKey: "can_access_vendor_locations",
    },
    {
      path: "upcoming-booking",
      label: "Upcoming Booking",
      accessKey: "view_booking",
    },
    {
      path: "past-booking",
      label: "Past Booking",
      accessKey: "can_access_vendor_locations",
    },
    {
      path: "complaints",
      label: "Complaints",
      accessKey: "view_complaints",
    },
    {
      path: "reviews",
      label: "Reviews",
      accessKey: "view_reviews",
    },
    {
      path: "consultant-payout",
      label: "Consultant Payout",
      accessKey: "view_consultant_payout",
    },
    {
      path: "chat-history",
      label: "Chat History",
      accessKey: "view_chat_history",
    },
    {
      path: "refund-request",
      label: "Refund Request",
      accessKey: "view_refund_request",
    },
    {
      path: "search-log",
      label: "Seach Log",
      accessKey: "view_work_experience",
    },
  );
}

console.log("menuItems", menuItems);

const getRoutes = (route) => {
  return route.map((prop, key) => {
    if (prop.collapse) {
      return getRoutes(prop.views);
    }
    if (prop.layout === "/admin/consultant-form/:id") {
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
const getRoute = () => {
  return window.location.pathname !== "/admin/full-screen-maps";
};
class ConsultantTabForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.current_index = 0;
    this.value = 0;
    this.id = this.props.match.params.id;
    this.menuItems = [
      {
        path: "basic-info",
        label: "Basic Info",
      },
    ];
    menuItems.forEach((x) => {
      if (this.id !== "new" && PermissionHelper.checkPermission(x.accessKey)) {
        this.menuItems.push(x);
      }
    });
  }
  changeView(path, index) {
    const { id } = this.props.match.params;
    this.current_index = index;
    this.props.history.push(`/admin/consultant-form/${id}/${path}`);
  }
  componentDidMount() {
    this.getDetails();
  }

  handleChange(newValue) {
    this.value = newValue;
  }
  getDetails() {
    const { id } = this.props.match.params;
    if (id && id !== "new") {
      crudService._get("consultants", id).then((response) => {
        if (response.status === 200) {
          this.setState({
            name: response.data.name,
          });
        }
      });
    }
  }
  render() {
    const styles = {
      appbar: {
        background: "transparent",
        border: "solid #322f2a 2px",
      },
      toolbar: {
        color: "#000000",
        margin: "5px",
      },
      button: {
        color: "#ffffff",
      },
    };
    return (
      <div>
        <AppBar position="static" style={styles.appbar}>
          <Tabs
            style={styles.toolbar}
            value={this.value}
            onChange={(event, newValue) => this.handleChange(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {menuItems &&
              this.menuItems.map((item, index) => {
                return (
                  <Tab
                    style={{
                      border:
                        this.current_index === index ? "solid #322f2a 1px" : "",
                    }}
                    color="inherit"
                    key={index}
                    label={item.label}
                    onClick={() => this.changeView(item.path, index)}
                  />
                );
              })}
          </Tabs>
        </AppBar>
        <GridContainer justify="left">
          <GridItem xs={8} sm={10}>
            {this.state && this.state.name && <h3>Name: {this.state.name}</h3>}
          </GridItem>
          <GridItem
            xs={4}
            sm={2}
            justify="center"
            style={{ marginTop: "20px" }}
          >
            <Button
              variant="contained"
              startIcon={<KeyboardBackspaceIcon />}
              onClick={() => this.props.history.goBack()}
            >
              Back
            </Button>
          </GridItem>
        </GridContainer>
        {getRoute() ? (
          <div>
            <div>
              <Switch>
                {getRoutes(routes)}
                <Redirect
                  from="/admin/consultant-form/:id"
                  to="/admin/consultant-form/:id/basic-info"
                />
              </Switch>
            </div>
          </div>
        ) : (
          <div>
            <Switch>
              {getRoutes(routes)}
              <Redirect
                from="/admin/consultant-form/:id"
                to="/admin/consultant-form/:id/basic-info"
              />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}
function mapState(state) {
  const { loggedIn } = state.authentication;
  return { loggedIn };
}

export default connect(mapState)(ConsultantTabForm);

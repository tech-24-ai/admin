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
const menuItems = [
  {
    path: "key-people",
    label: "Key People",
    accessKey: "can_access_vendor_key_people",
  },
  {
    path: "financials",
    label: "Financial",
    accessKey: "can_access_vendor_financials",
  },
  {
    path: "locations",
    label: "Locations",
    accessKey: "can_access_vendor_locations",
  },
  {
    path: "employee-job-count",
    label: "Employee Job Count",
    accessKey: "can_access_vendor_emo_job_count",
  },
  {
    path: "funding",
    label: "Funding",
    accessKey: "can_access_vendor_funding",
  },
  {
    path: "acquisition",
    label: "Acquisition",
    accessKey: "can_access_vendor_acquisition",
  },
  {
    path: "ips",
    label: "IP/Patent",
    accessKey: "can_access_vendor_ips",
  },
  {
    path: "patents",
    label: "Patent List",
    accessKey: "can_access_vendor_patent_list",
  },
  {
    path: "itmap-score",
    label: "ITMAP Score",
    accessKey: "can_access_vendor_itmap_score",
  },
  {
    path: "web-traffic",
    label: "Web Traffic",
    accessKey: "can_access_vendor_web_traffic",
  },
  {
    path: "google-trend",
    label: "Google Trends",
    accessKey: "can_access_vendor_google_trends",
  },
  {
    path: "twitter-data",
    label: "Twitter Data",
    accessKey: "can_access_vendor_twitter_data",
  },
  {
    path: "competitive-dynamic",
    label: "Competitive Dynamic",
    accessKey: "can_access_vendor_competitive_dynamic",
  },
  {
    path: "news-list",
    label: "News List",
    accessKey: "can_access_vendor_news_list",
  },
  {
    path: "document-list",
    label: "Documents",
    accessKey: "can_access_vendor_document_list",
  },
];
const getRoutes = (route) => {
  return route.map((prop, key) => {
    if (prop.collapse) {
      return getRoutes(prop.views);
    }
    if (prop.layout === "/admin/vendor-form/:id") {
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
class VendorTabForm extends React.PureComponent {
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
    this.props.history.push(`/admin/vendor-form/${id}/${path}`);
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
      crudService._get("vendors", id).then((response) => {
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
                  from="/admin/vendor-form/:id"
                  to="/admin/vendor-form/:id/basic-info"
                />
              </Switch>
            </div>
          </div>
        ) : (
          <div>
            <Switch>
              {getRoutes(routes)}
              <Redirect
                from="/admin/vendor-form/:id"
                to="/admin/vendor-form/:id/basic-info"
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

export default connect(mapState)(VendorTabForm);

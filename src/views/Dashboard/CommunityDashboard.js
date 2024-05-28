import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions } from "../../_actions";

// react plugin for creating charts
// react plugin for creating vector maps

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import { AnalyticsDashboard } from "react-analytics-charts";
// Over ten different commonly used charts are available
import { SessionsByDateChart, SessionsGeoChart } from "react-analytics-charts";

class Dashboard extends React.PureComponent {
    componentDidMount() {
        if (localStorage.getItem("user")) {
            this.props.getAllCrud("dashboard", "dashboard_data/consultant");
        }
    }
    // componentDidMount() {
    //     if (localStorage.getItem("user")) {
    //         this.props.getAllCrud("dashboard", "communityDashboard");
    //     }
    // }
    render() {
        const productsColumns = [
            {
                title: "Community Title",
                field: "consultant.first_name",
            },
            {
                title: "Total Views",
                field: "duration",
            },
            {
                title: "Total Questions",
                field: "duration",
            },
            {
                title: "Total Answers",
                field: "duration",
            },
        ];

        const modulesColumns = [
            {
                title: "Visitor Name",
                field: "category",
            },
            {
                title: "Total Points",
                field: "module"
            },
            {
                title: "Current Badge",
                field: "visitor"
            }
        ]

        const queryColumns = [
            {
                title: "Question Title",
                field: "category",
            },
            {
                title: "Discussion Group Name",
                field: "module"
            },
            {
                title: "Total Views",
                field: "visitor"
            },
            {
                title: "Total Answers",
                field: "visitor"
            },
            {
                title: "Total Upvotes",
                field: "visitor"
            }
        ]

        const { classes, dashboardData } = this.props;

        if (localStorage.getItem("user")) {
            return (
                <div>
                    <GridContainer>
                        {dashboardData &&
                            dashboardData.map((data) => {
                                return (
                                    <GridItem xs={12} sm={6} md={6} lg={3}>
                                        <Card>
                                            <CardHeader color={data.color} stats icon>
                                                <CardIcon color={data.color}>
                                                    <Icon>{data.icon}</Icon>
                                                </CardIcon>
                                                <p className={classes.cardCategory}>{data.name}</p>
                                                <h3 className={classes.cardTitle}>{data.value}</h3>
                                            </CardHeader>
                                            <CardFooter stats>
                                                <div className={classes.stats}></div>
                                            </CardFooter>
                                        </Card>
                                    </GridItem>
                                );
                            })}
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12}>
                            <Card>
                                <CardHeader color="primary" icon>
                                    <CardIcon color="primary">
                                        <Icon>all_inbox</Icon>
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}>Community Details</h4>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer justify="space-between">
                                        <GridItem xs={12} sm={12} md={12}>
                                            <MaterialDataTable
                                                title=""
                                                columns={productsColumns}
                                                url={`consultants/booking?bookingType=upcoming`}
                                                selection={false}
                                                exportButton={false}
                                                grouping={false}
                                                defaultExpanded={false}
                                                refresh={false}
                                                serverSide={false}
                                                search={false}
                                                sorting={false}
                                                filtering={false}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                        </GridItem>

                        <GridItem xs={12}>
                            <Card>
                                <CardHeader color="success" icon>
                                    <CardIcon color="success">
                                        <Icon>view_module</Icon>
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}>
                                        Top Visitors
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer justify="space-between">
                                        <GridItem xs={12} sm={12} md={12}>
                                            <MaterialDataTable
                                                title=''
                                                columns={modulesColumns}
                                                url='search_reports?orderBy=search_reports.created_at&orderDirection=asc&groupBy=search_reports.module_id,DATE(search_reports.created_at)'
                                                selection={false}
                                                exportButton={false}
                                                grouping={false}
                                                defaultExpanded={false}
                                                refresh={false}
                                                serverSide={false}
                                                search={false}
                                                sorting={false}
                                                filtering={false}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>

                    <GridContainer>
                        <GridItem xs={12}>
                            <Card>
                                <CardHeader color="success" icon>
                                    <CardIcon color="success">
                                        <Icon>view_module</Icon>
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}>
                                    Top Queries
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer justify="space-between">
                                        <GridItem xs={12} sm={12} md={12}>
                                            <MaterialDataTable
                                                title=''
                                                columns={queryColumns}
                                                url='search_reports?orderBy=search_reports.created_at&orderDirection=asc&groupBy=search_reports.module_id,DATE(search_reports.created_at)'
                                                selection={false}
                                                exportButton={false}
                                                grouping={false}
                                                defaultExpanded={false}
                                                refresh={false}
                                                serverSide={false}
                                                search={false}
                                                sorting={false}
                                                filtering={false}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            );
        } else {
            return "";
        }
    }
}

const mapStateToProps = (state) => {
    const { authentication, confirm, dashboard } = state;
    const { user } = authentication;
    return { user, confirm, dashboardData: dashboard };
};

const actionCreators = {
    getAllCrud: crudActions._getAll,
    deleteCrud: crudActions._delete,
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
        actionCreators
    )(Dashboard)
);

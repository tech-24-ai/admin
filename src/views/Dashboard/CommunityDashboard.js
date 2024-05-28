import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions, modalActions } from "../../_actions";

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
import Link from "@material-ui/core/Link";

class Dashboard extends React.PureComponent {

    componentDidMount() {
        if (localStorage.getItem("user")) {
            this.props.getAllCrud("dashboard", "communityDashboard");
        }
    }

    toggleModal(log) {
        this.props.openModal({
          open: true,
          component: log,
        });
    }
    
    render() {
        const productsColumns = [
            {
                title: "Community Title",
                field: "name",
            },
            {
                title: "Total Questions",
                field: "total_questions",
            },
            {
                title: "Total Answers",
                field: "__meta__.total_post_answers",
            },
            {
                title: "Total Views",
                field: "total_query_views",
            },
        ];

        const modulesColumns = [
            {
                title: "Visitor Name",
                field: "visitor.name",
            },
            {
                title: "Visitor Email",
                field: "visitor.email",
            },
            {
                title: "Total Points",
                field: "total_points"
            },
            {
                title: "Current Badge",
                field: "current_badge"
            }
        ]

        const queryColumns = [
            {
                title: "Title",
                field: "title",
                render: (item) =>
                    item.description && (
                        <div>
                            {item.title?.substring(0, 30)}{" "}
                            {item.title.length > 30 &&
                                <span>
                                    <Link
                                    onClick={() => this.toggleModal(item.title)}
                                    href="javascript:"
                                    >
                                    ... More
                                    </Link>
                                </span>
                            }
                        </div>
                ),
            },
            {
                title: "Discussion Group Name",
                field: "community.name"
            },
            {
                title: "Total Views",
                field: "views_counter"
            },
            {
                title: "Total Answers",
                field: "__meta__.total_answers"
            },
            {
                title: "Total Upvotes",
                field: "__meta__.total_helpful"
            }
        ]

        const { classes, dashboardData, communityListing } = this.props;

        if (localStorage.getItem("user")) {
            console.log("communityListing" , communityListing)
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
                                        <Icon>view_module</Icon>
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}>Top Community</h4>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer justify="space-between">
                                        <GridItem xs={12} sm={12} md={12}>
                                            <MaterialDataTable
                                                title=""
                                                columns={productsColumns}
                                                url={`communityDashboard/topCommunities`}
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
                                        <Icon>groups</Icon>
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
                                                url={'communityDashboard/topVisitors'}
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
                                        <Icon>quiz</Icon>
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
                                                url={'communityDashboard/topQueries'}
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
    openModal: modalActions.open,
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
        actionCreators
    )(Dashboard)
);

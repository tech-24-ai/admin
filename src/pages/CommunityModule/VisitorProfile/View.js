import React from "react";
import { connect } from 'react-redux';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
import { crudActions, confirmActions, loaderActions } from '../../../_actions';
import { crudService } from "_services";
import { Typography, Paper, Divider, TextField } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import moment from "moment";
import Badge from "components/Badge/Badge.js";
import avatar from "assets/img/default-avatar.png";
import badge_img from "assets/img/badge.png";
import reward from "assets/img/reward.png";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";

const title = 'Visitor Community Porfile'

const initialState = {
    form: {
        name: '-',
        email: '-',
        totalPoints: '0',
        badge: '-',
    },
    page: 0,
    rowsPerPage : 10,
    totalRecords : 0,
    pointHistoryDataArray : [],
}

class VisitorCommunityProfile extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    bindData = () => {
        const { id } = this.props.match.params
        if (id && id !== '') {
            this.props.showLoader();
            crudService._get('community/visitor_profile', id).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        form: response.data,
                    })
                }
            })
        }
    }

    getVisitoryPointHistoryData = () => {
        const { id } = this.props.match.params
        const { page, rowsPerPage } = this.state

        const tempQuery = {
            page: page,
            pageSize: rowsPerPage
        };
        crudService._getAll(`community/visitor_profile?visitor_id=${id}`, tempQuery).then((response) => {
            if (response.status === 200) {
                this.setState({
                    totalRecords: response.data.total,
                    pointHistoryDataArray: response.data.data
                })
                this.props.hideLoader();
            }
        })
    }

    componentDidMount() {
        this.bindData();
        this.getVisitoryPointHistoryData();
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage,
        }, () => this.getVisitoryPointHistoryData())
    };
    
    handleChangeRowsPerPage = (event) => {
        this.setState({
            page: 0,
            rowsPerPage: event.target.value
        }, () => this.getVisitoryPointHistoryData())
    };
    
    render() {
        // const classes = useStyles();
        const { id } = this.props.match.params
        const { form, page, rowsPerPage, totalRecords, pointHistoryDataArray } = this.state
        
        const replyDataItems = pointHistoryDataArray.map((item, i) => 
            <GridContainer style={{ marginBottom: 10 }} key={i}> 
                <GridItem xs={12}>
                    <Grid component="label" container spacing={1}> 
                        <Grid item xs={4}>
                            By {item.communityPostReply.visitor.name}
                        </Grid>      
                        <Grid item xs={1}>
                            <Badge color="gray" children={moment(item.created_at).format("DD-MM-YYYY")}  />
                        </Grid>   
                        <Grid item xs={4}>
                            {item.type == 1 && (
                                <Badge color="info" children={item.points+" Point - Upvote"}  />
                            )}

                            {item.type == 2 && (
                                <Badge color="rose" children={item.points+" Point - Answer"}  />
                            )}

                            {item.type == 3 && (
                                <Badge color="success" children={item.points+" Point - Correct Answer"}  />
                            )}
                        </Grid>      
                    </Grid>
                </GridItem>
                <GridItem xs={12} style={{ marginTop: 10 }}>
                    <Typography variant="body2">
                        {item.communityPostReply.description}
                    </Typography>
                </GridItem> 
                <GridItem xs={12} style={{ marginBottom: 10,  marginTop: 10 }}>  
                    <Divider />
                </GridItem>
            </GridContainer>
        )
                                    
        return (
            <GridContainer > 
                <GridItem xs={12} style={{marginBottom: 20}}>  
                    <Typography gutterBottom variant="h6">
                        {title}
                    </Typography>
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>  
                    <Card profile>
                        <CardAvatar profile>
                            <img src={avatar} alt="..." />
                        </CardAvatar>
                        <CardBody profile>
                            <h4 style={{textTransform: "uppercase"}}>{form.name}</h4>
                            <h6>{form.email}</h6>
                        </CardBody>
                    </Card>
                </GridItem>
                
                <GridItem xs={12} sm={12} md={4}>  
                    <Card profile>
                        <CardAvatar profile>
                            <img src={badge_img} alt="..." />
                        </CardAvatar>
                        <CardBody profile>
                            <h4>Current Badge: <br /> {form.badge}</h4>
                        </CardBody>
                    </Card>
                </GridItem>
                
                <GridItem xs={12} sm={12} md={4}>  
                    <Card profile>
                        <CardAvatar profile>
                            <img src={reward} alt="..." />
                        </CardAvatar>
                        <CardBody profile>
                            <h4>Total Points: <br /> {form.totalPoints}</h4>
                        </CardBody>
                    </Card>
                </GridItem>
                
                <GridItem xs={12}>
                   <Paper style={{ marginBottom: 20, padding: 20 }}>
                        <GridContainer > 
                            <GridItem xs={12}>
                                <Typography gutterBottom variant="h6">
                                    Point History
                                </Typography>
                            </GridItem>
                            <GridItem xs={12} style={{ marginBottom: 10 }}>  
                                <Divider />
                            </GridItem>
                        </GridContainer>   

                        {replyDataItems}

                        {pointHistoryDataArray.length > 0 && (
                            <TablePagination
                                component="div"
                                count={totalRecords}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onPageChange={this.handleChangePage}
                                onRowsPerPageChange={this.handleChangeRowsPerPage}
                            />   
                        )}
                        
                        { pointHistoryDataArray.length == 0 && (
                            <GridContainer > 
                                <GridItem xs={12}>
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: "center"}}>
                                        No Data Found!
                                    </Typography>
                                </GridItem>
                            </GridContainer>   
                        )}
                        
                    </Paper>
                </GridItem>
            </GridContainer>   
        );
    }
}

const mapStateToProps = (state) => {
    const { authentication, confirm } = state;
    const { user } = authentication;
    return { user, confirm };
}

const actionCreators = {
    deleteCrud: crudActions._delete,
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
    showLoader: loaderActions.show,
    hideLoader: loaderActions.hide,
}

export default connect(mapStateToProps, actionCreators)(VisitorCommunityProfile);
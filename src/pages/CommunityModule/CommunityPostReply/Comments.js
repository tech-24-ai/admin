import React from "react";
import { connect } from 'react-redux';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions, modalActions } from '../../../_actions';
import { TableAction } from '../../../material-table/TableAction';
import { PermissionHelper } from '_helpers';
import Link from "@material-ui/core/Link";
import { crudService } from "_services";
import { Typography, Paper, Divider, TextField } from '@material-ui/core';
import { Visibility, ThumbUp, Delete } from '@material-ui/icons';
import TablePagination from '@material-ui/core/TablePagination';
import moment from "moment";

const title = 'Comments'

const initialState = {
    form: {
        description: '',
        created_at: '',
        visitor: '',
        __meta__:'',
        communityPost: {}
    },
    page: 0,
    rowsPerPage : 10,
    totalRecords : 0,
    postrReplyDataArray : [],
}

class CommunityPostReplyList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = initialState
        this.deleteCrud = this.deleteCrud.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    componentDidUpdate() {
        if (this.props.confirm.confirm) {
            if (this.props.confirm.data.length) {
                this.props.confirm.data.map(value => this.deleteData(value.id))
            } else {
                if (this.props.confirm.data.id) {
                    this.deleteData(this.props.confirm.data.id);
                }
            }
            this.props.clearConfirm();
        }
    }

    deleteData = (id) => {
        crudService._delete('community/posts_reply', id).then((response) => {
            if (response.status === 200) {
                this.getPostReplyData()
            }
        })
    }

    deleteCrud(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete?`, data)
    }

    deleteAll(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.length} row ?`, data)
    }

    bindData = () => {
        const { id } = this.props.match.params
        if (id && id !== '') {
            crudService._get('community/posts_reply', id).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        form: response.data,
                    })
                }
            })
        }
    }

    componentDidMount() {
        this.bindData();
        this.getPostReplyData();
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage,
        })
        this.getPostReplyData()
    };
    
    handleChangeRowsPerPage = (event) => {
        this.setState({
            page: 0,
            rowsPerPage: event.target.value
        }, () => this.getPostReplyData())
    };
    
    getPostReplyData = () => {
        const { id } = this.props.match.params
        const { page, rowsPerPage } = this.state

        const tempQuery = {
            page: page,
            pageSize: rowsPerPage
        };
        crudService._getAll(`community/posts_reply_comments?parent_id=${id}`, tempQuery).then((response) => {
            if (response.status === 200) {
                this.setState({
                    totalRecords: response.data.total,
                    postrReplyDataArray: response.data.data
                })
            }
        })
    }

    render() {
        const { id } = this.props.match.params
        const { form, page, rowsPerPage, totalRecords, postrReplyDataArray } = this.state
        let url = `community/posts_reply?community_post_id=${id}`;
        
        const replyDataItems = postrReplyDataArray.map((item, i) => 
            <GridContainer style={{ marginBottom: 10 }} key={i} > 
                <GridItem xs={12}>
                    <Grid component="label" container spacing={1}> 
                        <Grid item xs={11}>
                            By {item.visitor.name} On  {moment(item.created_at).format("DD-MM-YYYY")}
                        </Grid>     
                        <Grid item xs={1} style={{textAlign: "right"}}> 
                            <span>
                                <Link
                                onClick={() => this.deleteCrud(item)}
                                href="javascript:"
                                >
                                    <Delete fontSize="small" />
                                </Link>
                            </span>   
                        </Grid> 
                    </Grid>
                </GridItem>
                <GridItem xs={12} style={{ marginTop: 10 }}>
                    <Typography variant="body2">
                        {item.description}
                    </Typography>
                </GridItem> 
                <GridItem xs={12} style={{ marginBottom: 10,  marginTop: 10 }}>  
                    <Divider />
                </GridItem>
            </GridContainer>
        )

        return (
            <GridContainer>
                <GridItem xs={12}>
                   <Paper style={{ marginBottom: 20, padding: 20 }}>
                        <GridContainer >
                            <GridItem xs={12}>
                                <Typography gutterBottom variant="h6">
                                    {form.communityPost.title}
                                </Typography>
                            </GridItem>   
                            <GridItem xs={12} style={{ marginBottom: 10 }}>    
                               <Divider />
                            </GridItem>   
                            <GridItem xs={12} style={{ marginBottom: 10 }}>
                                <Typography variant="body2" gutterBottom>
                                    {form.communityPost.description}
                                </Typography>
                            </GridItem>   
                            <GridItem xs={12}>
                                <Grid component="label" container spacing={1} alignItems="center">
                                    <Grid item xs={1} fontSize="small" style={{display: "flex"}}>
                                        <Visibility fontSize="small" style={{marginRight: 5}} /> 
                                        {form.communityPost.views_counter}
                                    </Grid>         
                                    <Grid item xs={1} style={{display: "flex"}}>
                                        <ThumbUp fontSize="small" style={{marginRight: 5}} />
                                        {form.__meta__.total_post_helpful}
                                    </Grid>  
                                    <Grid item xs={3}>
                                        Posted by {form.communityPost?.visitor?.name}
                                    </Grid>
                                </Grid>
                            </GridItem>
                        </GridContainer>
                        
                        <GridContainer >
                            <GridItem xs={12} style={{ marginTop: 10, marginBottom: 10 }}>  
                                <Divider />
                            </GridItem>
                            <GridItem xs={12}>
                                <Grid component="label" container spacing={1}> 
                                    <Grid item xs={4}>
                                        Answer By {form.visitor.name} On  {moment(form.created_at).format("DD-MM-YYYY")}
                                    </Grid>       
                                    <Grid item xs={4}>
                                        {form.__meta__.total_helpful} Helpful
                                    </Grid>   
                                    <Grid item xs={1} style={{textAlign: "right"}}>    
                                    </Grid> 
                                </Grid>
                            </GridItem>
                            <GridItem xs={12} style={{ marginTop: 10 }}>
                                <Typography variant="body2">
                                    {form.description}
                                </Typography>
                            </GridItem> 
                        </GridContainer>
                    </Paper>
                </GridItem>

                <GridItem xs={12}>
                   <Paper style={{ marginBottom: 20, padding: 20 }}>
                        <GridContainer > 
                            <GridItem xs={12}>
                                <Typography gutterBottom variant="h6">
                                    {title}
                                </Typography>
                            </GridItem>
                            <GridItem xs={12} style={{ marginBottom: 10 }}>  
                                <Divider />
                            </GridItem>
                        </GridContainer>   

                        {replyDataItems}
                            
                        {postrReplyDataArray.length > 0 && (
                            <TablePagination
                                component="div"
                                count={totalRecords}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onPageChange={this.handleChangePage}
                                onRowsPerPageChange={this.handleChangeRowsPerPage}
                            />   
                        )}
                        
                        { postrReplyDataArray.length == 0 && (
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
}

export default connect(mapStateToProps, actionCreators)(CommunityPostReplyList);
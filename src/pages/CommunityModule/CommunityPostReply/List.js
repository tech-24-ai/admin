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
import { COMMUNITY_POST_STATUS, COMMUNITY_POST_DISCUSSION_STATUS } from "_constants/form.constants";
import { Typography, Paper, Divider, TextField } from '@material-ui/core';
import { Visibility, ThumbUp, Edit, Delete, Check, AccessTime} from '@material-ui/icons';
import TablePagination from '@material-ui/core/TablePagination';
import moment from "moment";
import Badge from "components/Badge/Badge.js";

const title = 'Answers'

const initialState = {
    form: {
        title: '',
        description: '',
        visitor: '',
        views_counter: '',
        attachments: '',
        postTags: '',
        __meta__:'',
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
        this.editCrud = this.editCrud.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.communityPostReplyDetails = this.communityPostReplyDetails.bind(this);
        this.markCorrectAnswer = this.markCorrectAnswer.bind(this);
        this.handleDocumentDownload = this.handleDocumentDownload.bind(this);
    }

    componentDidUpdate() {
        if (this.props.confirm.confirm) {
            if (this.props.confirm.data.length) {
                this.props.confirm.data.map(value => this.deleteData(value.id))
            } else {
                console.log('confirm data = ', this.props.confirm.data)
                if (this.props.confirm.data.id && this.props.confirm.data.type == 'update_correct_ans') {
                    this.updateCorrectAnswerStatus(this.props.confirm.data.id);
                }
                else if (this.props.confirm.data.id) {
                    this.deleteData(this.props.confirm.data.id);
                }
            }
            this.props.clearConfirm();
        }
    }

    toggleModal(log) {
        this.props.openModal({
          open: true,
          component: log,
        });
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

    editCrud(data) {
        this.props.history.push(`/admin/community-posts-reply-form/${data.id}`)
    }

    communityPostReplyDetails(data) {
        this.props.history.push(`/admin/community-posts-reply-view/${data.id}`)
    }

    bindData = () => {
        const { id } = this.props.match.params
        if (id && id !== '') {
            crudService._get('community/posts', id).then((response) => {
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
        crudService._getAll(`community/posts_reply?community_post_id=${id}`, tempQuery).then((response) => {
            if (response.status === 200) {
                this.setState({
                    totalRecords: response.data.total,
                    postrReplyDataArray: response.data.data
                })
            }
        })
    }

    markCorrectAnswer = (id) => {
        
        let data = {
            id: id,
            type: 'update_correct_ans'
        }

        this.props.showConfirm('Confirm', `Are you sure you want to Mark as Correct Answer?`, data)

        // crudService._create('community/reply_mark_correct_answer', data).then((response) => {
        //     if (response.status === 200) {
        //         this.getPostReplyData()
        //     }
        // })
    }

    updateCorrectAnswerStatus = (id) => {
        let data = {
            id: id
        }
        crudService._create('community/reply_mark_correct_answer', data).then((response) => {
            if (response.status === 200) {
                this.getPostReplyData()
            }
        })
    }

    handleDocumentDownload = (item) => {
        const { id, name } = item;
       
        this.props.downloadDocument(
          id,
          name,
          `community/communitypost/download_attachment?attachment_id=${id}`
        );
    };

    render() {
        const { id } = this.props.match.params
        const { form, page, rowsPerPage, totalRecords, postrReplyDataArray } = this.state
        let url = `community/posts_reply?community_post_id=${id}`;
        
        // const columns = [            
        //     {
        //         title: "Description",
        //         field: "description",
        //         render: (item) =>
        //         item.description && (
        //             <div>
        //                 {item.description?.substring(0, 30)}{" "}
        //                 {item.description.length > 30 &&
        //                     <span>
        //                         <Link
        //                         onClick={() => this.toggleModal(item.description)}
        //                         href="javascript:"
        //                         >
        //                         ... More
        //                         </Link>
        //                     </span>
        //                 }
        //             </div>
        //         ),
        //     },
        //     {
        //         title: "Community",
        //         field: "communityPost.community.name",
        //         sorting: false
        //     },
        //     {
        //         title: "Visitor Name",
        //         field: "visitor.name",
        //         sorting: false
        //     },
        //     {
        //         title: "Total Helpful",
        //         field: "__meta__.total_helpful",
        //         sorting: false
        //     },
        //     {
        //         title: "Status",
        //         field: "status",
        //         lookupConstant: COMMUNITY_POST_STATUS,
        //     },
        //     {
        //         title: "Correct Answer",
        //         field: "is_correct_answer",
        //         lookupConstant: COMMUNITY_POST_DISCUSSION_STATUS,
        //     },
        //     {
        //         title: "Date",
        //         field: "updated_at"
        //     },
        //     TableAction(PermissionHelper.checkPermission('delete_community_query_answer') ? this.deleteCrud : null, PermissionHelper.checkPermission('edit_community_query_answer') ? this.editCrud : null, null, null, this.communityPostReplyDetails)
        // ]

        const replyDataItems = postrReplyDataArray.map((item, i) => 
            <GridContainer style={{ marginBottom: 10 }} key={i} > 
                <GridItem xs={12}>
                    <Grid component="label" container spacing={1}> 
                        <Grid item xs={4}>
                            By {item.visitor.name} On  {moment(item.created_at).format("DD-MM-YYYY")}
                        </Grid>       
                        <Grid item xs={3}>
                            {item.__meta__.total_helpful} Helpful
                            <span style={{margin: 10}}></span>
                            {item.__meta__.total_comments} Comments
                        </Grid>    
                        <Grid item xs={2} style={{textAlign: "right"}}>
                            <CorrectAnswer is_correct={item.is_correct_answer} />
                        </Grid>    
                        <Grid item xs={1} style={{textAlign: "right"}}>    
                            <ReplyStatus status_name={item.status} />
                        </Grid>    
                        <Grid item xs={2} style={{textAlign: "right"}}>    
                            { item.status == 1 && item.is_correct_answer == 0 ? (
                                <span>
                                    <Link
                                    title="Mark as Correct Answer"
                                    onClick={() => this.markCorrectAnswer(item.id) }
                                    href="javascript:"
                                    style={{paddingRight: 5}}
                                    >
                                        <Check fontSize="small" />
                                    </Link>
                                </span>
                            ) : (
                                ""
                            )}

                            { PermissionHelper.checkPermission('view_community_answer_comments') && (
                                <span>
                                    <Link
                                    title="View Comments"
                                    href={`/admin/community-posts-reply-comments/${item.id}`}
                                    style={{paddingRight: 5}}
                                    >
                                        <Visibility fontSize="small" />
                                    </Link>
                                </span>
                            )}

                            { PermissionHelper.checkPermission('edit_community_query_answer') && item.is_correct_answer == 0 ? (
                                <span>
                                    <Link
                                    onClick={() => 
                                        this.props.history.push( `/admin/community-posts-reply-form/${item.id}`)
                                    }
                                    style={{paddingRight: 5}}
                                    >
                                        <Edit fontSize="small" />
                                    </Link>
                                </span>   
                            ) : (
                                ""
                            )}

                            { PermissionHelper.checkPermission('delete_community_query_answer') && (        
                                <span>
                                    <Link
                                    onClick={() => this.deleteCrud(item)}
                                    href="javascript:"
                                    >
                                        <Delete fontSize="small" />
                                    </Link>
                                </span>   
                            )}    
                        </Grid> 
                    </Grid>
                </GridItem>
                <GridItem xs={12} style={{ marginTop: 10 }}>
                    <Typography variant="body2">
                        <div dangerouslySetInnerHTML={{ __html: item.description }} />
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
                                    {form.title}
                                </Typography>
                            </GridItem>   
                            <GridItem xs={12} style={{ marginBottom: 10 }}>    
                               <Divider />
                            </GridItem>   
                            <GridItem xs={12} style={{ marginBottom: 10 }}>
                                <Typography variant="body2" gutterBottom>
                                    <div dangerouslySetInnerHTML={{ __html: form.description }} />
                                </Typography>
                            </GridItem>   
                            { form.attachments && (
                                <GridItem xs={12} style={{ marginBottom: 10 }}>
                                    <div style={{ display: "flex" }}>
                                        {form.attachments.map((item) => (
                                            <div
                                            style={{ marginRight: 10, marginBottom: 10, color: "blue", textDecoration: "underline"  }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                this.handleDocumentDownload(item);
                                            }}
                                            >
                                            {item?.name || "Attachment"}
                                            </div>
                                        ))}
                                    </div>    
                                </GridItem>   
                            )}    
                            { form.postTags && (
                                <GridItem xs={12} style={{ marginBottom: 10 }}>
                                    <div style={{ display: "flex" }}>
                                        {form.postTags.map((item) => (
                                            <div
                                            style={{ backgroundColor: '#d9dfe9', marginRight: 10, marginBottom: 10, padding: "6px 12px", borderRadius: "4px"  }}
                                            >
                                            {item?.name}
                                            </div>
                                        ))}
                                    </div>    
                                </GridItem>   
                            )}    
                            <GridItem xs={12}>
                                <Grid component="label" container spacing={1} alignItems="center">
                                    <Grid item xs={1} fontSize="small" style={{display: "flex"}}>
                                        <Visibility fontSize="small" style={{marginRight: 5}} /> 
                                        {form.views_counter}
                                    </Grid>         
                                    <Grid item xs={1} style={{display: "flex"}}>
                                        <ThumbUp fontSize="small" style={{marginRight: 5}} />
                                        {form.__meta__.total_helpful}
                                    </Grid>  
                                    <Grid item xs={3}>
                                        Posted by {form.visitor.name}
                                    </Grid>
                                    <Grid item xs={2} style={{display: "flex"}}>
                                        <AccessTime fontSize="small" style={{marginRight: 5}} />
                                        {form.created_at}
                                    </Grid>
                                </Grid>
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

                {/* <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        addData={false}
                        deleteAll={PermissionHelper.checkPermission('delete_community_query_answer') ? this.deleteAll : false}
                        url={url}
                        selection={true}
                        refresh={true}
                        serverSide={true}
                        search={true}
                        sorting={true}
                        filtering={true}
                    />
                </GridItem> */}
            </GridContainer>
        );
    }
}

function ReplyStatus({status_name}) {

    let status = COMMUNITY_POST_STATUS.find((item) => {
        return item.id == status_name;
    });

    let statusName = status.name;
    let color = "warning";
    if(statusName == 'Approved') {
        color = "success";
    } else if (statusName == 'Pending') {
        color = "warning";
    } else if (statusName == 'Rejected') {
        color = "danger";
    }

    return <Badge color={color} children={statusName}  />;
}

function CorrectAnswer({is_correct}) {

    if(is_correct == 1) {
        return <Badge color="success" children="Correct Answer"  />;
    } else {
        return null;
    }   
}

const mapStateToProps = (state) => {
    const { authentication, confirm } = state;
    const { user } = authentication;
    return { user, confirm };
}

const actionCreators = {
    deleteCrud: crudActions._delete,
    downloadDocument: crudActions._downloadPostAttachment,
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
    openModal: modalActions.open,
}

export default connect(mapStateToProps, actionCreators)(CommunityPostReplyList);
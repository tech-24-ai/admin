import React from "react";
import { connect } from 'react-redux';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions, modalActions } from '../../../_actions';
import { TableAction } from '../../../material-table/TableAction';
import { PermissionHelper } from '_helpers';
import Link from "@material-ui/core/Link";
import { fileService } from "_services";
import { COMMUNITY_POST_STATUS, COMMUNITY_POST_DISCUSSION_STATUS } from "_constants/form.constants";

const title = 'Community Post Reply'
class CommunityPostReplyList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.deleteCrud = this.deleteCrud.bind(this);
        this.editCrud = this.editCrud.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.communityPostReplyDetails = this.communityPostReplyDetails.bind(this);
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

    toggleModal(log) {
        this.props.openModal({
          open: true,
          component: log,
        });
    }

    deleteData = (id) => {
        this.props.deleteCrud('form', 'community/posts_reply', id);
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

    render() {
        const { id } = this.props.match.params
        console.log("id", id);
        let url = `community/posts_reply?community_post_id=${id}`;
        
        const columns = [            
            {
                title: "Description",
                field: "description",
                render: (item) =>
                item.description && (
                    <div>
                        {item.description?.substring(0, 30)}{" "}
                        {item.description.length > 30 &&
                            <span>
                                <Link
                                onClick={() => this.toggleModal(item.description)}
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
                title: "Community",
                field: "communityPost.community.name"
            },
            {
                title: "Visitor Name",
                field: "visitor.name"
            },
            {
                title: "Total Helpful",
                field: "__meta__.total_helpful"
            },
            {
                title: "Status",
                field: "status",
                lookupConstant: COMMUNITY_POST_STATUS,
            },
            {
                title: "Correct Answer",
                field: "is_correct_answer",
                lookupConstant: COMMUNITY_POST_DISCUSSION_STATUS,
            },
            {
                title: "Date",
                field: "updated_at"
            },
            TableAction(PermissionHelper.checkPermission('delete_community_post_reply') ? this.deleteCrud : null, PermissionHelper.checkPermission('edit_community_post_reply') ? this.editCrud : null, null, null, this.communityPostReplyDetails)
        ]

        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        addData={false}
                        deleteAll={PermissionHelper.checkPermission('delete_community_post_reply') ? this.deleteAll : false}
                        url={url}
                        selection={true}
                        refresh={true}
                        serverSide={true}
                        search={true}
                        sorting={true}
                        filtering={true}
                    />
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
    openModal: modalActions.open,
}

export default connect(mapStateToProps, actionCreators)(CommunityPostReplyList);
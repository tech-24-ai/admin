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

const title = 'Community Queries'
class CommunityPostList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.deleteCrud = this.deleteCrud.bind(this);
        this.editCrud = this.editCrud.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.viewCommunityPostReply = this.viewCommunityPostReply.bind(this);
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
        this.props.deleteCrud('form', 'community/posts', id);
    }

    deleteCrud(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete?`, data)
    }

    deleteAll(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.length} row ?`, data)
    }

    editCrud(data) {
        this.props.history.push(`/admin/community-posts-form/${data.id}`)
    }

    viewCommunityPostReply(data) {
        this.props.history.push(`/admin/community-posts-reply/${data.id}`)
    }

    render() {
        const { id } = this.props.match.params
        let url = 'community/posts';    
        if(id) {
            url = `community/posts?community_id=${id}`;
        }
         const columns = [            
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
                title: "Community",
                field: "community.name",
                sorting: false
            },
            {
                title: "Visitor Name",
                field: "visitor.name",
                sorting: false
            },
            {
                title: "Total Answers",
                field: "__meta__.total_reply",
                sorting: false
            },
            {
                title: "Total Helpful",
                field: "__meta__.total_helpful",
                sorting: false
            },
            {
                title: "Total Views",
                field: "views_counter"
            },
            {
                title: "Status",
                field: "status",
                lookupConstant: COMMUNITY_POST_STATUS,
            },
            {
                title: "Discussion Open",
                field: "is_discussion_open",
                lookupConstant: COMMUNITY_POST_DISCUSSION_STATUS,
            },
            {
                title: "Date",
                field: "updated_at"
            },
            TableAction(PermissionHelper.checkPermission('delete_community_post') ? this.deleteCrud : null, PermissionHelper.checkPermission('edit_community_post') ? this.editCrud : null, null, null, PermissionHelper.checkPermission('view_community_post_reply') ? this.viewCommunityPostReply : null)
        ]

        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        addData={false}
                        deleteAll={PermissionHelper.checkPermission('delete_community_post') ? this.deleteAll : false}
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

export default connect(mapStateToProps, actionCreators)(CommunityPostList);
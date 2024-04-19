import React from "react";
import { connect } from 'react-redux';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions } from '../../../_actions';
import { TableAction } from '../../../material-table/TableAction';
import { PermissionHelper } from '_helpers';
import { fileService } from "_services";
import IconButton from "@material-ui/core/IconButton";
import GroupIcon from '@material-ui/icons/Group';

const title = 'Community'
class CommunityList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.addCrud = this.addCrud.bind(this);
        this.editCrud = this.editCrud.bind(this);
        this.viewCommunityPost = this.viewCommunityPost.bind(this);
        this.viewCommunityMembers = this.viewCommunityMembers.bind(this);
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

    editCrud(data) {
        this.props.history.push(`/admin/communities-form/${data.id}`)
    }

    addCrud() {
        this.props.history.push(`/admin/communities-form/new`)
    }

    viewCommunityPost(data) {
        this.props.history.push(`/admin/community-posts-lists/${data.id}`)
    }

    viewCommunityMembers(data) {
        this.props.history.push(`/admin/community-members/${data.id}`)
    }

    render() {
        const columns = [            
            {
                title: "Name",
                field: "name",
            },
            {
                title: "Total Queries",
                field: "__meta__.total_posts",
                sorting: false
            },
            {
                title: "Total Answers",
                field: "__meta__.total_post_reply",
                sorting: false
            },
            {
                title: "Total Members",
                field: "__meta__.total_members",
                sorting: false
            },
            {
                title: "Date",
                field: "updated_at"
            },
            TableAction(null, 
                PermissionHelper.checkPermission('edit_community') ? this.editCrud : null, 
                null, 
                null, 
                PermissionHelper.checkPermission('view_community_query') ? this.viewCommunityPost : null,
                ({ rowData }) => {
                    return (
                      <>
                         {PermissionHelper.checkPermission('view_community_members') ? (
                            <IconButton
                                aria-label="edit"
                                onClick={(event) => { this.viewCommunityMembers(rowData) }}
                            >
                                <GroupIcon fontSize="small" />
                            </IconButton>
                        ) : (
                         <></>
                        )}   
                      </>
                    );
                }
            )
        ]

        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        addData={PermissionHelper.checkPermission('add_community') ? this.addCrud : false}
                        deleteAll={false}
                        url='community'
                        selection={false}
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
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
}

export default connect(mapStateToProps, actionCreators)(CommunityList);
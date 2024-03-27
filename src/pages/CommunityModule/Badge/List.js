import React from "react";
import { connect } from 'react-redux';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions } from '../../../_actions';
import { TableAction } from '../../../material-table/TableAction';
import { PermissionHelper } from '_helpers';

const title = 'Badge'
class BadgeList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.deleteCrud = this.deleteCrud.bind(this);
        this.addCrud = this.addCrud.bind(this);
        this.editCrud = this.editCrud.bind(this);
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
        this.props.deleteCrud('form', 'community/badge', id);
    }

    deleteCrud(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.title} ?`, data)
    }

    deleteAll(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.length} row ?`, data)
    }

    editCrud(data) {
        this.props.history.push(`/admin/badge-form/${data.id}`)
    }

    addCrud() {
        this.props.history.push(`/admin/badge-form/new`)
    }

    render() {
        const columns = [            
            {
                title: "Title",
                field: "title"
            },           
            {
                title: "Min. Range",
                field: "min_range"
            },           
            {
                title: "Max. Range",
                field: "max_range"
            },
            {
                title: "Date",
                field: "updated_at"
            },
            TableAction(PermissionHelper.checkPermission('delete_badge') ? this.deleteCrud : null, PermissionHelper.checkPermission('edit_badge') ? this.editCrud : null)
        ]

        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        addData={PermissionHelper.checkPermission('add_badge') ? this.addCrud : false}
                        deleteAll={PermissionHelper.checkPermission('delete_badge') ? this.deleteAll : false}
                        url='community/badge'
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
}

export default connect(mapStateToProps, actionCreators)(BadgeList);
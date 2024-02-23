import React from "react";
import { connect } from 'react-redux';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions, modalActions, loaderActions } from '../../../_actions';
import { TableAction } from '../../../material-table/TableAction'
import PasswordForm from '../../PasswordForm';
import { PermissionHelper } from '_helpers';

const title = 'RSS'
class RSSList extends React.PureComponent {
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
                const ids = this.props.confirm.data.map(value => value.id)
                this.props.deleteAllCrud('form', 'rss/delete_all', { ids: JSON.stringify(ids) });
            } else {
                if (this.props.confirm.data.id) {
                    this.deleteData(this.props.confirm.data.id);
                }
            }
            this.props.clearConfirm();
        }
    }

    deleteData = (id) => {
        this.props.deleteCrud('form', 'rss', id);
    }

    deleteCrud(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.name} ?`, data)
    }

    deleteAll(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.length} row ?`, data)
    }

    editCrud(data) {
        this.props.history.push(`/admin/rss-form/${data.id}`)
    }

    changePassword = (data) => {
        this.props.openModal({
            open: true,
            title: 'Update Vendor Password',
            component: <PasswordForm id={data.id} actionFor="vendor" />
        })
    }

    addCrud() {
        this.props.history.push(`/admin/rss-form/new`)
    }

    render() {
        const columns = [
            {
                title: "Name",
                field: "name"
            },
            {
                title: "Description",
                field: "description"
            },
            {
                title: "Added Date",
                field: "updated_at"
            },
            TableAction(PermissionHelper.checkPermission('delete_rss') ? this.deleteCrud : null, PermissionHelper.checkPermission('edit_rss') ? this.editCrud : null)
        ]



        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        addData={PermissionHelper.checkPermission('add_rss') ? this.addCrud : false}
                        deleteAll={PermissionHelper.checkPermission('delete_rss') ? this.deleteAll : false}
                        url='rss'
                        selection={true}
                        grouping={false}
                        defaultExpanded={true}
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
    getRole: crudActions._get,
    deleteCrud: crudActions._delete,
    deleteAllCrud: crudActions._deleteAll,
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
    openModal: modalActions.open,
    showLoader: loaderActions.show,
    hideLoader: loaderActions.hide,
}

export default connect(mapStateToProps, actionCreators)(RSSList);
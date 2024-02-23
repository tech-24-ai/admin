import React from "react";
import { connect } from 'react-redux';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions, modalActions, loaderActions } from '../../../_actions';
import { fileService } from '../../../_services/file.service';
import { TableAction } from '../../../material-table/TableAction'
import PasswordForm from '../../PasswordForm';
import { PermissionHelper } from '_helpers';
import { INVESTOR_STATUS } from "_constants/form.constants";

const title = 'Investor Segments'
export class InvestorList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.deleteCrud = this.deleteCrud.bind(this);
        this.addCrud = this.addCrud.bind(this);
        this.editCrud = this.editCrud.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.export = this.export.bind(this);
    }

    componentDidUpdate() {
        if (this.props.confirm.confirm) {
            if (this.props.confirm.data.length) {
                const ids = this.props.confirm.data.map(value => value.id)
                this.props.deleteAllCrud('form', 'investor/delete_all', { ids: JSON.stringify(ids) });
            } else {
                if (this.props.confirm.data.id) {
                    this.deleteData(this.props.confirm.data.id);
                }
            }
            this.props.clearConfirm();
        }
    }

    deleteData = (id) => {
        this.props.deleteCrud('form', 'investors', id);
    }

    deleteCrud(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.name} ?`, data)
    }

    deleteAll(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.length} row ?`, data)
    }

    editCrud(data) {
        this.props.history.push(`/admin/investor-form/${data.id}`)
    }

    changePassword = (data) => {
        this.props.openModal({
            open: true,
            title: 'Update Investor Password',
            component: <PasswordForm id={data.id} actionFor="investors" />
        })
    }

    addCrud() {
        this.props.history.push(`/admin/investor-form/new`)
    }

    export() {
        fileService._download('reports/investorreport')
      }


    render() {
        const columns = [
            {
                title: "Name",
                field: "name"
            },
            {
                title: "Email",
                field: "email"
            },
            {
                title: "Mobile",
                field: "mobile"
            },
            {
                title: "Type",
                field: "investor_type"
            },
            {
                title: "Status",
                field: "status",
                lookupConstant: INVESTOR_STATUS
            },
            {
                title: "Added Date",
                field: "updated_at"
            },
            TableAction(PermissionHelper.checkPermission('delete_mi_investor') ? this.deleteCrud : null, PermissionHelper.checkPermission('edit_mi_investor') ? this.editCrud : null,PermissionHelper.checkPermission('update_mi_investor_password') ? this.changePassword : null)
        ]



        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        addData={PermissionHelper.checkPermission('add_mi_investor') ? this.addCrud : false}
                        deleteAll={PermissionHelper.checkPermission('delete_mi_investor') ? this.deleteAll : false}
                        url='investors'
                        selection={true}
                        grouping={false}
                        defaultExpanded={true}
                        refresh={true}
                        serverSide={true}
                        search={true}
                        sorting={true}
                        export={PermissionHelper.checkPermission('export_mi_investor') ? this.export : false}
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

export default connect(mapStateToProps, actionCreators)(InvestorList);
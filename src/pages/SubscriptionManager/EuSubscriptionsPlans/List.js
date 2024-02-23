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


const title = 'End User Subscription Plans'
class EuSubscriptionPlanList extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            exportImportValue: "",
            switchButton: false,
            selectElement: false,
            isExport: false,
            isImport: false,
          }

        this.deleteCrud = false;
        this.addCrud = this.addCrud.bind(this);
        this.editCrud = this.editCrud.bind(this);
    }

    componentDidUpdate() {
        if (this.props.confirm.confirm) {
            if (this.props.confirm.data.length) {
                const ids = this.props.confirm.data.map(value => value.id)
                this.props.deleteAllCrud('form', 'pricingInsight/pricing_configuration/delete_all', { ids: JSON.stringify(ids) });
            } else {
                
            }
            this.props.clearConfirm();
        }
    }

    editCrud(data) {
        this.props.history.push(`/admin/eusubscription-plan-form/${data.id}`)
    }

    changePassword = (data) => {
        this.props.openModal({
            open: true,
            title: 'Update Vendor Password',
            component: <PasswordForm id={data.id} actionFor="vendor" />
        })
    }

    addCrud() {
        this.props.history.push(`/admin/eusubscription-plan-form/new`)
    }

    render() {
        const columns = [
            {
                title: "Plan Name",
                field: "plan_name"
            },
            
            {
                title: "Plan Duration",
                field: "plan_duration"
            },
            {
                title: "Plan Price (USD)",
                field: "plan_price"
            },
            {
                title: "Special Price (USD)",
                field: "current_price_or_special_price"
            },

            TableAction(PermissionHelper.checkPermission('delete_eusubscription_plan') ? this.deleteCrud : null, PermissionHelper.checkPermission('edit_eusubscription_plan') ? this.editCrud : null)
        ]

        const { isExport, isImport, exportImportValue } = this.state

        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        addData={PermissionHelper.checkPermission('add_eusubscription_plan') ? this.addCrud : false}
                        deleteAll={PermissionHelper.checkPermission('delete_eusubscription_plan') ? this.deleteAll : false}
                        url='eusubscription/eu_plans'
                        selection={true}
                        grouping={false}
                        defaultExpanded={true}
                        refresh={true}
                        serverSide={true}
                        search={true}
                        sorting={true}
                        export={PermissionHelper.checkPermission('export_eusubscription_plan') ? this.export : false}
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

export default connect(mapStateToProps, actionCreators)(EuSubscriptionPlanList);
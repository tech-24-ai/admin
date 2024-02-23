import React from "react";
import { connect } from 'react-redux';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions, modalActions, loaderActions } from '../../../_actions';
import { TableAction } from '../../../material-table/TableAction'
import { STATIC_PLAN_DURATION, PLAN_TYPE } from "_constants/form.constants";
import PasswordForm from '../../PasswordForm';
import { PermissionHelper } from '_helpers';
import { fileService } from "_services";

const title = 'Subscription Plans'
export class PricingConfigurationList extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            exportImportValue: "",
            switchButton: false,
            selectElement: false,
            isExport: false,
            isImport: false,
          }

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
                this.props.deleteAllCrud('form', 'pricingInsight/pricing_configuration/delete_all', { ids: JSON.stringify(ids) });
            } else {
                if (this.props.confirm.data.id) {
                    this.deleteData(this.props.confirm.data.id);
                }
            }
            this.props.clearConfirm();
        }
    }

    deleteData = (id) => {
        this.props.deleteCrud('form', 'subscription/market_plans', id);
    }

    deleteCrud(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.name} ?`, data)
    }

    deleteAll(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.length} row ?`, data)
    }

    editCrud(data) {
        this.props.history.push(`/admin/subscription-plan-form/${data.id}`)
    }

    changePassword = (data) => {
        this.props.openModal({
            open: true,
            title: 'Update Vendor Password',
            component: <PasswordForm id={data.id} actionFor="vendor" />
        })
    }

    addCrud() {
        this.props.history.push(`/admin/subscription-plan-form/new`)
    }

    export() {
        fileService._download('reports/mimarketplanreport')
      }

    render() {
        const columns = [
            {
                title: "Plan Name",
                field: "plan_name",
                url: "subscription/market_plans",
                filterName: "plan_name",
            },
            {
                title: "Plan Type",
                field: "plan_type",
                lookupConstant: PLAN_TYPE,
            },
            {
                title: "Plan Duration",
                field: "plan_duration",
                lookupConstant: STATIC_PLAN_DURATION,
            },
            {
                title: "Special Price (USD)",
                field: "current_price_or_special_price"
            },
            {
                title: "Max Markets Allowed",
                field: "max_market"
            },
            {
                title: "Max Countries Allowed",
                field: "max_country"
            },
            {
                title: "Max Regions Allowed",
                field: "max_region"
            },

            TableAction(PermissionHelper.checkPermission('delete_subscription_plan') ? this.deleteCrud : null, PermissionHelper.checkPermission('edit_subscription_plan') ? this.editCrud : null)
        ]

        const { isExport, isImport, exportImportValue } = this.state

        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        addData={PermissionHelper.checkPermission('add_subscription_plan') ? this.addCrud : false}
                        deleteAll={PermissionHelper.checkPermission('delete_subscription_plan') ? this.deleteAll : false}
                        url='subscription/market_plans'
                        selection={true}
                        grouping={false}
                        defaultExpanded={true}
                        refresh={true}
                        serverSide={true}
                        search={true}
                        sorting={true}
                        export={PermissionHelper.checkPermission('export_subscription_plan') ? this.export : false}
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

export default connect(mapStateToProps, actionCreators)(PricingConfigurationList);
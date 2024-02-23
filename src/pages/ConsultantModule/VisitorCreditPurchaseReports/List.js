import React from "react";
import { connect } from "react-redux";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import {
    crudActions,
    confirmActions,
    modalActions,
    loaderActions,
} from "../../../_actions";
import { fileService } from "../../../_services/file.service";
import { TableAction } from "../../../material-table/TableAction";
import PasswordForm from "../../PasswordForm";
import { PermissionHelper } from "_helpers";

const title = "Visitor Credit Purchase Report";
class VisitorCreditPurchaseReportsList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.deleteCrud = this.deleteCrud.bind(this);
        this.addCrud = this.addCrud.bind(this);
        this.editCrud = this.editCrud.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    componentDidUpdate() {
        if (this.props.confirm.confirm) {
            if (this.props.confirm.data.length) {
                const ids = this.props.confirm.data.map((value) => value.id);
                this.props.deleteAllCrud("form", "booking-transaction/delete_all", {
                    ids: JSON.stringify(ids),
                });
            } else {
                if (this.props.confirm.data.id) {
                    this.deleteData(this.props.confirm.data.id);
                }
            }
            this.props.clearConfirm();
        }
    }
    getBasePath() {
        const { id } = this.props.match.params;
        return `/admin/consultant-form/${id}`;
    }

    deleteData = (id) => {
        this.props.deleteCrud("form", "booking-transaction", id);
    };

    deleteCrud(data) {
        this.props.showConfirm(
            "Confirm",
            `Are you sure want to delete ${data.name} ?`,
            data
        );
    }

    deleteAll(data) {
        this.props.showConfirm(
            "Confirm",
            `Are you sure want to delete ${data.length} row ?`,
            data
        );
    }
    editCrud(data) {
        this.props.history.push(
            `${this.getBasePath()}/booking-transaction-form/${data.id}`
        );
    }
    // changePassword = (data) => {
    //   this.props.openModal({
    //     open: true,
    //     title: "Update Consultant Password",
    //     component: <PasswordForm id={data.id} actionFor="consultant" />,
    //   });
    // };
    addCrud() {
        this.props.history.push(
            `${this.getBasePath()}/booking-transaction-form/new`
        );
    }
    export = () => {
        fileService._download("reports/creditpurchasereport");
    };
    render() {
        const columns = [
            
            {
                title: "Visitor Name",
                field: "visitor.name",
            },
            {
                title: "Purchased Credit",
                field: "purchased_credit" 
            },
            {
                title: "Type",
                field: "type",
            },
            {
                title: "Amount",
                field: "amount_paid",
            },
            {
                title: "Created Date",
                field: "created_at",
            },
        ];

        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        url="visitors/credit_purchase"
                        selection={true}
                        grouping={false}
                        defaultExpanded={true}
                        refresh={true}
                        serverSide={true}
                        search={true}
                        sorting={true}
                        filtering={true}
                        export={PermissionHelper.checkPermission("export_vendor_template")
                        ? this.export
                        : false}
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
};

const actionCreators = {
    getRole: crudActions._get,
    deleteCrud: crudActions._delete,
    deleteAllCrud: crudActions._deleteAll,
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
    openModal: modalActions.open,
    showLoader: loaderActions.show,
    hideLoader: loaderActions.hide,
};

export default connect(
    mapStateToProps,
    actionCreators
)(VisitorCreditPurchaseReportsList);

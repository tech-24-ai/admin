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
import { PermissionHelper, UserHelper } from "_helpers";

const title = "Visitor Credit Summary";
class VisitorCreditReportsList extends React.PureComponent {
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
                this.props.deleteAllCrud("form", "visitor-credit-purchase/delete_all", {
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

    deleteData = (id) => {
        this.props.deleteCrud("form", "visitors/credit_purchase", id);
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
        this.props.history.push(`/admin/visitor-credit-purchase-form/${data.id}`);
    }
    // changePassword = (data) => {
    //   this.props.openModal({
    //     open: true,
    //     title: "Update Consultant Password",
    //     component: <PasswordForm id={data.id} actionFor="consultant" />,
    //   });
    // };
    addCrud() {
        this.props.history.push(`/admin/visitor-credit-purchase-form/new`);
    }
    export = () => {
        fileService._download("reports/creditsummaryport");
    };
    render() {
        const columns = [

            {
                title: "Visitor Name",
                field: "name",
            },
            {
                title: "Purchased Credit",
                field: "purchase",
            },
            {
                title: "Used Credit",
                field: "used",
            },
            {
                title: "Available Credit",
                field: "credit",
            },
        ];

        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        url="visitors/credit_history"
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
)(VisitorCreditReportsList);

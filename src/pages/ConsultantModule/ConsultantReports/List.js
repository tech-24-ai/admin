import React, { Fragment } from "react";
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
import { Button } from "antd";
import { alpha } from '@material-ui/core/styles';
import Link from "@material-ui/core/Link";

const title = "Consultants Report";
class ConsultantReportsList extends React.PureComponent {
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
                this.props.deleteAllCrud("form", "consultants/delete_all", {
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
        this.props.deleteCrud("form", "consultants", id);
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
        this.props.history.push(`/admin/consultant-form/${data.id}`);
    }

    changePassword = (data) => {
        this.props.openModal({
            open: true,
            title: "Update Consultant Password",
            component: <PasswordForm id={data.id} actionFor="consultant" />,
        });
    };

    addCrud() {
        this.props.history.push(`/admin/consultant-form/new`);
    }
    export = () => {
        fileService._download("reports/consultantreport");
    };
    render() {
        const columns = [
            {
                title: "Name",
                field: "first_name",
            },
            {
                title: "Rating",
                field: "avg_rating",
            },
            {
                title: "Status",
                field: "status",
            },
            {
                title: "Mobile",
                field: "mobile",
            },
            {
                title: "Email",
                field: "email",
            },
            {
                title: "Details",
                field: "details",
                render: (item) =>
                    item.details && (
                        <div>
                            {item.details?.substring(0, 80)}{" "}
                            {item.details.length > 30 &&
                                <span>
                                    <Link
                                        onClick={() => this.toggleModal(item.details)}
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
                title: "Number of Employee",
                field: "number_of_employee",
            },
            {
                title: "Created Date",
                field: "created_at",
                defaultSort: "desc",
            },
        ];

        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        deleteAll={
                            PermissionHelper.checkPermission("delete_consultants")
                                ? this.deleteAll
                                : false
                        }
                        url="consultants"
                        selection={true}
                        grouping={false}
                        defaultExpanded={true}
                        refresh={true}
                        serverSide={true}
                        search={true}
                        sorting={true}
                        filtering={true}
                        export={
                            PermissionHelper.checkPermission("export_vendor_template")
                                ? this.export
                                : false
                        }
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
    activateConsultant: crudActions._create,
};

export default connect(
    mapStateToProps,
    actionCreators
)(ConsultantReportsList);

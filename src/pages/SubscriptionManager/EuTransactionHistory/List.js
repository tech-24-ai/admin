import React from "react";
import { connect } from "react-redux";

// core components
import { fileService } from "_services";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import {
  crudActions,
  confirmActions,
  modalActions,
  loaderActions,
} from "../../../_actions";
import { TableAction } from "../../../material-table/TableAction";
import PasswordForm from "../../PasswordForm";
import { PermissionHelper } from "_helpers";
import moment from "moment";
import { EU_TRANSACTION_TYPE } from "../../../_constants/form.constants";

const title = "End User Transactions History";
export class TransactionsList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      exportImportValue: "",
      switchButton: false,
      selectElement: false,
      isExport: false,
      isImport: false,
    };

    this.viewCrud = this.viewCrud.bind(this);
    this.deleteCrud = false;
    this.addCrud = false;
    this.editCrud = false;
    this.deleteAll = false;
    this.export = this.export.bind(this);
  }

  componentDidUpdate() {
    if (this.props.confirm.confirm) {
      if (this.props.confirm.data.length) {
        const ids = this.props.confirm.data.map((value) => value.id);
      } else {
        if (this.props.confirm.data.id) {
        }
      }
      this.props.clearConfirm();
    }
  }

  changePassword = (data) => {
    this.props.openModal({
      open: true,
      title: "Update Vendor Password",
      component: <PasswordForm id={data.id} actionFor="vendor" />,
    });
  };

  viewCrud(data) {
    this.props.history.push(`/admin/eutransaction-view/${data.id}`);
  }

  export() {
    fileService._download("reports/visitortransactionsreport");
  }

  render() {
    const columns = [
      {
        title: "User's Name",
        field: "users.name",
      },
      {
        title: "Transaction Code",
        field: "transaction_code",
      },
      {
        title: "Paypal Id",
        field: "payment_transaction_id",
      },
      {
        title: "Transaction Status",
        field: "transaction_status",
      },
      {
        title: "Amount",
        field: "transaction_amount",
      },
      {
        title: "Payment Type",
        field: "payment_type",
        lookupConstant: EU_TRANSACTION_TYPE,
      },

      {
        title: "Transaction Date",
        field: "created_at",
        defaultSort: "desc"
      },

      TableAction(
        PermissionHelper.checkPermission("delete_eutransactions")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("view_eutransactions")
          ? this.editCrud
          : null,
        false,
        PermissionHelper.checkPermission("view_eutransactions")
          ? this.viewCrud
          : null
      ),
    ];

    const { isExport, isImport, exportImportValue } = this.state;

    return (
      <GridContainer>
        <GridItem xs={12}>
          <MaterialDataTable
            title={title}
            columns={columns}
            addData={
              PermissionHelper.checkPermission("add_eutransactions")
                ? this.addCrud
                : false
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_eutransactions")
                ? this.deleteAll
                : false
            }
            url="eutransactions"
            selection={true}
            grouping={false}
            defaultExpanded={true}
            refresh={true}
            serverSide={true}
            search={true}
            sorting={true}
            export={
              PermissionHelper.checkPermission("export_eutransactions")
                ? this.export
                : false
            }
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
)(TransactionsList);

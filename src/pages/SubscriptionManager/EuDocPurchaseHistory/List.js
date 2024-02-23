import React from "react";
import { connect } from "react-redux";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import { fileService } from "_services";
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

const title = "Document Purchase History";
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
    this.downloadFile = this.downloadFile.bind(this);
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
    this.props.history.push(`/admin/eudocpurchases-view/${data.id}`);
  }

  downloadFile(data) {
    console.log(data);
    const { id, payment_transaction_id } = data;
    this.props.downloadFile("invoice", "eusubscription/getdocinvoice", {
      id: data.invoices.id,
      type: "EUINVOICE",
      purchase_id: id,
    });
  }

  export() {
    fileService._download("reports/visitordocpurchasedreport");
  }

  render() {
    const columns = [
      {
        title: "User's Name",
        field: "users.name",
      },
      {
        title: "Document Name",
        field: "documents.name",
      },
      {
        title: "Transaction Code",
        field: "transactions.transaction_code",
      },
      {
        title: "Amount",
        field: "document_price",
      },
      {
        title: "Purchase Date",
        field: "created_at",
        defaultSort: "desc",
      },

      TableAction(
        false,
        false,
        this.downloadFile,
        false,
        PermissionHelper.checkPermission("view_eudocpurchases")
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
              PermissionHelper.checkPermission("add_eudocpurchases")
                ? this.addCrud
                : false
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_eudocpurchases")
                ? this.deleteAll
                : false
            }
            url="eusubscription/purchase"
            selection={true}
            grouping={false}
            defaultExpanded={true}
            refresh={true}
            serverSide={true}
            search={true}
            sorting={true}
            export={
              PermissionHelper.checkPermission("export_eudocpurchases")
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
  downloadFile: crudActions._download,
};

export default connect(
  mapStateToProps,
  actionCreators
)(TransactionsList);

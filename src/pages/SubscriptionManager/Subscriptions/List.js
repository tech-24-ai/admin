import React from "react";
import { connect } from "react-redux";
import { INVESTOR_STATUS } from "_constants/form.constants";

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
import { TableAction } from "../../../material-table/TableAction";
import PasswordForm from "../../PasswordForm";
import { PermissionHelper } from "_helpers";
import { fileService } from "_services";

const title = "Subscriptions";
export class PricingConfigurationList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      exportImportValue: "",
      switchButton: false,
      selectElement: false,
      isExport: false,
      isImport: false,
    };

    this.deleteCrud = this.deleteCrud.bind(this);
    this.addCrud = this.addCrud.bind(this);
    this.editCrud = this.editCrud.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.export = this.export.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }

  componentDidUpdate() {
    if (this.props.confirm.confirm) {
      if (this.props.confirm.data.length) {
        const ids = this.props.confirm.data.map((value) => value.id);
        this.props.deleteAllCrud(
          "form",
          "pricingInsight/pricing_configuration/delete_all",
          { ids: JSON.stringify(ids) }
        );
      } else {
        if (this.props.confirm.data.id) {
          this.deleteData(this.props.confirm.data.id);
        }
      }
      this.props.clearConfirm();
    }
  }

  deleteData = (id) => {
    this.props.deleteCrud("form", "subscription/subscriptions", id);
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
    this.props.history.push(`/admin/subscriptions-form/${data.id}`);
  }

  changePassword = (data) => {
    this.props.openModal({
      open: true,
      title: "Update Vendor Password",
      component: <PasswordForm id={data.id} actionFor="vendor" />,
    });
  };

  downloadFile(data) {
    console.log(data);
    const { id, subscription_id } = data.invoices;
    this.props.downloadFile("invoice", "subscription/getinvoice", {
      id,
      type: "INVOICE",
      subscription_id,
    });
  }

  addCrud() {
    this.props.history.push(`/admin/subscriptions-form/new`);
  }

  export() {
    fileService._download("reports/investorsubscriptionsreport");
  }

  render() {
    const columns = [
      {
        title: "User's Name",
        field: "users.name",
      },
      {
        title: "Plan",
        field: "plans.plan_name",
        url: "subscription/market_plans",
        filterName: "plan_name",
      },
      {
        title: "Plan Duration",
        field: "plans.plan_duration",
      },
      {
        title: "Start Date",
        field: "subscription_start_date",
        defaultSort: "desc"
      },
      {
        title: "End Date",
        field: "subscription_end_date",
      },

      TableAction(
        PermissionHelper.checkPermission("delete_subscriptions")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("edit_subscriptions")
          ? this.editCrud
          : null,
        this.downloadFile
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
              PermissionHelper.checkPermission("add_subscriptions")
                ? this.addCrud
                : false
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_subscriptions")
                ? this.deleteAll
                : false
            }
            url="subscription/subscriptions"
            selection={true}
            grouping={false}
            defaultExpanded={true}
            refresh={true}
            serverSide={true}
            search={true}
            sorting={true}
            export={
              PermissionHelper.checkPermission("export_subscriptions")
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
)(PricingConfigurationList);

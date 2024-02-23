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
import {
  SUBSCRIPTION_STATUS,
  EU_SUBSCRIPTION_CATEGORY,
} from "../../../_constants/form.constants";
import { Link } from "@material-ui/core";

const title = "End User Subscriptions Pending";
export class EuSubscriptionList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      exportImportValue: "",
      switchButton: false,
      selectElement: false,
      isExport: false,
      isImport: false,
    };

    this.editCrud = this.editCrud.bind(this);
    this.export = this.export.bind(this);
  }

  editCrud(data) {
    this.props.history.push(`/admin/eusubscription-pending-form/${data.id}`);
  }

  downloadFile(data) {
    const { id, payment_transaction_id } = data;
    this.props.downloadFile("invoice", "eusubscription/getinvoice", {
      id: data.invoices.id,
      type: "EUINVOICE",
      subscription_id: id,
    });
  }

  export() {
    fileService._download("reports/visitorsubscriptionsreport");
  }

  render() {
    const columns = [
      {
        title: "User's Name",
        field: "users.name",
        render: (item) => (
          <Link href={`/admin/visitor-form/${item.user_id}`}>
            {item.users.name}
          </Link>
        ),
      },
      {
        title: "Plan",
        field: "plans.plan_category",
        lookupConstant: EU_SUBSCRIPTION_CATEGORY,
      },
      {
        title: "Plan Duration",
        field: "plans.plan_duration",
      },
      {
        title: "Start Date",
        field: "subscription_start_date",
        defaultSort: "desc",
      },
      {
        title: "End Date",
        field: "subscription_end_date",
        defaultSort: "desc",
      },
      {
        title: "Status",
        field: "status",
        filtering: false,
      },

      TableAction(
        null,
        PermissionHelper.checkPermission("edit_eusubscriptions")
          ? this.editCrud
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
            url="eusubscription/pendingSubscriptions"
            selection={true}
            grouping={false}
            defaultExpanded={true}
            refresh={true}
            serverSide={true}
            search={true}
            sorting={true}
            export={
              PermissionHelper.checkPermission("export_eusubscriptions")
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
)(EuSubscriptionList);

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
import { TableAction } from "../../../material-table/TableAction";
import PasswordForm from "../../PasswordForm";
import { PermissionHelper, UserHelper } from "_helpers";
import moment from "moment";

const title = "Refund Request";
class RefundRequestList extends React.PureComponent {
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
        this.props.deleteAllCrud(
          "form",
          `refund-request/${this.props.match.params}/delete_all`,
          {
            ids: JSON.stringify(ids),
          }
        );
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
    if (UserHelper.isConsultant()) {
      return `/consultant`;
    } else {
      if (id) {
        return `/admin/consultant-form/${id}`;
      } else {
        return `/admin`;
      }
    }
  }
  deleteData = (id) => {
    this.props.deleteCrud(
      "form",
      `refund-request/${this.props.match.params}`,
      id
    );
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
      `${this.getBasePath()}/refund-request-form/${data.id}`
    );
  }

  changePassword = (data) => {
    this.props.openModal({
      open: true,
      title: "Update Vendor Password",
      component: <PasswordForm id={data.id} actionFor="vendor" />,
    });
  };

  addCrud() {
    this.props.history.push(`${this.getBasePath()}/refund-request-form/new`);
  }

  render() {
    const { id } = this.props.match.params;
    const columns = [
      {
        title: "Refund By",
        field: "refund_by",
      },
      {
        title: "Reason",
        field: "reason",
      },
      {
        title: "Refund Amount",
        field: "refund_amount",
      },
      {
        title: "Approved Amount",
        field: "approved_amount",
      },
      {
        title: "Booking Status",
        field: "booking.booking_status",
      },
      {
        title: "Refund Status",
        field: "refund_status",
      },
      {
        title: "Booking Date",
        field: "booking.booking_date",
        render: (item) =>
          item.booking_utc_time
            ? moment.parseZone(item.booking_utc_time).format("LLL")
            : moment(
                `${moment(item.booking_date).format("DD-MM-YYYY")} ${
                  item.booking_time
                }`,
                "DD-MM-YYYY HH:mm:ss"
              ).format("LLL"),
      },
      TableAction(
        // PermissionHelper.checkPermission("delete_vendor_documents")
        //   ? this.deleteCrud
        //   : null,
        false,
        PermissionHelper.checkPermission("edit_refund_request")
          ? this.editCrud
          : null
      ),
    ];

    return (
      <GridContainer>
        <GridItem xs={12}>
          <MaterialDataTable
            title={title}
            columns={columns}
            // addData={
            //   PermissionHelper.checkPermission("add_vendor_documents")
            //     ? this.addCrud
            //     : false
            // }
            deleteAll={
              PermissionHelper.checkPermission("edit_refund_request")
                ? this.deleteAll
                : false
            }
            url={`booking/refund-request${
              UserHelper.isConsultant() || id == undefined
                ? ""
                : `?consultant_id=${this.props.match.params.id}`
            }`}
            selection={true}
            grouping={false}
            defaultExpanded={true}
            refresh={true}
            serverSide={true}
            search={true}
            sorting={true}
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
)(RefundRequestList);

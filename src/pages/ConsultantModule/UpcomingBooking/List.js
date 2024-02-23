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
import moment from "moment";
import { Link } from "@material-ui/core";

const title = "Upcoming Booking";
class UpcomingBookingList extends React.PureComponent {
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
        this.props.deleteAllCrud("form", "upcoming-booking/delete_all", {
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
    this.props.deleteCrud("form", "upcoming-booking", id);
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
  // changePassword = (data) => {
  //   this.props.openModal({
  //     open: true,
  //     title: "Update Consultant Password",
  //     component: <PasswordForm id={data.id} actionFor="consultant" />,
  //   });
  // };
  editCrud(data) {
    this.props.history.push(
      `${this.getBasePath()}/upcoming-booking-form/${data.id}`
    );
  }
  addCrud() {
    this.props.history.push(`${this.getBasePath()}/upcoming-booking-form/new`);
  }
  export = () => {
    fileService._download("reports/bookingreport?bookingType=upcoming");
  };
  render() {
    const { id } = this.props.match.params;
    console.log("id", this.props);
    const columns = [
      {
        title: "Consultant Name",
        field: "consultant.first_name",
      },
      {
        title: "Visitor Name",
        field: "visitor.name",
      },
      {
        title: "Booking Date Time",
        field: "booking_date",
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

      // {
      //   title: "Booking Time",
      //   field: "booking_time",
      // },
      {
        title: "Duration",
        field: "duration",
      },
      {
        title: "Amount Paid",
        field: "transaction.total_amount",
      },
      {
        title: "Booking Status",
        field: "booking_status",
      },
      {
        title: "Meeting Link",
        // field: "meeting_link",
        render: (item) =>
          item.booking_status == "Confirmed" ? (
            <Link target="_blank" href={item.meeting_link}>
              {/* {item.meeting_link} */}
              Join Meeting
            </Link>
          ) : (
            ""
          ),
        url: "consultants/booking",
        // filterName: "meeting_link",
      },
      // TableAction(
      //   PermissionHelper.checkPermission("delete_consultants")
      //     ? this.deleteCrud
      //     : null,
      //   PermissionHelper.checkPermission("edit_consultants") ? this.editCrud : null
      // ),
      TableAction(
        // PermissionHelper.checkPermission("delete_vendors")
        //   ? this.deleteCrud
        //   : null,
        false,
        PermissionHelper.checkPermission("edit_booking") ? this.editCrud : null
      ),
      // TableAction(
      // this.deleteCrud,
      // this.editCrud
      // ),
    ];

    return (
      <GridContainer>
        <GridItem xs={12}>
          <MaterialDataTable
            title={title}
            columns={columns}
            // addData={
            //   PermissionHelper.checkPermission("add_consultants")
            //     ? this.addCrud
            //     : false
            // }
            // addData={this.addCrud}
            addData={
              PermissionHelper.checkPermission("add_booking") &&
              !UserHelper.isConsultant()
                ? this.addCrud
                : false
            }
            // deleteAll={
            //   PermissionHelper.checkPermission("delete_consultants")
            //     ? this.deleteAll
            //     : false
            // }
            url={`consultants/booking?bookingType=upcoming${
              UserHelper.isConsultant() || id == undefined
                ? ""
                : `&consultant_id=${this.props.match.params.id}`
            }`}
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
};

export default connect(
  mapStateToProps,
  actionCreators
)(UpcomingBookingList);

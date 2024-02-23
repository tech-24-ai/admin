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

const title = "Consultant Scheduling";
class ConsultantSchedulingList extends React.PureComponent {
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
        this.props.deleteAllCrud("form", "consultant-scheduling/delete_all", {
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
    if (UserHelper.isConsultant()) {
      return `/consultant`;
    } else {
      return `/admin/consultant-form/${id}`;
    }
  }

  deleteData = (id) => {
    this.props.deleteCrud("form", "coconsultants/schedules", id);
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
      `${this.getBasePath()}/consultant-scheduling-form/${data.id}`
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
      `${this.getBasePath()}/consultant-scheduling-form/new`
    );
  }
  // export = () => {
  //     fileService._download("reports/consultantreport");
  // };
  render() {
    const columns = [
      {
        title: "Consultant",
        field: "consultant.first_name",
      },
      {
        title: "Type",
        field: "type",
      },
      {
        title: "Timezone",
        field: "timeZone.offset",
      },
      {
        title: "Created Date",
        field: "created_at",
      },
      // TableAction(
      //   PermissionHelper.checkPermission("delete_consultants")
      //     ? this.deleteCrud
      //     : null,
      //   PermissionHelper.checkPermission("edit_consultants") ? this.editCrud : null
      // ),
      TableAction(
        // PermissionHelper.checkPermission("delete_vendors")
        //     ? this.deleteCrud
        //     : null,
        false,
        PermissionHelper.checkPermission("edit_schedule") ? this.editCrud : null
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
              PermissionHelper.checkPermission("add_schedule")
                ? this.addCrud
                : false
            }
            // deleteAll={
            //     PermissionHelper.checkPermission("delete_consultants")
            //         ? this.deleteAll
            //         : false
            // }
            // url="consultants/schedules"
            url={`consultants/schedules${
              UserHelper.isConsultant()
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
            // export={PermissionHelper.checkPermission("export_vendor_template")
            //     ? this.export
            //     : false}
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
)(ConsultantSchedulingList);

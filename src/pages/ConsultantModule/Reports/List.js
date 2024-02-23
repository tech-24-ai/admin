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
import { PermissionHelper } from "_helpers";
import { YEAR } from "_constants/form.constants";

const title = "Reports List";
class ReportsList extends React.PureComponent {
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
          `consultants/reports/delete_all`,
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
    return `/admin/consultant-form/${id}`;
  }
  deleteData = (id) => {
    this.props.deleteCrud(
      "form",
      `consultants/reports/${this.props.match.params}`,
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
      `${this.getBasePath()}/reports-form/${data.id}`
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
    this.props.history.push(`${this.getBasePath()}/reports-form/new`);
  }

  render() {
    const columns = [
      {
        title: "Reports",
        field: "reports",
      },
      TableAction(
        // PermissionHelper.checkPermission("delete_vendor_itmap_score")
        //   ? this.deleteCrud
        //   : null,
        // PermissionHelper.checkPermission("edit_vendor_itmap_score")
        //   ? this.editCrud
        //   : null
        false,
        false
      ),
    ];

    return (
      <GridContainer>
        <GridItem xs={12}>
          <MaterialDataTable
            title={title}
            columns={columns}
            // addData={
            //   PermissionHelper.checkPermission("add_vendor_itmap_score")
            //     ? this.addCrud
            //     : false
            // }
            // deleteAll={
            //   PermissionHelper.checkPermission("delete_vendor_itmap_score")
            //     ? this.deleteAll
            //     : false
            // }
            // url="consultants/reports"
            url="complaints"
            selection={false}
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
)(ReportsList);

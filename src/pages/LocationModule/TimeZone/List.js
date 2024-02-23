import React from "react";
import { connect } from "react-redux";

// core components
import { fileService } from "_services";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions } from "../../../_actions";
import { TableAction } from "../../../material-table/TableAction";
import { PermissionHelper } from "_helpers";

const title = "Time Zone";
export class TimeZoneList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deleteCrud = this.deleteCrud.bind(this);
    this.addCrud = this.addCrud.bind(this);
    this.editCrud = this.editCrud.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.export = this.export.bind(this);
  }

  componentDidUpdate() {
    if (this.props.confirm.confirm) {
      if (this.props.confirm.data.length) {
        this.props.confirm.data.map((value) => this.deleteData(value.id));
      } else {
        if (this.props.confirm.data.id) {
          this.deleteData(this.props.confirm.data.id);
        }
      }
      this.props.clearConfirm();
    }
  }

  deleteData = (id) => {
    this.props.deleteCrud("form", "time-zone", id);
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
    this.props.history.push(`/admin/timezone-form/${data.id}`);
  }

  addCrud() {
    this.props.history.push(`/admin/timezone-form/new`);
  }

  export() {
    fileService._download("reports/countryreport");
  }

  render() {
    const columns = [
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Sortname",
        field: "sort_name",
      },
      {
        title: "Zone",
        field: "zone",
      },
      {
        title: "Offset",
        field: "offset",
      },
      TableAction(
        PermissionHelper.checkPermission("delete_countries")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("edit_countries")
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
            addData={
              PermissionHelper.checkPermission("add_countries")
                ? this.addCrud
                : false
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_countries")
                ? this.deleteAll
                : false
            }
            url="time-zone"
            selection={true}
            refresh={true}
            serverSide={true}
            search={true}
            sorting={true}
            export={
              PermissionHelper.checkPermission("export_countries")
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
  showConfirm: confirmActions.show,
  clearConfirm: confirmActions.clear,
};

export default connect(
  mapStateToProps,
  actionCreators
)(TimeZoneList);

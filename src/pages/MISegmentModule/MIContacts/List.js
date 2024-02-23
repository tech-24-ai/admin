import React from "react";
import { connect } from "react-redux";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions } from "../../../_actions";
import { TableAction } from "../../../material-table/TableAction";
import { PermissionHelper } from "_helpers";
import { fileService } from "_services";

import { XLSX } from "xlsx";

const title = "MI Contacts";

export class MiContacts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deleteCrud = this.deleteCrud.bind(this);
    this.viewCrud = this.viewCrud.bind(this);
    // this.editCrud = this.editCrud.bind(this);
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
    this.props.deleteCrud("form", "mi_contacts", id);
  };

  deleteCrud(data) {
    this.props.showConfirm("Confirm", `Are you sure want to delete?`, data);
  }

  deleteAll(data) {
    this.props.showConfirm(
      "Confirm",
      `Are you sure want to delete ${data.length} row ?`,
      data
    );
  }

  // editCrud(data) {
  //     this.props.history.push(`/admin/mi-form/${data.id}`)
  // }

  viewCrud(data) {
    this.props.history.push(`/admin/mi-view/${data.id}`);
  }

  export() {
    fileService._download("reports/micontactreport");
  }

  render() {
    const columns = [
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Email",
        field: "email",
      },
      {
        title: "Mobile",
        field: "mobile",
      },
      {
        title: "Message",
        field: "message",
      },
      {
        title: "Date",
        field: "updated_at",
        defaultSort: "desc"
      },
      TableAction(
        PermissionHelper.checkPermission("delete_mi_contacts")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("view_mi_contacts")
          ? this.editCrud
          : null,
        false,false,
        PermissionHelper.checkPermission("view_mi_contacts")
          ? this.viewCrud
          : null,
          false,
      ),
    ];

    const downloadExcel = () => {
      const newData = columns.map((row) => {
        delete row.tableData;
        return row;
      });
      const workSheet = XLSX.utils.json_to_sheet(newData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "mi_contacts");
      //Buffer
      let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
      //Binary string
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      //Download
      XLSX.writeFile(workBook, "colunms.xlsx");
    };
    return (
      <GridContainer>
        <GridItem xs={12}>
          <MaterialDataTable
            title={title}
            columns={columns}
            exportData={true}
            addData={
              PermissionHelper.checkPermission("add_mi_contacts")
                ? this.addCrud
                : false
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_mi_contacts")
                ? this.deleteAll
                : false
            }
            url="mi_contacts"
            selection={true}
            refresh={true}
            serverSide={true}
            search={true}
            sorting={true}
            export={
              PermissionHelper.checkPermission("export_mi_contacts")
                ? this.export
                : false
            }
            filtering={true}
            actions={[
              {
                icon: () => <button>Export</button>, // you can pass icon too
                tooltip: "Export to Excel",
                onClick: () => downloadExcel(),
                isFreeAction: true,
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { authentication, confirm } = state;
  const { user } = authentication;
  return {
    user,
    confirm,
  };
};

const actionCreators = {
  getContact: crudActions._get,
  deleteCrud: crudActions._delete,
  showConfirm: confirmActions.show,
  clearConfirm: confirmActions.clear,
};

export default connect(
  mapStateToProps,
  actionCreators
)(MiContacts);

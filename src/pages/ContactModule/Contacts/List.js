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

const title = "Contacts";
export class ContactList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deleteCrud = this.deleteCrud.bind(this);
    //.addCrud = this.addCrud.bind(this);
    this.viewCrud = this.viewCrud.bind(this);
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
    this.props.deleteCrud("form", "contacts", id);
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

  editCrud(data) {
    this.props.history.push(`/admin/contact-form/${data.id}`);
  }
  viewCrud(data) {
    this.props.history.push(`/admin/contact-view/${data.id}`);
  }

  export() {
    fileService._download("reports/contactreport");
  }

  /*addCrud() {
        this.props.history.push(`/admin/contact-form/new`)
    }*/

  render() {
    const columns = [
      {
        title: "Contact Type",
        field: "contact_type",
      },
      {
        title: "Organisation Name",
        field: "organisation_name",
      },
      {
        title: "Revenue Range",
        field: "revenue_range",
      },
      {
        title: "Number Employees",
        field: "number_employees",
      },
      {
        title: "Date",
        field: "updated_at",
        defaultSort: "desc",
      },
      TableAction(
        PermissionHelper.checkPermission("delete_contact_details")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("delete_contact_details")
          ? this.editCrud
          : null,
        false,false,
        PermissionHelper.checkPermission("view_contact_details")
          ? this.viewCrud
          : null
      ),
    ];

    return (
      <GridContainer>
        <GridItem xs={12}>
          <MaterialDataTable
            title={title}
            columns={columns}
            //addData={this.addCrud}
            deleteAll={
              PermissionHelper.checkPermission("delete_contact_details")
                ? this.deleteAll
                : false
            }
            url="contacts"
            selection={true}
            refresh={true}
            serverSide={true}
            search={true}
            sorting={true}
            filtering={true}
            export={
              PermissionHelper.checkPermission("export_contacts")
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
)(ContactList);

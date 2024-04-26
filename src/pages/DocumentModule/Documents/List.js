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
import {
  EU_SUBSCRIPTION_CATEGORY,
  EU_DOCUMENT_CATEGORY,
  DOCUMENT_STATUS,
} from "../../../_constants/form.constants";

const title = "Documents";
export class DocumentList extends React.PureComponent {
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
    this.props.deleteCrud("form", "documents", id);
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
    this.props.history.push(`/admin/Document-form/${data.id}`);
  }

  addCrud() {
    this.props.history.push(`/admin/Document-form/new`);
  }

  export() {
    fileService._download("reports/documentreport");
  }

  render() {
    const columns = [
      {
        title: "Document Type",
        field: "document_type",
      },
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Document Category",
        field: "document_category",
        lookupConstant: EU_DOCUMENT_CATEGORY,
      },
      {
        title: "Category",
        field: "category_name.name",
      },
      {
          title: "Status",
          field: "status",
          lookupConstant: DOCUMENT_STATUS,
      },
      {
        title: "Date",
        field: "updated_at",
        defaultSort: "desc",
      },
      TableAction(
        PermissionHelper.checkPermission("delete_documents")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("edit_documents")
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
              PermissionHelper.checkPermission("add_documents")
                ? this.addCrud
                : false
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_documents")
                ? this.deleteAll
                : false
            }
            url="documents"
            selection={true}
            refresh={true}
            serverSide={true}
            search={true}
            sorting={false}
            export={
              PermissionHelper.checkPermission("export_documents")
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
  getDocument: crudActions._get,
  deleteCrud: crudActions._delete,
  showConfirm: confirmActions.show,
  clearConfirm: confirmActions.clear,
};

export default connect(
  mapStateToProps,
  actionCreators
)(DocumentList);

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
import { PermissionHelper } from "_helpers";

const title = "Vendors";
class VendorList extends React.PureComponent {
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
        this.props.deleteAllCrud("form", "vendors/delete_all", {
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
    this.props.deleteCrud("form", "vendors", id);
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
    this.props.history.push(`/admin/vendor-form/${data.id}`);
  }

  changePassword = (data) => {
    this.props.openModal({
      open: true,
      title: "Update Vendor Password",
      component: <PasswordForm id={data.id} actionFor="vendor" />,
    });
  };

  addCrud() {
    this.props.history.push(`/admin/vendor-form/new`);
  }

  export = () => {
    fileService._download("vendors/export");
  };

  import = (event) => {
    let file = event.target.files[0];
    this.props.showLoader();
    fileService._import("/vendors/import", file).then((response) => {
      if (response.status === 200) {
        this.props.hideLoader();
      }
    });
  };

  render() {
    const columns = [
      {
        title: "Category",
        field: "vendor_category.name",
      },
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
        title: "Image",
        field: "image",
        filtering: false,
        render: (item) => <img src={item.image} width="40%" />,
      },
      {
        title: "Added Date",
        field: "updated_at",
        defaultSort: "desc",
      },
      TableAction(
        PermissionHelper.checkPermission("delete_vendors")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("edit_vendors") ? this.editCrud : null
      ),
    ];

    return (
      <GridContainer>
        <GridItem xs={12}>
          <MaterialDataTable
            title={title}
            columns={columns}
            addData={
              PermissionHelper.checkPermission("add_vendors")
                ? this.addCrud
                : false
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_vendors")
                ? this.deleteAll
                : false
            }
            url="vendors"
            selection={true}
            grouping={false}
            defaultExpanded={true}
            refresh={true}
            serverSide={true}
            search={true}
            sorting={true}
            filtering={true}
            export={PermissionHelper.checkPermission("export_vendor_template")
            ? this.export
            : false}
            import={PermissionHelper.checkPermission("import_vendor_template")
            ? this.import
            : false}
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
)(VendorList);

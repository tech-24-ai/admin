import React from "react";
import { connect } from "react-redux";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions, modalActions } from "../../../_actions";
import { TableAction } from "../../../material-table/TableAction";
import { PermissionHelper } from "_helpers";
import PasswordForm from "../../PasswordForm";

const title = "Users";
class UserList extends React.PureComponent {
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
    this.props.deleteCrud("form", "users", id);
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
    this.props.history.push(`/admin/user-form/${data.id}`);
  }

  changePassword = (data) => {
    this.props.openModal({
      open: true,
      title: "Update User Password",
      component: <PasswordForm id={data.id} actionFor="user" />,
    });
  };

  addCrud() {
    this.props.history.push(`/admin/user-form/new`);
  }

  render() {
    const columns = [
      {
        title: "Role",
        field: "role",
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
        title: "Date",
        field: "updated_at",
      },
      TableAction(
        PermissionHelper.checkPermission("delete_users")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("edit_users") ? this.editCrud : null,
        null,
        PermissionHelper.checkPermission("update_user_password")
          ? this.changePassword
          : null,
        null,
        null
      ),
    ];

    return (
      <GridContainer>
        <GridItem xs={12}>
          <MaterialDataTable
            title={title}
            columns={columns}
            exportData={
              PermissionHelper.checkPermission("export_users")
                ? this.deleteAll
                : false
            }
            addData={
              PermissionHelper.checkPermission("add_users")
                ? this.addCrud
                : false
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_users")
                ? this.deleteAll
                : false
            }
            url="users"
            selection={true}
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
  getUser: crudActions._get,
  deleteCrud: crudActions._delete,
  showConfirm: confirmActions.show,
  clearConfirm: confirmActions.clear,
  openModal: modalActions.open,
};

export default connect(
  mapStateToProps,
  actionCreators
)(UserList);

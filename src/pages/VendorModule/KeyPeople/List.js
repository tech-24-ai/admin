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
import {
  DIRECTORS,
  STATUS,
  EXECUTIVE_MANAGEMENT,
} from "../../../_constants/form.constants";
const title = "Key People";
class KeyPeopleList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deleteCrud = this.deleteCrud.bind(this);
    this.addCrud = this.addCrud.bind(this);
    this.editCrud = this.editCrud.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    console.log("Props", props);
  }

  componentDidUpdate() {
    if (this.props.confirm.confirm) {
      if (this.props.confirm.data.length) {
        const ids = this.props.confirm.data.map((value) => value.id);
        this.props.deleteAllCrud(
          "form",
          `key-people/${this.props.match.params}/delete_all`,
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
    return `/admin/vendor-form/${id}`;
  }
  deleteData = (id) => {
    this.props.deleteCrud("form", `key-people/${this.props.match.params}`, id);
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
    this.props.history.push(`${this.getBasePath()}/key-people-form/${data.id}`);
  }

  changePassword = (data) => {
    this.props.openModal({
      open: true,
      title: "Update Vendor Password",
      component: <PasswordForm id={data.id} actionFor="vendor" />,
    });
  };

  addCrud() {
    this.props.history.push(`${this.getBasePath()}/key-people-form/new`);
  }

  import = (event) => {
    let file = event.target.files[0];
    this.props.showLoader();
    fileService
      ._import(`/keypeople/import?id=${this.props.match.params.id}`, file)
      .then((response) => {
        if (response.status === 200) {
          this.props.hideLoader();
        }
      });
  };

  import = (event) => {
    let file = event.target.files[0];
    this.props.showLoader();
    fileService
      ._import(`/keypeople/import?id=${this.props.match.params.id}`, file)
      .then((response) => {
        if (response.status === 200) {
          this.props.hideLoader();
        }
      });
  };

  render() {
    const columns = [
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Designation",
        field: "designation",
      },
      {
        title: "Director",
        field: "is_board_of_directors",
        lookupConstant: DIRECTORS,
      },
      {
        title: "Executive Type",
        field: "is_executive_managment",
        lookupConstant: EXECUTIVE_MANAGEMENT,
      },
      {
        title: "Active",
        field: "is_active",
        lookupConstant: STATUS,
      },
      TableAction(
        PermissionHelper.checkPermission("delete_vendor_key_people")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("edit_vendor_key_people")
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
              PermissionHelper.checkPermission("add_vendor_key_people")
                ? this.addCrud
                : false
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_vendor_key_people")
                ? this.deleteAll
                : false
            }
            url={`key-people/${this.props.match.params.id}`}
            selection={true}
            grouping={false}
            defaultExpanded={true}
            refresh={true}
            serverSide={true}
            search={true}
            sorting={true}
            filtering={true}
            import={this.import}
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
)(KeyPeopleList);

import React from "react";
import { connect } from "react-redux";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions, modalActions } from "../../../_actions";
import { TableAction } from "../../../material-table/TableAction";
import PasswordForm from "../../PasswordForm";
import { PermissionHelper } from "_helpers";
import { Button } from "antd";

const title = "Visitors";
class VisitorList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deleteCrud = this.deleteCrud.bind(this);
    this.editCrud = this.editCrud.bind(this);
    this.addCrud = this.addCrud.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.viewVisitorCommunityProfile = this.viewVisitorCommunityProfile.bind(this);
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
    this.props.deleteCrud("form", "visitors", id);
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
    this.props.history.push(`/admin/visitor-form/${data.id}`);
  }

  changePassword = (data) => {
    this.props.openModal({
      open: true,
      title: "Update Visitor Password",
      component: <PasswordForm id={data.id} actionFor="visitor" />,
    });
  };

  addCrud() {
    this.props.history.push(`/admin/visitor-form/new`);
  }

  viewVisitorCommunityProfile(data) {
    this.props.history.push(`/admin/visitor-community-profile/${data.id}`)
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
        title: "LinkedIN",
        field: "register_from",
        render: (rowData) => {
          if (rowData.register_from == "Linkedin") {
            return "Linkedin";
          } else {
            return "WebApp";
          }
        },
      },

      {
        title: "Created Date",
        field: "updated_at",
        defaultSort: "desc",
      },
      TableAction(
        PermissionHelper.checkPermission("delete_visitors")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("edit_visitors")
          ? this.editCrud
          : null,false,
        PermissionHelper.checkPermission("update_visitor_password")
          ? this.changePassword
          : null,
        PermissionHelper.checkPermission("view_visitor_community_profile")
          ? this.viewVisitorCommunityProfile
          : null,
          ({ rowData }) => {
          return (
            <>
              {rowData.visitor_ip && rowData.visitor_ip != "" ? (
                <>
                  {rowData.is_blocked == 0 ? (
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        this.props.updateVisitor(
                          "UPDATE",
                          "visitors/block_status",
                          rowData.id,
                          {
                            is_blocked: true,
                          }
                        );
                      }}
                    >
                      Block
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => {
                        this.props.updateVisitor(
                          "UPDATE",
                          "visitors/block_status",
                          rowData.id,
                          {
                            is_blocked: false,
                          }
                        );
                      }}
                    >
                      Unblock
                    </Button>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          );
        }
      ),
    ];

    return (
      <GridContainer>
        <GridItem xs={12}>
          <MaterialDataTable
            title={title}
            columns={columns}
            addData={
              PermissionHelper.checkPermission("add_visitors")
                ? this.addCrud
                : null
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_visitors")
                ? this.deleteAll
                : null
            }
            url="visitors"
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
  getRole: crudActions._get,
  deleteCrud: crudActions._delete,
  showConfirm: confirmActions.show,
  clearConfirm: confirmActions.clear,
  openModal: modalActions.open,
  updateVisitor: crudActions._update,
};

export default connect(
  mapStateToProps,
  actionCreators
)(VisitorList);

import React from "react";
import { connect } from "react-redux";
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
// import PasswordForm from '../../PasswordForm';
import { PermissionHelper } from "_helpers";
import { Details } from "@material-ui/icons";
import { BLOG_STATUS } from "_constants/form.constants";
import { Link } from "@material-ui/core";
// import Link from 'next/dist/client/link';

const title = "Blog Lists";
export class BlogLists extends React.PureComponent {
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
        const ids = this.props.confirm.data.map((value) => value.id);
        this.props.deleteAllCrud("form", "blogs/delete_All", {
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
    this.props.deleteCrud("form", "blogs", id);
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
    this.props.history.push(`/admin/Blog-List-form/${data.id}`);
  }

  addCrud() {
    this.props.history.push(`/admin/Blog-List-form/new`);
  }

  export() {
    fileService._download("reports/blogreport");
  }

  render() {
    const columns = [
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Category",
        field: "blog_topic",
        render: (item) => (
          <Link href={`/admin/category-form/${item.blog_topic_id}`}>
            {item.blog_topic}
          </Link>
        ),
        url: "blogs",
        filterName: "blog_topic",
      },
      {
        title: "Details",
        field: "details",
        render: (data) => data.details.substring(0, 100),
      },
      {
        title: "Image",
        field: "image",
        filtering: false,
        render: (item) => <img src={item.image} width="50%" />,
      },
      {
        title: "Banner",
        field: "image",
        filtering: false,
        render: (item) => <img src={item.banner} width="50%" />,
      },
      {
        title: "Status",
        field: "status",
        // render:(data) => data.status === 2 ? 'Draft': data.status === 1 ? 'Active' : 'Inactive'
        lookupConstant: BLOG_STATUS,
      },
      {
        title: "Added Date",
        field: "created_at",
        defaultSort: "desc",
      },
      TableAction(
        PermissionHelper.checkPermission("delete_blog_manager")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("edit_blog_manager")
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
              PermissionHelper.checkPermission("add_blog_manager")
                ? this.addCrud
                : false
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_blog_manager")
                ? this.deleteAll
                : false
            }
            url="blogs"
            selection={true}
            grouping={false}
            defaultExpanded={true}
            refresh={true}
            serverSide={true}
            search={true}
            sorting={true}
            export={
              PermissionHelper.checkPermission("export_blog_manager")
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
)(BlogLists);

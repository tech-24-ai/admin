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
import { MONTH, DATA_SOURCE } from "_constants/form.constants";

const title = "Twitter data List";
class TwitterDataList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deleteCrud = this.deleteCrud.bind(this);
    this.addCrud = this.addCrud.bind(this);
    this.editCrud = this.editCrud.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.pullData = this.pullData.bind(this);
  }

  componentDidUpdate() {
    if (this.props.confirm.confirm) {
      if (this.props.confirm.data.length) {
        const ids = this.props.confirm.data.map((value) => value.id);
        this.props.deleteAllCrud(
          "form",
          `twitter-data/${this.props.match.params}/delete_all`,
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
    this.props.deleteCrud(
      "form",
      `twitter-data/${this.props.match.params}`,
      id
    );
  };

  deleteCrud(data) {
    this.props.showConfirm(
      "Confirm",
      `Are you sure want to delete ${data.id} ?`,
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
      `${this.getBasePath()}/twitter-data-form/${data.id}`
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
    this.props.history.push(`${this.getBasePath()}/twitter-data-form/new`);
  }

  pullData() {
    this.props.pullData(
      "form",
      `twitter-data/${this.props.match.params.id}/fetch`
    );
  }

  render() {
    const columns = [
      {
        title: "Tweet Count",
        field: "tweet_count",
      },
      {
        title: "Retweet Count",
        field: "retweet_count",
      },
      {
        title: "Like Count",
        field: "like_count",
      },
      {
        title: "Reply Count",
        field: "reply_count",
      },
      // {
      //   title: "Quote Count",
      //   field: "quote_count",
      // },
      {
        title: "Number of followers",
        field: "number_followers",
      },
      {
        title: "Mentions",
        field: "mention_count",
      },
      // {
      //   title: "Sentiment",
      //   field: "sentiment",
      // },

      {
        title: "Source",
        field: "is_api_extracted",
        lookupConstant: DATA_SOURCE,
      },
      {
        title: "Year",
        field: "year",
        lookupConstant: YEAR(),
      },
      {
        title: "Month",
        field: "month",
        lookupConstant: MONTH,
      },
      TableAction(
        PermissionHelper.checkPermission("delete_vendor_twitter_data")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("edit_vendor_twitter_data")
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
              PermissionHelper.checkPermission("add_vendor_twitter_data")
                ? this.addCrud
                : false
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_vendor_twitter_data")
                ? this.deleteAll
                : false
            }
            pullData={
              PermissionHelper.checkPermission("fetch_vendor_twitter_data")
                ? this.pullData
                : null
            }
            url={`twitter-data/${this.props.match.params.id}`}
            selection={true}
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
  pullData: crudActions._getAllWithParam,
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
)(TwitterDataList);

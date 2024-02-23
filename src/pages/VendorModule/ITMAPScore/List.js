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

const title = "Tech24 Score List";
class ITMAPScore extends React.PureComponent {
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
        this.props.deleteAllCrud(
          "form",
          `itmap-scores/${this.props.match.params}/delete_all`,
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
      `itmap-scores/${this.props.match.params}`,
      id
    );
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
    this.props.history.push(
      `${this.getBasePath()}/itmap-score-form/${data.id}`
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
    this.props.history.push(`${this.getBasePath()}/itmap-score-form/new`);
  }

  render() {
    const columns = [
      {
        title: "Overall Score",
        field: "overall_score",
      },
      {
        title: "Vendor Visiblity Score",
        field: "vendor_visiblity_score",
      },
      {
        title: "Vendor Visiblity Score System",
        field: "vendor_visiblity_score_system",
      },
      {
        title: "Short Term Technology Score",
        field: "short_term_technology_score",
      },
      {
        title: "Long Term Technology Score",
        field: "long_term_technology_score",
      },
      {
        title: "Innovation Value Score",
        field: "innovation_value_score",
      },
      {
        title: "Year",
        field: "year",
        lookupConstant: YEAR(),
      },
      TableAction(
        PermissionHelper.checkPermission("delete_vendor_itmap_score")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("edit_vendor_itmap_score")
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
              PermissionHelper.checkPermission("add_vendor_itmap_score")
                ? this.addCrud
                : false
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_vendor_itmap_score")
                ? this.deleteAll
                : false
            }
            url={`itmap-scores/${this.props.match.params.id}`}
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
)(ITMAPScore);

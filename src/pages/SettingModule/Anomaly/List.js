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
import { PermissionHelper } from "_helpers";
import { ANOMALY_STATUS } from "_constants/form.constants";

const title = "Anomaly List";
class AnomalyList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.editCrud = this.editCrud.bind(this);
  }

  editCrud(data) {
    this.props.history.push(`/admin/anomaly-form/${data.id}`);
  }

  render() {
    const columns = [
      {
        title: "Vendor",
        field: "vendors.name",
      },
      {
        title: "Table Name",
        field: "table_name",
      },
      {
        title: "Field",
        field: "fields",
      },

      {
        title: "Error",
        field: "errors",
      },
      {
        title: "Status",
        field: "current_status",
        lookupConstant: ANOMALY_STATUS,
      },
      {
        title: "Detected Date",
        field: "detected_datetime",
        defaultSort: "desc"
      },
      {
        title: "Fixed Descriptions",
        field: "descriptions",
      },
      TableAction(
        null,
        PermissionHelper.checkPermission("edit_settings") ? this.editCrud : null
      ),
    ];

    return (
      <GridContainer>
        <GridItem xs={12}>
          <MaterialDataTable
            title={title}
            columns={columns}
            url="anomaly"
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
)(AnomalyList);

import React from "react";
import { connect } from "react-redux";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions } from "../../../_actions";
import { PermissionHelper } from "_helpers";

const title = "Question & Options Search Report";
class Report extends React.PureComponent {
  render() {
    const columns = [
      {
        title: "Visitor",
        field: "visitor",
      },
      {
        title: "Question",
        field: "question",
      },
      {
        title: "Option",
        field: "option",
      },
      {
        title: "Time taken(Seconds)",
        field: "time",
      },
      {
        title: "Date",
        field: "created_at",
        defaultSort: "desc",
        // defaultGroupOrder: 0,
      },
    ];

    return (
      <GridContainer>
        <GridItem xs={12}>
          <MaterialDataTable
            title={title}
            columns={columns}
            url="reports/options"
            selection={false}
            exportButton={PermissionHelper.checkPermission("export_question_reports")
            ? true
            : false}
            grouping={true}
            defaultExpanded={true}
            refresh={true}
            serverSide={true}
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
  deleteCrud: crudActions._delete,
  showConfirm: confirmActions.show,
  clearConfirm: confirmActions.clear,
};

export default connect(
  mapStateToProps,
  actionCreators
)(Report);

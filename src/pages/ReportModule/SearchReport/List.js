import React from "react";
import { connect } from "react-redux";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions } from "../../../_actions";
import { PermissionHelper } from "_helpers";

const title = "Search Report";
class Report extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deleteAll = this.deleteAll.bind(this);
  }

  componentDidUpdate() {
    if (this.props.confirm.confirm) {
      this.deleteData();
      this.props.clearConfirm();
    }
  }

  deleteData = () => {
    this.props.deleteCrud("form", "search_reports");
  };

  deleteAll() {
    this.props.showConfirm("Confirm", `Are you sure want to delete all data?`);
  }

  render() {
    const columns = [
      {
        title: "Category",
        field: "category",
      },
      {
        title: "Module",
        field: "module",
      },
      {
        title: "Visitor",
        field: "visitor",
      },
      {
        title: "Total Question",
        field: "__meta__.questions_count",
      },
      {
        title: "Total Products",
        field: "__meta__.products_count",
      },
      {
        title: "Date",
        field: "created_at",
        defaultSort: "desc",
      },
    ];

    return (
      <GridContainer>
        <GridItem xs={12}>
          <MaterialDataTable
            title={title}
            columns={columns}
            url="search_reports"
            selection={false}
            exportButton={PermissionHelper.checkPermission("export_search_reports")
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

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

const title = "Market Product";
class ConfigList extends React.PureComponent {
  constructor(props) {
    super(props);
    //this.deleteCrud = this.deleteCrud.bind(this);
    //this.addCrud = this.addCrud.bind(this);
    this.editCrud = this.editCrud.bind(this);
    //this.deleteAll = this.deleteAll.bind(this);
  }

  editCrud(data) {
    this.props.history.push(`/admin/market-product-form/${data.id}`);
  }

  render() {
    const columns = [
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Description",
        field: "description",
      },
      {
        title: "Type",
        field: "type",
      },
      {
        title: "Category",
        field: "category",
      },
      {
        title: "Paypal ID",
        field: "paypal_product_id",
      },
      {
        title: "Home Url",
        field: "home_url",
      },
      {
        title: "Added Date",
        field: "created_at",
      },
      TableAction(null, null),
    ];

    return (
      <GridContainer>
        <GridItem xs={12}>
          <MaterialDataTable
            title={title}
            columns={columns}
            addData={false}
            deleteAll={false}
            url="market-product"
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
  showConfirm: confirmActions.show,
  clearConfirm: confirmActions.clear,
  openModal: modalActions.open,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default connect(
  mapStateToProps,
  actionCreators
)(ConfigList);

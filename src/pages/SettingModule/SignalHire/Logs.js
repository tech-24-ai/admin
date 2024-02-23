import React from "react";
import { connect } from "react-redux";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions, modalActions } from "../../../_actions";
import PasswordForm from "../../PasswordForm";
import Link from '@material-ui/core/Link';
// import { Modal } from "antd";
import Modal from "@material-ui/core/Modal";

const title = "Signal Hire Logs";
class NubelaLogsList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deleteCrud = this.deleteCrud.bind(this);
    this.editCrud = this.editCrud.bind(this);
    this.addCrud = this.addCrud.bind(this);
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
    this.props.history.push(`/visitors/signalhire-logs/${data.id}`);
  }

  changePassword = (data) => {
    this.props.openModal({
      open: true,
      title: "Update Visitor Password",
      component: <PasswordForm id={data.id} actionFor="visitor" />,
    });
  };

  addCrud() {
    this.props.history.push(`/visitors/ips/new`);
  }

  toggleModal(log){
    this.props.openModal({
      open: true,
      component: log,
    });
  }

  render() {
    const columns = [
      {
        title: "Triggered By",
        field: "name",
        render: (item) => (item.name ? <>{item.name}</> : "SYSTEM"),
      },
      {
        title: "Type",
        field: "type",
        render: (item) => item.type.replace(/_/g, " "),
      },
      {
        title: "Log",
        field: "logs",
        // render:(item)=>item.logs
        render: (item) => <div>{item.logs.substring(1,100)} <span><Link onClick={()=>this.toggleModal(item.logs)} href="javascript:">... More</Link></span></div>
      },
      {
        title: "Date",
        field: "created_at",
      },
    ];

    return (
      <GridContainer>
        <GridItem xs={12}>
          <MaterialDataTable
            title={title}
            columns={columns}
            url="visitors/signalhire-logs"
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
)(NubelaLogsList);

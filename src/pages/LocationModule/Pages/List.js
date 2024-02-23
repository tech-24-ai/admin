import React from "react";
import { connect } from 'react-redux';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions } from '../../../_actions';
import { TableAction } from '../../../material-table/TableAction';
import { PermissionHelper } from '_helpers';

const title = 'Page'
class PageList extends React.PureComponent {
    constructor(props) {
        super(props)
        //this.deleteCrud = this.deleteCrud.bind(this);
        this.addCrud = this.addCrud.bind(this);
        this.editCrud = this.editCrud.bind(this);
        //this.deleteAll = this.deleteAll.bind(this);
    }

    componentDidUpdate() {
        if (this.props.confirm.confirm) {
            if (this.props.confirm.data.length) {
                this.props.confirm.data.map(value => this.deleteData(value.id))
            } else {
                if (this.props.confirm.data.id) {
                    this.deleteData(this.props.confirm.data.id);
                }
            }
            this.props.clearConfirm();
        }
    }

    /*deleteData = (id) => {
        this.props.deleteCrud('form', 'pages', id);
    }

    deleteCrud(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.name} ?`, data)
    }

    deleteAll(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.length} row ?`, data)
    }*/

    editCrud(data) {
        this.props.history.push(`/admin/page-form/${data.id}`)
    }

    addCrud() {
        this.props.history.push(`/admin/page-form/new`)
    }


    render() {
        const columns = [
            {
                title: "Name",
                field: "name"
            },
            {
                title: "Type",
                field: "type"
            },
            {
                title: "Date",
                field: "updated_at"
            },
            TableAction(null, PermissionHelper.checkPermission('edit_pages') ? this.editCrud : null)
        ]
 


        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        addData={
                            PermissionHelper.checkPermission("add_pages")
                            ? this.addCrud
                            : false
                        }
                        //deleteAll={this.deleteAll}
                        url='pages'
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
}

const actionCreators = {
    getRole: crudActions._get,
    deleteCrud: crudActions._delete,
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
}

export default connect(mapStateToProps, actionCreators)(PageList);
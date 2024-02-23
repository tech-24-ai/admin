import React from 'react';
import { connect } from 'react-redux';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions, modalActions, loaderActions } from '../../../_actions';
import { fileService } from '../../../_services/file.service';
import { TableAction } from '../../../material-table/TableAction'
// import PasswordForm from '../../PasswordForm';
import { PermissionHelper } from '_helpers';

const title = "Blog Category"
export class BlogCategory extends React.PureComponent {
    constructor(props) {
        super(props)
        this.deleteCrud = this.deleteCrud.bind(this);
        this.addCrud = this.addCrud.bind(this);
        this.editCrud = this.editCrud.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }      

    componentDidUpdate() {
        if(this.props.confirm.confirm) {
            if(this.props.confirm.data.length) {
                const ids = this.props.confirm.data.map(value => value.id)
                this.props.deleteAllCrud('form', 'blog_topics/delete_All', { ids: JSON.stringify(ids) });
            } else {
                if (this.props.confirm.data.id) {
                    this.deleteData(this.props.confirm.data.id);
                }
            }
            this.props.clearConfirm()
        }
    }

    deleteData = (id) => {
        this.props.deleteCrud('form', 'blog_topics', id);
    }

    deleteCrud(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.name} ?`, data)
    }

    deleteAll(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.length} row ?`, data)
    }

    editCrud(data) {
        this.props.history.push(`/admin/Blog-Category-form/${data.id}`)
    }

    addCrud() {
        this.props.history.push(`/admin/Blog-Category-form/new`)
    }
 

    render() {
        const columns = [ 
            {
                title: "Name",
                field: "name"
            },
            {
                title: "Added Date",
                field: "created_at"
            },
            TableAction(PermissionHelper.checkPermission('delete_mi_segment') ? this.deleteCrud : null, PermissionHelper.checkPermission('edit_mi_segment') ? this.editCrud : null)            
    ]


        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        addData={PermissionHelper.checkPermission('add_mi_segment') ? this.addCrud : false}
                        deleteAll={PermissionHelper.checkPermission('delete_mi_segment') ? this.deleteAll : false}
                        url='blog_topics'
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
    const {authentication, confirm} = state;
    const {user} = authentication;
    return {user, confirm};
}

const actionCreators = {
    getRole: crudActions._get,
    deleteCrud: crudActions._delete,
    deleteAllCrud: crudActions._deleteAll,
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
    openModal: modalActions.open,
    showLoader: loaderActions.show,
    hideLoader: loaderActions.hide,

}
    export default connect(mapStateToProps, actionCreators)(BlogCategory);


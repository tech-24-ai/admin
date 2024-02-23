import React from "react";
import { connect } from 'react-redux';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions } from '../../../_actions';
import { TableAction } from '../../../material-table/TableAction';
import { PermissionHelper, UserHelper } from '_helpers';
import { fileService } from "_services";

const title = 'Search log'
class SearchlogList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.deleteCrud = this.deleteCrud.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
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

    deleteData = (id) => {
        this.props.deleteCrud('form', 'consultants/search_logs', id);
    }

    deleteCrud(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.name} ?`, data)
    }

    deleteAll(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.length} row ?`, data)
    }


    render() {
        const { id } = this.props.match.params;
        const columns = [
            {
                title: "Consultant Name",
                field: "consultant.first_name"
            },
            {
                title: "Visitor Name",
                field: "visitor.name"
            },
            {
                title: "Date",
                field: "created_at"
            },
        ]

        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        url={`consultants/search_logs${UserHelper.isConsultant() || id == undefined
                                ? ""
                                : `?consultant_id=${this.props.match.params.id}`
                            }`}
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
    deleteCrud: crudActions._delete,
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
}

export default connect(mapStateToProps, actionCreators)(SearchlogList);
import React from "react";
import { connect } from 'react-redux';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions } from '../../../_actions';
import { TableAction } from '../../../material-table/TableAction';
import { PermissionHelper } from '_helpers';
import { fileService } from "_services";

const title = 'Donation History'
class DonationHistoryList extends React.PureComponent {
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
        this.props.deleteCrud('form', 'donation', id);
    }

    deleteCrud(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.name} ?`, data)
    }

    deleteAll(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.length} row ?`, data)
    }


    render() {
        const {donations} = this.props;
        const columns = [
            {
                title: "Visitor Name",
                field: "visitor.name"
            },
            {
                title: "Amount",
                field: "donation_amount"
            },
            {
                title: "Transaction Id",
                field: "transaction_details",
                render: (data) => {
                    try {
                        const transactionDetails = JSON.parse(data.transaction_details);
                        return transactionDetails.id;
                    } catch (error) {
                        return "N/A";
                    }
                }
            }, 
            {
                title: "Status",
                field: "transaction_details",
                render: (data) => {
                    try {
                        const transactionDetails = JSON.parse(data.transaction_details);
                        return transactionDetails.status;
                    } catch (error) {
                        return "N/A";
                    }
                }
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
                        url='donations'
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

export default connect(mapStateToProps, actionCreators)(DonationHistoryList);

import React from "react";
import { connect } from 'react-redux';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions, modalActions } from '../../../_actions';
import { TableAction } from '../../../material-table/TableAction';
import { PermissionHelper } from '_helpers';
import Link from "@material-ui/core/Link";
import { fileService } from "_services";

const title = 'Report Abuses'
class ReportAbusesList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.deleteCrud = this.deleteCrud.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.reportAbuseDetails = this.reportAbuseDetails.bind(this);
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

    toggleModal(log) {
        this.props.openModal({
            open: true,
             component: log,
        });
    }

    deleteData = (id) => {
        this.props.deleteCrud('form', 'report_abuse', id);
    }

    deleteCrud(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete?`, data)
    }

    deleteAll(data) {
        this.props.showConfirm('Confirm', `Are you sure want to delete ${data.length} row ?`, data)
    }

    reportAbuseDetails(data) {
        this.props.history.push(`/admin/report-abuse-view/${data.id}`)
    }

    render() {
        const columns = [            
            {
                title: "Report Abuse Type",
                field: "abuseType.name"
            },        
            {
                title: "Reason",
                field: "reason",
                render: (item) =>
                item.reason && (
                    <div>
                        {item.reason?.substring(0, 30)}{" "}
                        {item.reason.length > 30 &&
                            <span>
                                <Link
                                onClick={() => this.toggleModal(item.reason)}
                                href="javascript:"
                                >
                                ... More
                                </Link>
                            </span>
                        }
                    </div>
                ),
            },         
            {
                title: "Community",
                field: "community.name"
            },        
            {
                title: "Report By",
                field: "visitor.name"
            },
            {
                title: "Date",
                field: "updated_at"
            },
            TableAction(PermissionHelper.checkPermission('delete_report_abuses') ? this.deleteCrud : null, null, null, null, this.reportAbuseDetails)
        ]

        return (
            <GridContainer>
                <GridItem xs={12}>
                    <MaterialDataTable
                        title={title}
                        columns={columns}
                        addData={false}
                        deleteAll={PermissionHelper.checkPermission('delete_report_abuses') ? this.deleteAll : false}
                        url='report_abuse'
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
    openModal: modalActions.open,
}

export default connect(mapStateToProps, actionCreators)(ReportAbusesList);
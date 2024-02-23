/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material ui icons
import MailOutline from "@material-ui/icons/Contacts";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from 'react-redux';
import { crudActions } from '../../../_actions';

import { crudService } from "../../../_services";

const useStyles = makeStyles((theme) => (styles));

const viewForm = (props) => {

    const classes = useStyles();
    const [state, setState] = useState({
        payment_transaction_id: '',
        transaction_amount: '',
        transaction_code: '-',
        transaction_date: '',
        transaction_status: '',
        users: ''
    });
    const [id] = useState(props && props.match.params && props.match.params.id);
    useEffect(() => {
        console.log(id);
        async function fetchData(id) {
            await crudService._get('mitransactions', id).then((response) => {
                if (response.status === 200) {
                    
                    if(response.data && response.data[0]){
                        setState(response.data[0])
                    }
                }
            })
        }
        fetchData(id)
    }, [])


    const goBack = () => {
        props.history.goBack();
    }



    return (
        <GridContainer justify="center">
            <GridItem xs={12} sm={8}>
                <Card>
                    <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                            <MailOutline />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Transaction Detail</h4>
                    </CardHeader>
                    <CardBody>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Code</TableCell>
                                        <TableCell align="right">{state.transaction_code}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">User's Name</TableCell>
                                        {
                                            state.users ? <TableCell align="right">{state.users.name}({state.users.email})</TableCell> : 
                                            <TableCell align="right">-</TableCell> 
                                        }
                                        
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">PaypalTransaction Id</TableCell>
                                        <TableCell align="right">{state.payment_transaction_id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Amount</TableCell>
                                        <TableCell align="right">{state.transaction_amount}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Transaction Status</TableCell>
                                        <TableCell align="right">{state.transaction_status}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Transaction Date</TableCell>
                                        <TableCell align="right">{moment(state.transaction_date).format('YYYY-MM-DD')}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}

const mapStateToProps = (state) => {
    const { form, confirm } = state;
    return {
        form,
        confirm
    };
}

const actionCreators = {
    getData: crudActions._get,
    createData: crudActions._create,
    updateData: crudActions._update,
};

export default (connect(mapStateToProps, actionCreators)(viewForm));

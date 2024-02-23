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


// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from 'react-redux';
import { crudActions } from '../../../_actions';

import { crudService } from "../../../_services";

const useStyles = makeStyles((theme) => (styles));

const Index = (props) => {

    const classes = useStyles();
    const [state, setState] = useState({
        contact_type_id: '',
        contact_type: '',
        organisation_name: '',
        requirement: '',
        company_address: '',
        website: '',
        domain_expertise: '',
        revenue_range: '',
        number_employees: '',
    });
    const [id] = useState(props && props.match.params && props.match.params.id);
    useEffect(() => {
        async function fetchData(id) {
            await crudService._get('contacts', id).then((response) => {
                if (response.status === 200) {
                    setState(response.data)
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
                        <h4 className={classes.cardIconTitle}>Contact Detail</h4>
                    </CardHeader>
                    <CardBody>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Contact Type</TableCell>
                                        <TableCell align="right">{state.contact_type}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Organisation Name</TableCell>
                                        <TableCell align="right">{state.organisation_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Requirement</TableCell>
                                        <TableCell align="right">{state.requirement}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Company Address</TableCell>
                                        <TableCell align="right">{state.company_address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Website</TableCell>
                                        <TableCell align="right">{state.website}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Domain Expertise</TableCell>
                                        <TableCell align="right">{state.domain_expertise}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Revenue Range</TableCell>
                                        <TableCell align="right">{state.revenue_range}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Number Employees</TableCell>
                                        <TableCell align="right">{state.number_employees}</TableCell>
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

export default (connect(mapStateToProps, actionCreators)(Index));

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
import { crudActions, modalActions } from '../../../_actions';
import { crudService } from "../../../_services";
import { COMMUNITY_POST_STATUS, COMMUNITY_POST_DISCUSSION_STATUS } from "_constants/form.constants";
import Link from "@material-ui/core/Link";
import moment from "moment";

const useStyles = makeStyles((theme) => (styles));

const Index = (props) => {

    const classes = useStyles();
    const [state, setState] = useState({
        visitor: '',
        community: '',
        communityPost: '',
        communityPostReply: '',
        reason: '',
        updated_at: '',
    });
    const [id] = useState(props && props.match.params && props.match.params.id);
    useEffect(() => {
        async function fetchData(id) {
            await crudService._get('report_abuse', id).then((response) => {
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
            <GridItem xs={12} sm={10}>
                <Card>
                    <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                            <MailOutline />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Report Abuse Details</h4>
                    </CardHeader>
                    <CardBody>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell  style={{width: '20%'}} component="th" scope="row">Created on</TableCell>
                                        <TableCell align="left">{moment(state.updated_at).format("DD-MM-YYYY")}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell  style={{width: '20%'}} component="th" scope="row">Report By</TableCell>
                                        <TableCell align="left">{state.visitor.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell  style={{width: '20%'}} component="th" scope="row">Report Abuse Type</TableCell>
                                        <TableCell align="left">{state.abuseType?.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell  style={{width: '20%'}} component="th" scope="row">Reason</TableCell>
                                        <TableCell align="left">{state.reason}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell  style={{width: '20%'}} component="th" scope="row">Community Title</TableCell>
                                        <TableCell align="left">{state.community.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell  style={{width: '20%'}} component="th" scope="row">Question</TableCell>
                                        <TableCell align="left">
                                            {state.communityPost.title}
                                            <hr style={{margin: "10px 0"}} />
                                            <div dangerouslySetInnerHTML={{ __html: state.communityPost.description }} />
                                            <h6 style={{color: "#aaaaaa"}}><br />Created By {state.communityPost?.visitor?.name} On {moment(state.communityPost?.created_at).format("DD-MM-YYYY")}</h6>
                                        </TableCell>
                                    </TableRow>
                                    { state.communityPostReply && (
                                        <TableRow>
                                            <TableCell  style={{width: '20%'}} component="th" scope="row">{ state.reply_type == 2 ? ( "Comment" ) : ("Answer")  }</TableCell>
                                            <TableCell align="left">
                                                <div dangerouslySetInnerHTML={{ __html: state.communityPostReply?.description }} />
                                                { state.reply_type == 2 ? (
                                                    <h6 style={{color: "#aaaaaa"}}><br />Comment By {state.communityPostReply?.visitor?.name} On {moment(state.communityPostReply?.created_at).format("DD-MM-YYYY")}</h6>
                                                ) : (
                                                    <h6 style={{color: "#aaaaaa"}}><br />Reply By {state.communityPostReply?.visitor?.name} On {moment(state.communityPostReply?.created_at).format("DD-MM-YYYY")}</h6>    
                                                )} 
                                            </TableCell>
                                        </TableRow>
                                    )}    
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

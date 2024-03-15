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
        communityPost: {},
        visitor: '',
        description: '',
        parentData: '',
        __meta__: '',
        status: '',
        is_correct_answer: '',
    });
    const [id] = useState(props && props.match.params && props.match.params.id);
    useEffect(() => {
        async function fetchData(id) {
            await crudService._get('community/posts_reply', id).then((response) => {
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

    function toggleModal(log) {
        props.openModal({
          open: true,
          component: log,
        });
    }
    
    let replyStatus = '';
    if(state.status) {
        replyStatus = COMMUNITY_POST_STATUS.find((item) => {
            return item.id == state.status;
        });
    }

    let isCorrectAnswer = '';
    if(state.is_correct_answer) {
        isCorrectAnswer = COMMUNITY_POST_DISCUSSION_STATUS.find((item) => {
            return item.id == state.is_correct_answer;
        });
    }
    return (
        <GridContainer justify="center">
            <GridItem xs={12} sm={10}>
                <Card>
                    <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                            <MailOutline />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Community Post Reply Details</h4>
                    </CardHeader>
                    <CardBody>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell  style={{width: '20%'}} component="th" scope="row">Replied on</TableCell>
                                        <TableCell align="left">{moment(state.created_at).format("DD-MM-YYYY")}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell  style={{width: '20%'}} component="th" scope="row">Community Title</TableCell>
                                        <TableCell align="left">{state.communityPost?.community?.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell  style={{width: '20%'}} component="th" scope="row">Post Title</TableCell>
                                        <TableCell align="left">{state.communityPost.title}</TableCell>
                                    </TableRow>
                                    {state.parentData?.description && 
                                        <TableRow>
                                            <TableCell  style={{width: '20%'}} component="th" scope="row">In Reply to</TableCell>
                                            <TableCell align="left">
                                                <Link
                                                onClick={() => toggleModal(state.parentData?.description)}
                                                href="javascript:"
                                                >{state.parentData.visitor.name}'s post on {moment(state.parentData.created_at).format("DD-MM-YYYY")}
                                                </Link>
                                            </TableCell>                                            
                                        </TableRow>
                                    }    
                                    <TableRow>
                                        <TableCell  style={{width: '20%'}} component="th" scope="row">Reply</TableCell>
                                        <TableCell align="left">{state.description}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell  style={{width: '20%'}} component="th" scope="row">Visitor Name</TableCell>
                                        <TableCell align="left">{state.visitor.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell  style={{width: '20%'}} component="th" scope="row">Total Helpful</TableCell>
                                        <TableCell align="left">{state.__meta__.total_helpful}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell  style={{width: '20%'}} component="th" scope="row">Status</TableCell>
                                        <TableCell align="left">{replyStatus.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell  style={{width: '20%'}} component="th" scope="row">Correct Answer</TableCell>
                                        <TableCell align="left">{isCorrectAnswer.name}</TableCell>
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
    openModal: modalActions.open,
};

export default (connect(mapStateToProps, actionCreators)(Index));

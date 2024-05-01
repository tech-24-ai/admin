/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

import { connect } from 'react-redux';
import { crudActions, modalActions, alertActions } from '../_actions';
import { crudService } from "../_services";

import SimpleReactValidator from 'simple-react-validator';
import Link from "@material-ui/core/Link";

const initialState = {
    btnText: 'Update',
    form: {
        password: '',
        confirm: '',
    },
}

const qs = require('querystring')

class GoogleDrive extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = initialState
    }

    bindData = () => {
        // const { code } = this.props.match.params;
        // console.log("params = ", this.props.match.params);
        const code = new URLSearchParams(window.location.search).get("code")
        console.log("code ", code);
        let data = {
            code : code
        }
        let url = `auth/google/callback?code=${code}&scope=https://www.googleapis.com/auth/drive`;
        if (code) {
          crudService._getAllWithParam(url).then((response) => {
            console.log("response", response)
            if (response.data.status == 200) {
                this.props.showSuccess(response.data.message);
                return false;
            } else {
                this.props.showError(response.data.message);
                return false;
            }
          });
        }
    };

    componentDidMount() {
        this.bindData();
    }

    render() {

        let driveClientId = process.env.DRIVE_CLIENT_ID;
        let redirectURL = process.env.DRIVE_REDIRECT_URI;

        const queryParams = {
        client_id: '380501766660-r8mv8e8oj3l7r0ihbpbi0erll90mnv51.apps.googleusercontent.com',
        redirect_uri: 'http://localhost:3001/admin/google-drive-callback',
        scope: 'https://www.googleapis.com/auth/drive',
        response_type: 'code',
        access_type: 'offline'
        }
        const authUrl = `https://accounts.google.com/o/oauth2/auth?${qs.stringify(queryParams)}`

        console.log("quesry param =", queryParams)
        console.log("authUrl =", authUrl)

        return (
            <GridContainer justify="center">
                <GridItem xs={12} sm={8}>
                <Card>
                    <CardHeader color="primary" icon>
                    <h4 className="">Google Authentication</h4>
                    </CardHeader>
                    <CardBody>
                        <span>
                            <Link
                            title="Mark as Correct Answer"
                            href={authUrl}
                            style={{paddingRight: 5}}
                            >
                                Connect Google Drive
                            </Link>
                        </span>
                    </CardBody>
                </Card>
                </GridItem>
            </GridContainer>
        )
    }

}

function mapState(state) {
    const { confirm } = state;
    return {
        confirm
    };
}

const actionCreators = {
    update: crudActions._update,
    closeModal: modalActions.close,
    showError: alertActions.error,
    showSuccess: alertActions.success,
};

export default withStyles(styles)(connect(mapState, actionCreators)(GoogleDrive));
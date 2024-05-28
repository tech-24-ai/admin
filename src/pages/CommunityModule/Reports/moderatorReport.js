/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

// material ui icons
import MailOutline from "@material-ui/icons/Business";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import MyForm from "components/Form";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from 'react-redux';
import { crudActions } from '../../../_actions';
import { crudService } from "../../../_services";
import SimpleReactValidator from 'simple-react-validator';
import { fileService } from "../../../_services/file.service";
import moment from "moment";

const initialState = {
    id: 'new',
    form: {
        moderator_id: '',
        community_id: '',
    },
}
class moderatorReport extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = initialState

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }


    handleInputChange(event) {
        const newState = Object.assign({}, this.state);
        newState.form[event.target.name] = event.target.value;
        this.setState(newState);
        this.handleError();
    }

    getFormFields = () => {
        const { form } = this.state
        const formFields = [
            {
                name: "moderator_id",
                label: "All Moderators",
                type: "time_zone_autocomplete",
                url: "getModeratorLists",
                getOptionLabel: ["name"],
                getOptionValue: "id",
                value: form.visitor_id || "",
            },
            {
                name: "community_id",
                label: "All Discussion Group",
                type: "time_zone_autocomplete",
                url: "community",
                getOptionLabel: ["name"],
                getOptionValue: "id",
                value: form.visitor_id || "",
            },
        ]

        return formFields
    }

    handleError() {
        this.validator.showMessages();
        this.forceUpdate();
    }

    resetForm = () => {
        window.location.reload();
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let moderator_id = this.state.form.moderator_id;
        let community_id = this.state.form.community_id;

        const fileName = "moderator_report-" + moment().format("DD-MM-YYYY") + ".xlsx";
        this.props.downloadDocument(
            "",
            fileName,
            `generateModeratorReport?moderator_id=${moderator_id}&community_id=${community_id}`
        );
    }

    render() {
        const { classes } = this.props;
        const { id } = this.props.match.params
        let title = 'Moderator Report'
        let btnText = 'Generate'
        
        return (
            <GridContainer justify="center">
                <GridItem xs={12} sm={7}>
                    <Card>
                        <CardHeader color="primary" icon>
                            <CardIcon color="primary">
                                <MailOutline />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>{title}</h4>
                        </CardHeader>
                        <CardBody>
                            <MyForm
                                handleInputChange={this.handleInputChange}
                                formFields={this.getFormFields()}
                                handleSubmit={this.handleSubmit}
                                handleReset={this.resetForm}
                                btnText={btnText}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }

}

moderatorReport.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { form, confirm } = state;
    return {
        form,
        confirm
    };
}

const actionCreators = {
    getCrud: crudActions._get,
    clearCrud: crudActions._clear,
    create: crudActions._create,
    update: crudActions._update,
    downloadDocument: crudActions._downloadPostAttachment,
};

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(moderatorReport));
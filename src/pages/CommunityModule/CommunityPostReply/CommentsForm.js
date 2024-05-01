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
import { COMMUNITY_POST_STATUS, COMMUNITY_POST_DISCUSSION_STATUS } from "_constants/form.constants";
// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from 'react-redux';
import { crudActions } from '../../../_actions';
import { crudService } from "../../../_services";
import SimpleReactValidator from 'simple-react-validator';

const initialState = {
    id: 'new',
    form: {
        communityPost: '',
        description: '',
        status: ''
    },
}

class CommunityPostReplyCommentForm extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = initialState

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    handleInputChange(event) {
        const newState = Object.assign({}, this.state);
        if (!!event.target) {
            newState.form[event.target.name] = event.target.value;
        } else {
            newState.form["description"] = event;
        }
        this.setState(newState);
        this.handleError();
    }

    getFormFields = () => {
        const { form } = this.state;
        const formFields = [
            // {
            //     name: "title",
            //     label: "Query Title",
            //     type: "textbox",
            //     value: form.communityPost.title || "",
            //     icon: "assignment",
            //     disabled: true,
            //     readonly: true,
            // },
            {
                name: "description",
                label: "Comment",
                type: "editor",
                value: form.description || "",
                icon: "assignment",
                disabled: true,
                readonly: true,
            },
            {
                name: "status",
                label: "Status",
                type: "select",
                options: COMMUNITY_POST_STATUS,
                value: form.status || "",
                icon: "assignment",
                error: this.validator.message("status", form.status, ""),
            },
        ]

        return formFields
    }

    handleError() {
        this.validator.showMessages();
        this.forceUpdate();
    }

    resetForm = () => {
        const { form } = this.state
        const formFields = this.getFormFields()
        if (formFields) {
            formFields.forEach(element => {
                form[element.name] = null
            });
        }
        this.setState(form)
        this.props.clearCrud('form')
    }

    goBack = () => {
        // this.resetForm();
        this.props.history.goBack();
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            let data = {
                status: this.state.form.status,
            }
            const { id } = this.props.match.params
            // this.props.update('formData', 'community/posts_reply_comments/status_update', id, data)

            crudService._update("community/posts_reply_comments/status_update", id, data).then((response) => {
                if (response.status === 200) {
                //   this.resetForm();
                  this.goBack();
                }
            });
        } else {
            this.handleError();
        }
    }

    bindData = () => {
        const { id } = this.props.match.params
        if (id && id !== 'new') {
            crudService._get('community/posts_reply', id).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        form: response.data,
                    })
                }
            })
        }
    }

    componentDidMount() {
        this.bindData();
    }

    render() {
        const { classes } = this.props;
        const { id } = this.props.match.params
        let title = 'Update Comment Status'
        let btnText = 'Update'

        return (
            <GridContainer justify="center">
                <GridItem xs={12} sm={8}>
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
                                handleCancel={this.goBack}
                                btnText={btnText}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

CommunityPostReplyCommentForm.propTypes = {
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
};

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(CommunityPostReplyCommentForm));
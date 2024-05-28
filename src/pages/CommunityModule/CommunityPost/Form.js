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
import { crudActions, loaderActions } from '../../../_actions';
import { crudService } from "../../../_services";
import SimpleReactValidator from 'simple-react-validator';

const initialState = {
    id: 'new',
    form: {
        title: '',
        description: '',
        status: '',
        is_discussion_open: '',
        reject_reason: '',
        postTags: [],
    },
}

class CommunityPostForm extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = initialState

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    handleInputChange(event) {
        const newState = Object.assign({}, this.state);
        if (!!event.target) 
        {
            if(event.target.name == 'status') {
                newState.form[event.target.name] = event.target.value;
                newState.form['reject_reason'] = "";
            }
            else {
                newState.form[event.target.name] = event.target.value;
            }    
        } else {
            newState.form["description"] = event;
        }
        
        this.setState(newState);
        this.handleError();
    }

    getFormFields = () => {
        const { form } = this.state
        const formFields = [
            {
                name: "title",
                label: "Query Title",
                type: "textbox",
                value: form.title || "",
                icon: "assignment",
            },
            {
                name: "description",
                label: "Query Description",
                type: "editor",
                value: form.description || "",
                icon: "assignment",
            },
            {
                name: "attachment",
                label: "Attachments",
                type: "post_attachments",
                values: form.attachments
            },
            {
                name: "postTags",
                label: "Tags",
                type: "multi_autocomplete",
                url: `community/tags`,
                getOptionLabel: "name",
                getOptionValue: "id",
                value: form.postTags || "",
                icon: "assignment",
            },
            {
                name: "status",
                label: "Status",
                type: "select",
                options: COMMUNITY_POST_STATUS,
                value: form.status || "",
                icon: "assignment",
                error: this.validator.message("status", form.status, "required"),
            },
            {
                name: "is_discussion_open",
                label: "Discussion Open",
                type: "select",
                options: COMMUNITY_POST_DISCUSSION_STATUS,
                value: form.is_discussion_open || "",
                icon: "assignment",
                error: this.validator.message("is_discussion_open", form.is_discussion_open, "required"),
            },
        ]

        if(form.status == 2)
        {
            formFields.push(
                {
                    name: "reject_reason",
                    label: "Reject Reason",
                    type: "textbox",
                    value: form.reject_reason || "",
                    icon: "assignment",
                    error: this.validator.message("reason", form.reject_reason, "required"),
                }
            )
        }

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
        this.resetForm();
        this.props.history.push('/admin/community-posts')
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.props.showLoader();
            
            const post_tags = this.state.form.postTags.map(
                (option) => option.id
            );

            let data = {
                title: this.state.form.title,
                description: this.state.form.description,
                status: this.state.form.status,
                is_discussion_open: this.state.form.is_discussion_open,
                postTags: JSON.stringify(post_tags),
                reject_reason: this.state.form.reject_reason,
            }
            const { id } = this.props.match.params
            crudService._update("community/posts/status_update", id, data).then((response) => {
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
            crudService._get('community/posts', id).then((response) => {
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
        let title = 'Update Query Status'
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

CommunityPostForm.propTypes = {
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
    showLoader: loaderActions.show,
    hideLoader: loaderActions.hide,
};

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(CommunityPostForm));
/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";

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
import { crudActions, alertActions } from '../../../_actions';

import SimpleReactValidator from 'simple-react-validator';
import { crudService } from "../../../_services";

const initialState = {
    id: 'new',
    modules: null,
    form: {
        category_id: '',
        category: '',
        module_id: '',
        module: '',
        is_advanced: '',
        step_id: '',
        question_id: '',
        name: '',
        notes: '',
    },
    dynamicForm: [],
}
class FlowForm extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = initialState

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    handleInputChange(event) {
        const newState = Object.assign({}, this.state);

        if (event.target.type == 'checkbox') {
            newState.form[event.target.name] = event.target.checked;
        } else {
            newState.form[event.target.name] = event.target.value;
        }

        this.setState(newState);
        this.handleError();
    }


    getFormFields = () => {
        const { form, dynamicForm } = this.state
        let formFieldData = null;

        if (form.question_id) {
            formFieldData = {
                question_id: form.question_id,
                is_advanced: form.is_advanced ? true : false
            }
        }

        const formFields = [
            {
                name: 'name',
                label: 'Name',
                type: 'textbox',
                value: form.name || '',
                icon: 'assignment',
                error: this.validator.message('name', form.name, 'required')
            },
            {
                name: 'category_id',
                label: 'Choose Category',
                type: 'autocomplete',
                url: 'categories',
                getOptionLabel: 'name',
                getOptionValue: 'id',
                value: form.category_id,
                option: { label: form.category, value: form.category_id },
                error: this.validator.message('category_id', form.category_id, 'required')
            },
            {
                name: 'module_id',
                label: 'Choose Module',
                type: 'group_autocomplete',
                url: 'modules/children_without_flow',
                getOptionLabel: 'name',
                getOptionValue: 'id',
                value: form.module_id,
                options: [
                    {
                        name: "category_id",
                        value: form.category_id
                    },
                    {
                        name: "edit",
                        value: true
                    }
                ],
                error: this.validator.message('module_id', form.module_id, 'required')
            },
            {
                name: 'notes',
                label: 'Notes',
                type: 'textarea',
                value: form.notes || '',
                icon: 'assignment',
                error: this.validator.message('notes', form.notes, 'min:1')
            },
            {
                name: 'questions',
                label: 'Questions',
                type: 'dynamicTableForm',
                formColumn: ['Question', 'Is advanced'],
                formData: dynamicForm,
                formFieldData: formFieldData,
                options: [
                    {
                        name: 'step_id',
                        label: 'Step',
                        type: 'autocomplete',
                        url: 'steps',
                        getOptionLabel: 'name',
                        getOptionValue: 'id',
                        value: form.step_id,
                    },
                    {
                        name: 'question_id',
                        label: 'Question',
                        type: 'autocomplete',
                        url: 'questions',
                        getOptionLabel: 'name',
                        getOptionValue: 'id',
                        value: form.question_id,
                        filters: {
                            step_id: form.step_id
                        },                        
                    },
                    {
                        name: 'is_advanced',
                        label: 'is advanced',
                        value: form.is_advanced,
                        type: 'checkbox',
                    }
                ],
            }

        ]

        return formFields
    }

    handleError() {
        this.validator.showMessages();
        this.forceUpdate();
    }


    goBack = () => {
        this.props.history.goBack();
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            let data = {
                name: this.state.form.name,
                module_id: this.state.form.module_id,
                notes: this.state.form.notes,
                questions: this.state.dynamicForm.length ? JSON.stringify(this.state.dynamicForm) : null,
            }
            const { id } = this.props.match.params
            if (id && id === 'new') {
                this.props.create('formData', 'flows', data)
            } else {
                this.props.update('formData', 'flows', id, data)
            }
            this.goBack();
        } else {
            this.handleError();
        }
    }

    addDynamicForm = (dynamicForm) => {
        this.setState({
            dynamicForm: dynamicForm
        });
    }

    removeDynamicForm = (dynamicForm) => {
        this.setState({
            dynamicForm: dynamicForm
        });
    }

    handleFormInputChange = (dynamicForm) => {
        this.setState({ dynamicForm: dynamicForm });
    }

    bindData = () => {
        const { id } = this.props.match.params
        if (id && id !== 'new') {
            crudService._get('flows', id).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        form: response.data,
                        dynamicForm: response.data.question ? response.data.question : [],
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
        let title = 'Add Flow'
        let btnText = 'Create'
        if (id && id !== 'new') {
            title = 'Edit Flow'
            btnText = 'Update'
        }
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
                                handleFormInputChange={this.handleFormInputChange}
                                addDynamicForm={this.addDynamicForm}
                                removeDynamicForm={this.removeDynamicForm}
                                dynamicForm={this.state.dynamicForm}
                                btnText={btnText}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

FlowForm.propTypes = {
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
    warningAlert: alertActions.warning,
};

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(FlowForm));
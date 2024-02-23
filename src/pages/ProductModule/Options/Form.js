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
import { crudActions } from '../../../_actions';
import { crudService } from "../../../_services";
import SimpleReactValidator from 'simple-react-validator';

const initialState = {
    id: 'new',
    form: {
        name: '',
        have_priority: false,
        have_sub_option: false,
    },
    dynamicForm: [],
    dynamicFormFields: {
        sub_option_id: '',
    },
}
class OptionForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = initialState

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    handleInputChange(event) {
        const newState = Object.assign({}, this.state);
        if (event.target.type === 'checkbox') {
            newState.form[event.target.name] = event.target.checked;
        } else {
            newState.form[event.target.name] = event.target.value;
        }
        this.setState(newState);
        this.handleError();
    }

    getFormFields = () => {
        const { sub_options } = this.props
        const { form } = this.state
        const formFields = []

        formFields.push({
            name: 'name',
            label: 'Title',
            type: 'textbox',
            value: form.name || '',
            error: this.validator.message('name', form.name, 'required|min:3')
        })

        formFields.push({
            name: 'have_sub_option',
            label: 'Have Sub Option',
            type: 'checkbox',
            value: form.have_sub_option,
            error: ''
        })

        if (form.have_sub_option) {
            formFields.push(
                {
                    name: 'options',
                    label: 'Sub Options',
                    type: 'dynamic',
                    value: [],
                    options: [
                        {
                            name: 'sub_option_id',
                            label: 'Sub Options',
                            type: 'select',
                            options: sub_options,
                        },
                    ],
                }
            )
        }

        formFields.push({
            name: 'have_priority',
            label: 'Have Priority',
            type: 'checkbox',
            value: form.have_priority,
            error: ''
        })

        return formFields
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
        this.props.history.goBack();
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            let data = {
                name: this.state.form.name,
                have_priority: this.state.form.have_priority,
                have_sub_option: this.state.form.have_sub_option,
                options: this.state.dynamicForm.length ? JSON.stringify(this.state.dynamicForm) : null,
            }
            const { id } = this.props.match.params
            if (id && id === 'new') {
                this.props.create('formData', 'options', data)
            } else {
                this.props.update('formData', 'options', id, data)
            }
            this.resetForm();
            this.goBack();
        } else {
            this.handleError();
        }
    }

    bindData = () => {
        const { id } = this.props.match.params
        if (id && id !== 'new') {
            crudService._get('options', id).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        form: response.data,
                        dynamicForm: response.data.subOption
                    })
                }
            })
        }
    }

    componentDidMount() {
        this.bindData();
        this.props.getAll('options', 'options', { pageSize: 100 })
        this.props.getAll('sub_options', 'sub_options', { pageSize: 100 })
    }

    render() {
        const { classes } = this.props;
        const { id } = this.props.match.params
        let title = 'Add Answer Options'
        let btnText = 'Create'
        if (id && id !== 'new') {
            title = 'Edit Answer Options'
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
                                dynamicFormFields={this.state.dynamicFormFields}
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

OptionForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { form, sub_options, confirm } = state;

    return {
        form,
        sub_options,
        confirm
    };
}

const actionCreators = {
    getAll: crudActions._getAll,
    getCrud: crudActions._get,
    clearCrud: crudActions._clear,
    create: crudActions._create,
    update: crudActions._update,
};

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(OptionForm));
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import MailOutline from "@material-ui/icons/Business";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js"; 
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import MyForm from "components/Form";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import { connect } from 'react-redux';
import { crudActions } from '../../../_actions';
import { crudService } from "../../../_services";

import SimpleReactValidator from 'simple-react-validator';

const initialState = {
    id: 'new',
    form: {
        key: '',
        value: ''
    }
}

class ConfigForm extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = initialState

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.validator = new SimpleReactValidator({autoForceUpdate: this});

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
                    name: 'key',
                    label: 'Key',
                    type: 'textbox',
                    readOnly: true,
                    disabled: true,
                    value: form.key || '',
                    icon: 'assignment',
                    error: this.validator.message('key', form.key, 'required|min:3')
                },
                {
                    name: 'value', 
                    label: 'Value',
                    type: 'textbox',
                    value: form.value || '',
                    icon: 'assignment',
                    error: this.validator.message('value', form.value, 'required|min:1')
                },
                

            ]

            return formFields
        }

        getValue(val) {
            
            const { id } = this.props.match.params;
            if (id && id === 'new') {
                return val;
            } else {

                if (null === val) {
                    return '';
                } else {
                    return val;
                }

            }
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
              key: this.state.form.faq_category_id,
              value: this.state.form.name

            }
            const { id } = this.props.match.params
            if (id && id === 'new') {
                this.props.create('formData', 'config', data)
            } else {
                this.props.update('formData', 'config', id, data)
            }
            this.resetForm();             
            this.goBack();
        } else {
            this.handleError();
        }
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

    bindData = () => {
        const { id } = this.props.match.params
        if (id && id !== 'new') {                        
            crudService._get('config', id).then((response) => {                
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
        let title = 'Add Config'
        let btnText = 'Create'
        if (id && id !== 'new') {
            title = 'Edit Config'
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
                                btnText={btnText}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }

}

ConfigForm.propTypes = {
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
    getAll: crudActions._getAll,
    getCrud: crudActions._get,
    clearCrud: crudActions._clear,
    create: crudActions._create,
    update: crudActions._update,
};
  

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(ConfigForm));

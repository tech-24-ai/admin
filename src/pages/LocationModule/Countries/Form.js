/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

// material ui icons
import MailOutline from "@material-ui/icons/Public";

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

import SimpleReactValidator from 'simple-react-validator';
import { crudService } from "../../../_services";


const initialState = {
    id: 'new',
    form: {
        group_id: '',
        name: '',
        sortname: '',
        phonecode: '',
        active: '',
    },
}
class CountryForm extends React.PureComponent {

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
            newState.form[event.target.name] = event.target.checked ? 'Active' : '';
        } else {
            newState.form[event.target.name] = event.target.value;
        }
        this.setState(newState);
        this.handleError();
    }


    handleError() {
        this.validator.showMessages();
        this.forceUpdate();
    }

    getFormFields = () => {
        const { form } = this.state
        const formFields = [
            {
                name: 'group_id',
                label: 'Country Group',
                type: 'autocomplete',
                url: 'country_groups',
                getOptionLabel: 'name',
                getOptionValue: 'id',
                value: form.group_id,
                option: { label: form.group, value: form.group_id },
                error: ''
            },
            {
                name: 'name',
                label: 'Country Name',
                type: 'textbox',
                value: form.name || '',
                icon: 'assignment',
                error: this.validator.message('name', form.name, 'required|min:3')
            },
            {
                name: 'sortname',
                label: 'Country Code (e.g. US)',
                type: 'textbox',
                value: form.sortname || '',
                error: this.validator.message('sortname', form.sortname, 'min:2')
            },
            {
                name: 'phonecode',
                label: 'Phonecode',
                type: 'textbox',
                value: form.phonecode || '',
                error: this.validator.message('phonecode', form.phonecode, 'min:1')
            },

            {
                name: 'active',
                label: 'Active',
                type: 'checkbox',
                value: form.active ? true : false,
                error: ''
            },
        ]

        return formFields
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
                group_id: this.state.form.group_id,
                name: this.state.form.name,
                sortname: this.state.form.sortname,
                phonecode: this.state.form.phonecode,
                group: this.state.form.group,
                active: this.state.form.active ? true : false,
            }
            const { id } = this.props.match.params
            if (id && id === 'new') {
                this.props.create('formData', 'countries', data)
            } else {
                this.props.update('formData', 'countries', id, data)
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
            crudService._get('countries', id).then((response) => {
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
        let title = 'Add New Country'
        let btnText = 'Create'
        if (id && id !== 'new') {
            title = 'Edit Country Details'
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

CountryForm.propTypes = {
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

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(CountryForm));
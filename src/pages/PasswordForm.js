/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

import MyForm from "components/Form";


// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

import { connect } from 'react-redux';
import { crudActions, modalActions } from '../_actions';

import SimpleReactValidator from 'simple-react-validator';

const initialState = {
    btnText: 'Update',
    form: {
        password: '',
        confirm: '',
    },
}

class PasswordForm extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = initialState

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            validators: {
                confirm: {
                    message: 'The :attribute must be a same as password',
                    required: true,
                    rule: (val, params, validator) => {
                        if (val === params[0]) {
                            return true
                        } else {
                            return false
                        }
                    }
                }
            }
        });
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
                name: 'password',
                label: 'New Password',
                type: 'password',
                value: form.password,
                icon: 'lock_outline',
                error: this.validator.message('password', form.password, 'required|min:6|max:20')
            },
            {
                name: 'confirm',
                label: 'Confirm New Password',
                type: 'password',
                value: form.confirm,
                icon: 'lock_outline',
                error: this.validator.message('confirm', form.confirm, `required|confirm:${form.password}|min:6|max:20`)
            },

        ]

        return formFields
    }

    handleError() {
        this.validator.showMessages();
        this.forceUpdate();
    }



    handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            let data = {
                password: this.state.form.password,
            }
            const { id, actionFor } = this.props
            if (actionFor == 'user') {
                this.props.update('user', 'users/change_password', id, data)
            }
            if (actionFor == 'visitor') {
                this.props.update('visitor', 'visitors/change_password', id, data)
            }
            if (actionFor == 'vendor') {
                this.props.update('vendor', 'vendors/change_password', id, data)
            }
            if (actionFor == 'investors') {
                this.props.update('investors', 'investors/change_password', id, data)
            }
            
            this.props.closeModal();
        } else {
            this.handleError();
        }
    }

    render() {
        const { btnText } = this.state;

        return (
            <MyForm
                handleInputChange={this.handleInputChange}
                formFields={this.getFormFields()}
                handleSubmit={this.handleSubmit}
                handleCancel={this.goBack}
                btnText={btnText}
            />
        );
    }

}

PasswordForm.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    actionFor: PropTypes.string.isRequired,
};

function mapState(state) {
    const { confirm } = state;
    return {
        confirm
    };
}

const actionCreators = {
    update: crudActions._update,
    closeModal: modalActions.close,
};

export default withStyles(styles)(connect(mapState, actionCreators)(PasswordForm));
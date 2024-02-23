/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

// material ui icons
import MailOutline from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import MyForm from "components/Form";


// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

import { connect } from 'react-redux';
import { crudActions } from '../../../_actions';
import { crudService } from "../../../_services";
import SimpleReactValidator from 'simple-react-validator';

const initialState = {
    id: 'new',
    form: {                
        name: '',
        email: '',
        mobile: '',
        password: '',
    },
}

class ProfileForm extends React.PureComponent {

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
                name: 'name',
                label: 'Name',
                type: 'textbox',
                value: form.name || '',
                icon: 'account_circle',
                error: this.validator.message('name', form.name, 'required|min:3')
            },            
            {
                name: 'email',
                label: 'Email',
                type: 'textbox',
                value: form.email || '',
                icon: 'email',
                error: this.validator.message('email', form.email, 'required|email')
            },
            {
                name: 'mobile',
                label: 'Mobile',
                type: 'textbox',
                value: form.mobile || '',
                icon: 'call',
                error: this.validator.message('mobile', form.mobile, 'required|min:10|max:15')
            },
            {
                name: 'password',
                label: 'Password',
                type: 'password',
                value: form.password || '',                
                error: this.validator.message('password', form.password, 'required|min:6|max:10')
            },
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
                email: this.state.form.email,
                mobile: this.state.form.mobile,
                password: this.state.form.password,
            }
            this.props.update('formData', 'user_profile', 'update', data)

            // this.goBack();
        } else {
            this.handleError();
        }
    }



    bindData = () => {
        crudService._get('user_profile', 'get').then((response) => {
            if (response.status === 200) {
                this.setState({
                    form: response.data,
                })
            }
        })
    }

    componentDidMount() {
        this.bindData();
    }

    render() {
        const { classes } = this.props;

        let title = 'Update Profile'
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

ProfileForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapState(state) {
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

export default withStyles(styles)(connect(mapState, actionCreators)(ProfileForm));
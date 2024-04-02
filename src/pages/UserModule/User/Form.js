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
        role_id: '',
        role: '',
        name: '',
        email: '',
        mobile: '',
        communities: []
    },
}

class UserForm extends React.PureComponent {

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
        
        if(event.target.name == 'role_id') {
            newState.form['role'] = event.target.label;
            newState.form['communities'] = [];
        }    
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
                name: 'role_id',
                label: 'Choose Role',
                type: 'autocomplete',
                url: 'roles',
                getOptionLabel: 'name',
                getOptionValue: 'id',
                value: form.role_id,
                option: { label: form.role, value: form.role_id },
                error: this.validator.message('role_id', form.role_id, 'required')
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
        ]

        if(form.role && form.role.toLowerCase().includes('moderator')) 
        {
            formFields.push({
                name: "communities",
                label: "Choose Community",
                type: "multi_autocomplete",
                url: `community`,
                getOptionLabel: "name",
                getOptionValue: "id",
                value: form.communities,
                error: this.validator.message("Communities", form.communities, "required"),
            });
        }
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
            const userCommunities = this.state.form.communities.map(
                (option) => option.id
            );
            
            let data = {
                role_id: this.state.form.role_id,
                name: this.state.form.name,
                email: this.state.form.email,
                mobile: this.state.form.mobile,
                communities: JSON.stringify(userCommunities),
            }
            const { id } = this.props.match.params
            if (id && id === 'new') {
                this.props.create('formData', 'users', data)
            } else {
                this.props.update('formData', 'users', id, data)
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
            crudService._get('users', id).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        form: response.data
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
        let title = 'Add New User/Admin'
        let btnText = 'Create'
        if (id && id !== 'new') {
            title = 'Edit User/Admin Details'
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

UserForm.propTypes = {
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

export default withStyles(styles)(connect(mapState, actionCreators)(UserForm));
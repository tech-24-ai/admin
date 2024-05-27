/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

// material ui icons
import MailOutline from "@material-ui/icons/PeopleOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import MyForm from "components/Form";
import {Button, Icon} from "@material-ui/core";
// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from 'react-redux';
import { crudActions,loaderActions } from '../../../_actions';
import { crudService } from "../../../_services";
import SimpleReactValidator from 'simple-react-validator';

const initialState = {
    id: 'new',
    form: {
        visitor_group_id: '',
        visitor_group: '',
        name: '',
        email: '',
        mobile: '',
        designation: '',
        company: '',
        register_from: '',
        linkedin_link: '',
        profile_pic_url: '',
        country_id: '',
        country_full_name: '',
        connections: '',
        location: '',
        company_location: '',
        company_linkedin_link: '',
    },
}
class VisitorForm extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = initialState

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    checkRegisteredform(value){

        if(value != null){
            return true;
        } else {
            return false;
        }

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
                name: 'visitor_group_id',
                label: 'Choose Group',
                type: 'autocomplete',
                url: 'visitor_groups',
                getOptionLabel: 'name',
                getOptionValue: 'id',
                value: form.visitor_group_id,
                option: { label: form.visitor_group.name || '', value: form.visitor_group_id },
                error: this.validator.message('visitor_group_id', form.visitor_group_id, 'required')
            },
            {
                name: 'name',
                label: 'Name',
                type: 'textbox',
                value: this.getValue(form.name),
                icon: 'assignment',
                error: this.validator.message('name', form.name, 'required|min:3')
            },
            {
                name: 'email',
                label: 'Email',
                type: 'textbox',
                value: this.getValue(form.email),
                icon: 'email',
                error: this.validator.message('email', form.email, 'required|email')
            },
            {
                name: 'mobile',
                label: 'Mobile',
                type: 'textbox',
                value: this.getValue(form.mobile),
                icon: 'call',
                error: this.validator.message('mobile', form.mobile, 'required|min:10|max:15')
            },
            {
                name: 'designation',
                label: 'Designation',
                type: 'textbox',
                value: this.getValue(form.designation),
                icon: 'person',
                error: this.validator.message('designation', form.designation, 'min:5')
            },
            {
                name: 'company',
                label: 'Company',
                type: 'textbox',
                value: this.getValue(form.company),
                icon: 'business',
                error: this.validator.message('company', form.company, 'min:3')
            },
            {
                name: 'register_from',
                label: 'Registered Via',
                type: 'textbox',
                value: this.checkRegisteredform(this.getValue(form.register_from))? 'WebApp' : 'Linkedin',
                icon: 'appregistration'
            },
            {
                name: 'linkedin_link',
                label: 'LinkedIn Profile URL',
                type: 'textbox',
                value: this.getValue(form.linkedin_link),
                icon: 'link',
                error: this.validator.message('link', form.linkedin_link, 'required|min:10')
            },
            {
                name: 'company_linkedin_link',
                label: 'LinkedIn Company Profile URL',
                type: 'textbox',
                value: this.getValue(form.company_linkedin_link),
                icon: 'link',
                error: this.validator.message('link', form.company_linkedin_link, 'required|min:10')
            },
            // {
            //     name: 'profile_pic_url',
            //     label: 'Profile Pic URL',
            //     type: 'textbox',
            //     value: this.getValue(form.profile_pic_url),
            //     icon: 'link',
            //     error: this.validator.message('link', form.profile_pic_url, 'required|min:10')
            // },
            {
                name: 'profile_pic_url',
                label: 'Profile Pic URL',
                type: 'file',
                value: form.profile_pic_url || '',
                uploadUrl: 'upload/image',
                error: this.validator.message('link', form.profile_pic_url, 'url')
            },
            {
                name: 'country_id',
                label: 'Choose Country',
                type: 'autocomplete',
                url: 'countries',
                getOptionLabel: 'name',
                getOptionValue: 'id',
                value: form.country_id,
                icon: 'public',
                option: { label: form.country_full_name || '', value: form.country_id },
                error: this.validator.message('country_id', form.country_id, 'required')
            },
            {
                name: 'connections',
                label: 'LinekdIn Connections',
                type: 'textbox',
                value: this.getValue(form.connections),
                icon: 'switchaccount',
                error: this.validator.message('connections', form.connections, 'min:1')
            },
            {
                name: 'location',
                label: 'Visitor Location (LinkedIn based)',
                type: 'textbox',
                value: this.getValue(form.location),
                icon: 'switchaccount',
                error: this.validator.message('location', form.location, 'min:3')
            },
            {
                name: 'company_location',
                label: 'Company Location (LinkedIn Based)',
                type: 'textbox',
                value: this.getValue(form.company_location),
                icon: 'switchaccount',
                error: this.validator.message('company_location', form.company_location, 'min:3')
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
                email: this.state.form.email,
                mobile: this.state.form.mobile,
                designation: this.state.form.designation,
                company: this.state.form.company,
                visitor_group_id: this.state.form.visitor_group_id,
                linkedin_link: this.state.form.linkedin_link,
                profile_pic_url: this.state.form.profile_pic_url,
                country_id: this.state.form.country_id,
                connections: this.state.form.connections,
                location: this.state.form.location,
                company_location: this.state.form.company_location,
                company_linkedin_link: this.state.form.company_linkedin_link,
            }
            const { id } = this.props.match.params
            if (id && id === 'new') {
                this.props.create('formData', 'visitors', data)
            } else {
                this.props.update('formData', 'visitors', id, data)
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
            crudService._get('visitors', id).then((response) => {
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

    fetchInfo() {
        if (this.state.form.email !== "" && this.state.form.email !== null) {
            const items=Array(this.state.form.email)
          let url = `searchCondidateData`;
          this.props.showLoader();
          crudService
            ._getAllWithParam(url,{items:items})
            .then((response) => {
              if (response.status === 200) {
                  this.props.hideLoader();
                  this.bindData();

                  setTimeout(()=>{
                        this.goBack()
                  },2000)
              }
            });
        } else {
          this.validator.showMessageFor("Email ID");
        }
      }
    


    render() {
        const { classes } = this.props;
        const { id } = this.props.match.params
        let title = 'Add New Visitor'
        let btnText = 'Create'
        if (id && id !== 'new') {
            title = 'Edit Visior Details'
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
                            <Button
                                size="small"
                                    variant="contained"
                                    color="success"
                                    style={{ float: "right", marginLeft: "10px", marginTop:"15px" }}
                                    onClick={() => this.fetchInfo()}
                                    endIcon={<Icon>import_export</Icon>}
                                >
                                    Fetch Info
                                </Button>
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

VisitorForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { form, confirm } = state;
    return { form, confirm };
}

const actionCreators = {
    getCrud: crudActions._get,
    clearCrud: crudActions._clear,
    create: crudActions._create,
    update: crudActions._update,
    showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(VisitorForm));
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
import { INVESTOR_STATUS } from "../../../_constants/form.constants"

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
        designation: '',
        is_company: '',
        company: '',
        email: '',
        password: '',
        status:'',
        mobile: '',
        mi_segments: [],
    },
}
class InvestorForm extends React.PureComponent {

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

    getFormFields = () => {
        const { form } = this.state
        const formFields = [
            {
                name: 'name',
                label: 'Name',
                type: 'textbox',
                value: form.name || '',
                icon: 'assignment',
                error: this.validator.message('name', form.name, 'required|min:3')
            },
            {
                name: 'designation',
                label: 'Designation',
                type: 'textbox',
                value: form.designation || '',
                icon: 'assignment',
                error: this.validator.message('designation', form.designation, 'required|min:3')
            },
            {
                name: 'email',
                label: 'Email',
                type: 'textbox',
                value: form.email || '',
                icon: 'assignment',
                error: this.validator.message('email', form.email, 'required|email')
            },
            {
                name: 'mobile',
                label: 'Mobile',
                type: 'textbox',
                value: form.mobile || '',
                icon: 'assignment',
                error: this.validator.message('mobile', form.mobile, 'min:10|max:15')
            },
            {
                name: 'is_company',
                label: 'Is Company',
                value: form.is_company,
                type: 'checkbox',
            },
            {
              name: "status",
              label: "Status",
              type: "select",
              options: INVESTOR_STATUS,
              value: form.status || "",
              icon: "assignment",
              error: this.validator.message(
                "status",
                form.status,
                "required"
              ),
            },
            {
                name: 'company',
                label: 'Company',
                type: 'textbox',
                value: form.company || '',
                icon: 'assignment',
                error: this.validator.message('company', form.company, 'required|min:3')
            },
            {
                name: 'mi_segments',
                label: 'Choose MI Segments',
                type: 'multi_checkbox',
                url: 'app/mi-segment',
                getOptionLabel: 'name',
                getOptionValue: 'id',
                value: form.mi_segments,
                error: ''
            }
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
                name: this.state.form.name,
                designation: this.state.form.designation,
                is_company: this.state.form.is_company ? true : false,
                company: this.state.form.company,
                email: this.state.form.email,
                password: this.state.form.password,
                status: this.state.form.status,
                mobile: this.state.form.mobile,
                mi_segments: JSON.stringify(this.state.form.mi_segments)
            }
            const { id } = this.props.match.params
            if (id && id === 'new') {
                this.props.create('formData', 'investors', data)
            } else {
                this.props.update('formData', 'investors', id, data)
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
            crudService._get('investors', id).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        form: response.data,
                    })
                }
            })
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

    componentDidMount() {
        this.bindData();
    }


    render() {
        const { classes } = this.props;
        const { id } = this.props.match.params
        let title = 'Add Investor Segment'
        let btnText = 'Create'
        if (id && id !== 'new') {
            title = 'Edit Investor Details'
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

InvestorForm.propTypes = {
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

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(InvestorForm));
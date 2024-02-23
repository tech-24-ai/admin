/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material ui icons
import MailOutline from "@material-ui/icons/Contacts";

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

const useStyles = makeStyles((theme) => (styles));

const Index = (props) => {

    const classes = useStyles();
    const [state, setState] = useState({
        contact_type_id: '',
        contact_type: '',
        organisation_name: '',
        requirement: '',
        company_address: '',
        website: '',
        domain_expertise: '',
        revenue_range: '',
        number_employees: '',
    });
    const [id] = useState(props && props.match.params && props.match.params.id);
    useEffect(() => {
        async function fetchData(id) {
            await crudService._get('contacts', id).then((response) => {
                if (response.status === 200) {
                    setState(response.data)
                }
            })
        }
        if (id !== 'new') {
            fetchData(id)
        }
    }, [])

    useEffect(() => {
        if (props.form && id !== 'new') {

            setState({
                contact_type_id: props.form.contact_type_id,
                contact_type: props.form.contact_type,
                organisation_name: props.form.organisation_name,
                requirement: props.form.requirement,
                company_address: props.form.company_address,
                website: props.form.website,
                domain_expertise: props.form.domain_expertise,
                revenue_range: props.form.revenue_range,
                number_employees: props.form.number_employees,
            });
        }
    }, [props.form, id])

    const onChange = (event) => {
        if (event.target)
            setState(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
    }

    const [, forceUpdate] = useState();
    const simpleValidator = useRef(new SimpleReactValidator({
        element: message => message,
    }))

    const goBack = () => {
        props.history.goBack();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (simpleValidator.current.allValid()) {
            if (id === 'new') {
                props.createData('formData', 'contacts', state)
            } else {
                props.updateData('formData', 'contacts', id, state)
            }
            goBack();
        } else {
            simpleValidator.current.showMessages()
            forceUpdate(1)
        }
    }

    const getFormFields = () => {


        const formFields = [
            {
                name: 'contact_type_id',
                label: 'Choose Contact Type',
                type: 'autocomplete',
                url: 'contact_types',
                getOptionLabel: 'name',
                getOptionValue: 'id',
                value: state.contact_type_id,
                option: { label: state.contact_type, value: state.contact_type_id },
                error: simpleValidator.current.message('contact_type_id', state.contact_type_id, 'required')
            },
            {
                name: 'organisation_name',
                label: 'Organisation Name',
                type: 'textbox',
                value: state.organisation_name || '',
                error: simpleValidator.current.message('organisation_name', state.organisation_name, 'required')
            },
            {
                name: 'requirement',
                label: 'Requirement',
                type: 'textarea',
                value: state.requirement || '',
                error: simpleValidator.current.message('requirement', state.requirement, 'min:3')
            },
            {
                name: 'company_address',
                label: 'Company Address',
                type: 'textarea',
                value: state.company_address || '',
                error: simpleValidator.current.message('company_address', state.company_address, 'min:3')
            },
            {
                name: 'website',
                label: 'website',
                type: 'textbox',
                value: state.website || '',
                error: simpleValidator.current.message('website', state.website, 'url')
            },
            {
                name: 'domain_expertise',
                label: 'Domain Expertise',
                type: 'textarea',
                value: state.domain_expertise || '',
                error: simpleValidator.current.message('domain_expertise', state.domain_expertise, 'min:3')
            },
            {
                name: 'revenue_range',
                label: 'Revenue Range',
                type: 'textbox',
                value: state.revenue_range || '',
                error: simpleValidator.current.message('revenue_range', state.revenue_range, 'min:3')
            },
            {
                name: 'number_employees',
                label: 'Number Employees',
                type: 'textbox',
                value: state.number_employees || '',
                error: simpleValidator.current.message('number_employees', state.number_employees, 'min:1')
            },
        ]

        return formFields
    }



    return (
        <GridContainer justify="center">
            <GridItem xs={12} sm={8}>
                <Card>
                    <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                            <MailOutline />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>{id === 'new' ? 'Add New Contact' : 'Edit Contact Form'}</h4>
                    </CardHeader>
                    <CardBody>
                        <MyForm
                            handleInputChange={onChange}
                            formFields={getFormFields()}
                            handleSubmit={handleSubmit}
                            handleCancel={goBack}
                            btnText={id === 'new' ? 'Save' : 'Update'}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}

const mapStateToProps = (state) => {
    const { form, confirm } = state;
    return {
        form,
        confirm
    };
}

const actionCreators = {
    getData: crudActions._get,
    createData: crudActions._create,
    updateData: crudActions._update,
};

export default (connect(mapStateToProps, actionCreators)(Index));

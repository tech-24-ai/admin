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
    const [state, setState] = useState({ name: "", sort_order: "" });
    const [id] = useState(props && props.match.params && props.match.params.id);
    useEffect(() => {
        async function fetchData(id) {
            await crudService._get('contact_types', id).then((response) => {
                if (response.status === 200) {
                    setState(response.data)
                }
            })
        }
        if (id !== 'new') {
            fetchData(id)
        }
    }, [])

    const onChange = (event) => {
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
                props.createData('formData', 'contact_types', state)
            } else {
                props.updateData('formData', 'contact_types', id, state)
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
                name: 'name',
                label: 'Name',
                type: 'textbox',
                value: state.name || '',
                icon: 'assignment',
                error: simpleValidator.current.message('name', state.name, 'required|min:3')
            },
            {
                name: 'sort_order',
                label: 'Sort Order',
                type: 'textbox',
                value: state.sort_order || '',
                icon: 'sort',
                error: simpleValidator.current.message('sort_order', state.sort_order, 'numeric')
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
                        <h4 className={classes.cardIconTitle}>{id === 'new' ? 'Add New Contact Type' : 'Edit Contact Type'}</h4>
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
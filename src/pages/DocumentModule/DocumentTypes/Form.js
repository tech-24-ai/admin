/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

// material ui icons
import MailOutline from "@material-ui/icons/InsertDriveFile";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import MyForm from "components/Form";
import {
    EU_DOCUMENT_CATEGORY_TYPE,
} from "../../../_constants/form.constants";

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
        sort_order: '',
        seo_url_slug : '',
        category: "",
    },
}
class DocumentTypeForm extends React.PureComponent {

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
                icon: 'assignment',
                error: this.validator.message('name', form.name, 'required|min:3')
            },
            {
                name: 'sort_order',
                label: 'Sort Order',
                type: 'textbox',
                value: form.sort_order || '',
                icon: 'sort',
                error: this.validator.message('sort_order', form.sort_order, 'numeric')
            },
            {
                name: "seo_url_slug",
                label: "Seo Slug Url",
                type: "textbox",
                value: form.seo_url_slug || "",
                icon: "assignment",
                error: this.validator.message("seo_url_slug", form.seo_url_slug, "required|min:3"),
              },
            {
                name: "category",
                label: "Category",
                type: "select",
                options: EU_DOCUMENT_CATEGORY_TYPE,
                value: form.category || "",
                icon: "assignment",
                error: this.validator.message(
                    "category",
                    form.category,
                    "required"
                ),
            },
        ]

        return formFields
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
                sort_order: this.state.form.sort_order,
                seo_url_slug : this.state.form.seo_url_slug,
                category: this.state.form.category,
            }
            const { id } = this.props.match.params
            if (id && id === 'new') {
                this.props.create('formData', 'document_types', data)
            } else {
                this.props.update('formData', 'document_types', id, data)
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
            crudService._get('document_types', id).then((response) => {
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
        let title = 'Add New Document Type'
        let btnText = 'Create'
        if (id && id !== 'new') {
            title = 'Edit Document Type'
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

DocumentTypeForm.propTypes = {
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

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(DocumentTypeForm));
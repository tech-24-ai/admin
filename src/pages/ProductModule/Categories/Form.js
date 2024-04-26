/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

// material ui icons
import Palette from "@material-ui/icons/ViewModule";

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
import { crudActions, fileActions } from '../../../_actions';
import { crudService } from "../../../_services";
import SimpleReactValidator from 'simple-react-validator';

const initialState = {
    id: 'new',
    form: {
        name: '',
        color: '',
        header_color: '',
        bg_color: '',
        bg_image: '',
        image: '',
        sort_order: '',
        detail: '',
        no_flow: false,
        document_type_id: false,
        documents: []
    },
}
class CategoryForm extends React.PureComponent {

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
            newState.form[event.target.name] = event.target.checked;
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
                error: this.validator.message('name', form.name, 'required')
            },
            {
                name: 'color',
                label: 'Color',
                type: 'color',
                value: form.color || '',
                error: this.validator.message('color', form.color, 'min:3')
            },
            {
                name: 'header_color',
                label: 'Mobile Header Color',
                type: 'color',
                value: form.header_color || '',
                error: this.validator.message('header_color', form.header_color, 'min:3')
            },
            {
                name: 'bg_color',
                label: 'Background Color',
                type: 'color',
                value: form.bg_color || '',
                error: this.validator.message('bg_color', form.bg_color, 'min:3')
            },
            {
                name: 'bg_image',
                label: 'Background Image',
                type: 'imageUpload',
                value: form.bg_image || '',
                uploadUrl: 'upload/image',
                error: this.validator.message('bg_image', form.bg_image, 'required')
            },
            {
                name: 'image',
                label: 'Image',
                type: 'file',
                value: form.image || '',
                uploadUrl: 'upload/image',
                error: this.validator.message('image', form.image, 'url')
            },
            {
                name: 'no_flow',
                label: 'Does not contain Flow',
                value: form.no_flow,
                type: 'checkbox',
            }
            , {
                name: 'sort_order',
                label: 'Sort Order',
                type: 'textbox',
                value: form.sort_order || '',
                icon: 'assignment',
                error: ''
            },
            , {
                name: 'detail',
                label: 'Detail',
                type: 'textarea',
                value: form.detail || '',
                icon: 'assignment',
                error: ''
            },
        ]


        if (form.no_flow) {
            formFields.push(
                {
                    name: 'documents',
                    label: 'Choose documents',
                    type: 'multi_group_checkbox',
                    url: 'app/documents/children',
                    getOptionLabel: 'name',
                    getOptionValue: 'id',
                    getSubOptionLabel: 'name',
                    getSubOptionValue: 'id',
                    value: form.documents || '',
                    error: this.validator.message('documents', form.documents, 'required')
                },
            )
        }

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
                color: this.state.form.color,
                header_color: this.state.form.header_color,
                bg_color: this.state.form.bg_color,
                bg_image: this.state.form.bg_image,
                image: this.state.form.image,
                no_flow: this.state.form.no_flow,
                sort_order: this.state.form.sort_order,
                detail: this.state.form.detail,
                documents: JSON.stringify(this.state.form.documents),
            }
            const { id } = this.props.match.params
            if (id && id === 'new') {
                this.props.create('formData', 'categories', data)
            } else {
                this.props.update('formData', 'categories', id, data)
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
            crudService._get('categories', id).then((response) => {
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
        let title = 'Add New Module Category'
        let btnText = 'Create'
        if (id && id !== 'new') {
            title = 'Edit Module Category'
            btnText = 'Update'
        } else {
            this.resetForm();
        }

        return (
            <GridContainer justify="center">
                <GridItem xs={12} sm={8}>
                    <Card>
                        <CardHeader color="primary" icon>
                            <CardIcon color="primary">
                                <Palette />
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

CategoryForm.propTypes = {
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
    upload: fileActions._upload,
};

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(CategoryForm));
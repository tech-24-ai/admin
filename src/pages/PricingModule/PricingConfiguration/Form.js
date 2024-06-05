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

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from 'react-redux';
import { crudActions } from '../../../_actions';
import { crudService } from "../../../_services";

import SimpleReactValidator from 'simple-react-validator';
import { OptionTypesYears } from "../../../_constants/years.constants";

const initialState = {
    id: 'new',
    modules: null,
    form: {
        name: '',
        notes: '',
        category_id: '',
        category: '',
        module_id: '',
        module: '',
        year: '',
        price: '',
        deal_size: '',
        country_groups_id: '',
        unit:'',
        graph_y_label: '',
        pricing_model_id: '',
        pricing_models:''
    },
    dynamicForm: [],
}
class PricingModelForm extends React.PureComponent {

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
        const { form, dynamicForm } = this.state

        let formFieldData = null;

        if (form.country_groups_id) {
            formFieldData = {
                country_groups_id: form.country_groups_id,
                year: form.year,
                price: form.price,
                deal_size: form.deal_size
            }
        }

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
                name: 'category_id',
                label: 'Choose Category',
                type: 'autocomplete',
                url: 'categories',
                getOptionLabel: 'name',
                getOptionValue: 'id',
                value: form.category_id,
                option: { label: form.category, value: form.category_id },
                error: this.validator.message('category_id', form.category_id, 'required')
            },
            {
                name: 'module_id',
                label: 'Choose Module',
                type: 'group_autocomplete',
                url: 'modules/children_without_flow',
                getOptionLabel: 'name',
                getOptionValue: 'id',
                value: form.module_id,
                options: [
                    {
                        name: "category_id",
                        value: form.category_id
                    },
                    {
                        name: "edit",
                        value: true
                    }
                ],
                error: this.validator.message('module_id', form.module_id, 'required')
            },
            {
                name: 'pricing_model_id',
                label: 'Choose Pricing Model',
                type: 'autocomplete',
                url: 'pricingInsight/pricing_model',
                getOptionLabel: 'name',
                getOptionValue: 'id',
                value: form.pricing_model_id,
                option: { label: form.pricing_model, value: form.pricing_model_id },
                error: this.validator.message('pricing_model_id', form.pricing_model_id, 'required')
            },
            {
                name: 'notes',
                label: 'Notes',
                type: 'textbox',
                value: form.notes || '',
                icon: 'assignment',
                error: this.validator.message('notes', form.notes, '')
            },
            {
                name: 'unit',
                label: 'Unit',
                type: 'textbox',
                value: form.unit || '',
                icon: 'assignment',
                error: this.validator.message('unit', form.unit, '')
            },
            {
                name: 'graph_y_label',
                label: 'Graph Label (y axis)',
                type: 'textbox',
                value: form.graph_y_label || '',
                icon: 'assignment',
                error: this.validator.message('graph_y_label', form.graph_y_label, '')
            },
            {
                name: 'configuration',
                label: 'Configuration',
                type: 'dynamicTableForm',
                formColumn: ['Region', 'Year', 'Average Price', 'Deal Size'],
                formData: dynamicForm,
                formFieldData: formFieldData,
                options: [
                    {
                        name: 'country_groups_id',
                        label: 'Choose Region',
                        type: 'autocomplete',
                        url: 'country_groups',
                        getOptionLabel: 'name',
                        getOptionValue: 'id',
                        value: form.country_groups_id,
                        meta: 'addAllOption'
                    },
                    {
                        name: 'year',
                        label: 'Choose Year',
                        type: 'select',
                        value: form.year || '',
                        options: OptionTypesYears
                    },
                    {
                        name: 'price',
                        label: 'Average Price',
                        type: 'textbox',
                        value: form.price || '',
                    },
                    {
                        name: 'deal_size',
                        label: 'Deal Size',
                        type: 'textbox',
                        value: form.deal_size || '',
                    }
                ],
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

            let config = this.state.dynamicForm.length ? this.state.dynamicForm : null;

            if(config && config.length) {
                for(let conf of config) {
                    conf['prices'] = [{"avgprice": conf.price}]
                    delete conf['price']
                }
            }

            let data = {
                name: this.state.form.name,
                category_id: this.state.form.category_id,
                module_id: this.state.form.module_id,
                unit: this.state.form.unit,
                graph_y_label: this.state.form.graph_y_label,
                pricing_model_id: this.state.form.pricing_model_id,
                notes: this.state.form.notes,
                configs: config
            }
            const { id } = this.props.match.params
            if (id && id === 'new') {
                this.props.create('formData', 'pricingInsight/pricing_configuration', data)
            } else {
                this.props.update('formData', 'pricingInsight/pricing_configuration', id, data)
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

    addDynamicForm = (dynamicForm) => {
        this.setState({
            dynamicForm: dynamicForm
        });
    }

    removeDynamicForm = (dynamicForm) => {
        this.setState({
            dynamicForm: dynamicForm
        });
    }

    handleFormInputChange = (dynamicForm) => {
        this.setState({ dynamicForm: dynamicForm });
    }

    processConfig = (conf) => {
        conf['price'] = this.calculatePrice(conf);
        conf['name'] = this.determineName(conf);
        if (conf['name'] == 'All') {
            conf['country_groups_id'] = 99999;
        }
        delete conf['prices'];
    }

    calculatePrice = (conf) => {
        return conf.prices?.length ? conf.prices[0].avgprice : '';
    }
    
    determineName = (conf) => {
        return conf.countryGroups?.name ?? 'All';
    }

    bindData = () => {
        const { id } = this.props.match.params
        if (id && id !== 'new') {                        
            crudService._get('pricingInsight/pricing_configuration', id).then((response) => {                
                if (response.status === 200) {

                    let configs = (response.data && response.data.configs) ? response.data.configs : null;
                    if(configs) 
                    {
                        for (let conf of configs) {
                            this.processConfig(conf);
                        }
                    }

                    this.setState({
                        form: response.data,
                        dynamicForm: configs ? configs : [],
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
        let title = 'Add Pricing Configuration'
        let btnText = 'Create'
        if (id && id !== 'new') {
            title = 'Edit Pricing Configuration Details'
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
                                addDynamicForm={this.addDynamicForm}
                                removeDynamicForm={this.removeDynamicForm}
                                dynamicForm={this.state.dynamicForm}
                                btnText={btnText}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }

}

PricingModelForm.propTypes = {
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

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(PricingModelForm));
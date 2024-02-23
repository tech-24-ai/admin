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
import { PLAN_DURATION } from "../../../_constants/form.constants";
import { PLAN_TYPE } from "../../../_constants/form.constants"
import { STATUS } from "../../../_constants/form.constants"

const initialState = {
    id: 'new',
    form: {
        plan_name: '',
        plan_duration: '',
        plan_price: '',
        current_price_or_special_price: '',
        segment_id: '',
        plan_type: '',
        max_market: '',
        max_region: '',
        max_country: '',
        is_active: '',
        paypal_plan_id: '',
        modules: [],
        countries: [],
        country_groups: []
    },
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
        const { form } = this.state
        const formFields = [
            {
                name: 'plan_name',
                label: 'Plan Name',
                type: 'textbox',
                value: form.plan_name || '',
                icon: 'assignment',
                error: this.validator.message('name', form.plan_name, 'required')
            },
            {
                name: "plan_duration",
                label: "Plan Duration",
                type: "select",
                options: PLAN_DURATION,
                value: form.plan_duration || "",
                icon: "assignment",
                error: this.validator.message(
                  "plan_duration",
                  form.plan_duration,
                  "required"
                ),
            },
            {
                name: 'plan_price',
                label: 'Plan Price',
                type: 'textbox',
                value: form.plan_price || '',
                icon: 'assignment',
                error: this.validator.message('plan price', form.plan_price, 'required|numeric')
            },
            {
                name: 'current_price_or_special_price',
                label: 'Special Price',
                type: 'textbox',
                value: form.current_price_or_special_price || '',
                icon: 'assignment',
                error: this.validator.message('special price', form.current_price_or_special_price, 'required|numeric')
            },
            {
                name: "segment_id",
                label: "Choose MI Segment",
                type: "autocomplete",
                url: "mi-segment",
                getOptionLabel: "name",
                getOptionValue: "id",
                value: form.segment_id,
                option: { label: form.country, value: form.segment_id },
                error: this.validator.message(
                  "segment_id",
                  form.segment_id,
                  "required"
                ),
              },
              {
                name: "plan_type",
                label: "Plan Type",
                type: "select",
                options: PLAN_TYPE,
                value: form.plan_type || "",
                icon: "assignment",
                error: this.validator.message(
                  "plan_type",
                  form.plan_type,
                  "required"
                ),
            },
            {
                name: 'max_market',
                label: 'Maximum Markets Allowed',
                type: 'textbox',
                value: form.max_market || '',
                icon: 'assignment',
                error: this.validator.message('maximum markets', form.max_market, 'required|numeric')
            },
            {
                name: 'max_region',
                label: 'Maximum Regions Allowed',
                type: 'textbox',
                value: form.max_region || '',
                icon: 'assignment',
                error: this.validator.message('maximum regions', form.max_region, 'required|numeric')
            },
            {
                name: 'max_country',
                label: 'Maximum Countries Allowed',
                type: 'textbox',
                value: form.max_country || '',
                icon: 'assignment',
                error: this.validator.message('maximum countries', form.max_country, 'required|numeric')
            },
            {
                name: "is_active",
                label: "Is Active",
                type: "select",
                options: STATUS,
                value: form.is_active || "",
                icon: "assignment",
                error: this.validator.message(
                  "is_active",
                  form.is_active,
                  "required"
                ),
            },
            {
                name: 'paypal_plan_id',
                label: 'Paypal Plan Id',
                type: 'textbox',
                value: form.paypal_plan_id || '',
                icon: 'assignment',
            },
            {
                name: "modules",
                label: "Choose Market",
                type: [1,2,3,4,6].includes(this.state.form.segment_id) ? "treebox" : "NA",
                url: "app/module/categories?not_categories=[5]",
                getOptionLabel: "name",
                getOptionValue: "id",
                value: form.modules,
                error: "",
            },
            {
                name: "countries",
                label: "Select Country",
                type: [1,3].includes(this.state.form.segment_id) ? "multiSelect" : "NA",
                url: "countries",
                getOptionLabel: "name",
                getOptionValue: "id",
                option: form.countries,
                value: form.countries || [],
                icon: "assignment",
                error: this.validator.message(
                  "countries",
                  form.countries,
                  [1,3].includes(this.state.form.segment_id) ? "required": ''
                ),
            },
            {
                name: "country_groups",
                label: "Select Region",
                type: [1,5].includes(this.state.form.segment_id) ? "multiSelect" : "NA",
                url: "country_groups",
                getOptionLabel: "name",
                getOptionValue: "id",
                option: form.country_groups,
                value: form.country_groups || [],
                icon: "assignment",
                error: this.validator.message(
                  "country_groups",
                  form.country_groups,
                  [1,5].includes(this.state.form.segment_id) ? "required": ''
                ),
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

    goBack = () => {        
        this.props.history.goBack();
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            let data = {
                plan_name: this.state.form.plan_name,
                plan_duration: this.state.form.plan_duration,
                plan_price: this.state.form.plan_price,
                current_price_or_special_price: this.state.form.current_price_or_special_price,
                segment_id:  this.state.form.segment_id,
                plan_type:  this.state.form.plan_type,
                max_market: this.state.form.max_market,
                max_region:  this.state.form.max_region,
                max_country:  this.state.form.max_country,
                is_active:  this.state.form.is_active,
                paypal_plan_id:  this.state.form.paypal_plan_id,
                modules: JSON.stringify(this.state.form.modules),
                countries: JSON.stringify(this.state.form.countries),
                country_groups: JSON.stringify(this.state.form.country_groups)
            }
            const { id } = this.props.match.params
            if (id && id === 'new') {
                this.props.create('formData', 'subscription/market_plans', data)
            } else {
                this.props.update('formData', 'subscription/market_plans', id, data)
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
            crudService._get('subscription/market_plans', id).then((response) => {                
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
        let title = 'Add Subscription Plan'
        let btnText = 'Create'
        if (id && id !== 'new') {
            title = 'Edit Subscription Plan Details'
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
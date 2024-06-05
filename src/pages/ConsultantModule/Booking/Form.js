/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

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
import { CO_TRANSACTION_TYPE, BOOKING_STATUS_TYPE, DURATION_TYPE, SKILL_TYPE } from "../../../_constants/form.constants";
// import { YEAR, COMPANY_TYPE } from "../../../_constants/form.constants";
import Button from "@material-ui/core/Button";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from "react-redux";
import { crudActions, loaderActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";
import Icon from "@material-ui/core/Icon";
import { UserHelper } from "_helpers";
import { duration } from "moment";

const initialState = {
    id: "new",
    form: {
        consultant: {
            first_name: "",
            consultant_id: ""
        },
        visitor: {
            name: "",
            visitor_id: "",
        },
        transaction_date: "",
        transaction: {
            type: "Online",
            total_amount: 850,
            sub_amount: 850,
            transaction_details: "transaction details",
            // transaction_date: "",
            paypal_transaction_id: "1",
            taxes: 50,
        },
        amount_per_min: 20,
        skill: "",
        is_credit: "false",
        remarks: "",
        duration: "",
        booking_date: "",
        booking_time: "",
    },

};
class BookingForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    handleInputChange(event) {
        const newState = Object.assign({}, this.state);
        if (event.target.type == "checkbox") {
            newState.form[event.target.name] = event.target.checked ? "Active" : "";
        } else {
            newState.form[event.target.name] = event.target.value;
        }
        this.setState(newState);
        this.handleError();
    }

    getFormFields = () => {
        const { form } = this.state;
        const formFields = [
            // {
            //     name: "consultant.first_name",
            //     label: "Consultant Name",
            //     value: form.consultant.first_name || "",
            //     type: "autocomplete",
            //     url: "consultants",
            //     icon: "assignment",
            //     getOptionLabel: "first_name",
            //     getOptionValue: 'id',
            //     // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
            // },
            // {
            //     name: "visitor.name",
            //     label: "Visitor Name",
            //     type: "autocomplete",
            //     url: "visitors",
            //     value: form.visitor.name || "",
            //     icon: "assignment",
            //     getOptionLabel: "name",
            //     getOptionValue: 'id',
            //     // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
            // },
            {
                name: "amount_per_min",
                label: "Amount Per Min",
                type: "textbox",
                value: form.amount_per_min || "",
                icon: "assignment",
                // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
            },
            {
                name: "skill",
                label: "Skill",
                type: "select",
                options: SKILL_TYPE,
                value: form.skill || "",
                icon: "assignment",
                // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
            },
            {
                name: "remarks",
                label: "Remarks",
                type: "textbox",
                value: form.remarks || "",
                icon: "assignment",
                // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
            },
            // {
            //     name: "type",
            //     label: "Type",
            //     type: "select",
            //     options: CO_TRANSACTION_TYPE,
            //     value: form.transaction.type || "",
            //     icon: "assignment",
            //     // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
            // },
            {
                name: "taxes",
                label: "Taxes",
                type: "textbox",
                value: form.transaction.taxes || "",
                icon: "assignment",
                // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
            },
            {
                name: "booking_date",
                label: "Booking Date",
                type: "date",
                value: form.booking_date || "",
                icon: "assignment",
                // error: this.validator.message("email", form.email, "email"),
            },
            {
                name: "booking_time",
                label: "Booking Time",
                type: "time",
                value: form.booking_time || "",
                icon: "assignment",
                // error: this.validator.message("email", form.email, "email"),
            },
            {
                name: "duration",
                label: "Duration",
                type: "select",
                options: DURATION_TYPE,
                value: form.duration || "",
                icon: "assignment",
                // error: this.validator.message("email", form.email, "email"),
            },
            {
                name: "paypal_transaction_id",
                label: "Paypal Transaction Id",
                type: "textbox",
                value: form.transaction.paypal_transaction_id || "",
                icon: "assignment",
                // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
            },
            {
                name: "transaction.sub_amount",
                label: "Sub Amount",
                type: "textbox",
                value: form.transaction.sub_amount || "",
                icon: "assignment",
                // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
            },
            {
                name: "transaction.total_amount",
                label: "Total Amount",
                type: "textbox",
                value: form.transaction.total_amount || "",
                icon: "assignment",
                // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
            },
             {
                name: "transaction.transaction_details",
                label: "Transaction Details", 
                type: "textbox",
                value: form.transaction.transaction_details || "",
                icon: "assignment",
                readonly: true,
                // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
            }, 
            {
                name: "transaction.transaction_date",
                label: "Transaction Date",
                type: "date",
                value: form.transaction_date || "",
                icon: "assignment",
                // error: this.validator.message("mobile", form.mobile, "min:10|max:15"),
            }, 
            {
                name: "is_credit",
                label: "Is Credit",
                type: "checkbox",
                value: form.is_credit ? true : false,
            },
        ];

        return formFields;
    };

    getValue(val) {
        const { id } = this.props.match.params;
        if (id && id === "new") {
            return val;
        } else {
            if (null === val) {
                return "";
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
    };

    handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            const { childId, id } = this.props.match.params;
           
            let data = {
                consultant_id: UserHelper.isConsultant() ? null : id,
                visitor_id: 1,
                amount_per_min: this.state.form.amount_per_min,
                duration: this.state.form.duration,
                skill: this.state.form.skill,
                remarks: this.state.form.remarks,
                booking_date: this.state.form.booking_date,
                type: this.state.form.transaction.type,
                taxes: this.state.form.transaction.taxes,
                booking_time: this.state.form.booking_time,
                total_amount: this.state.form.transaction.total_amount,
                total_payment: this.state.form.total_payment,
                sub_amount: this.state.form.transaction.sub_amount,
                transaction_details: this.state.form.transaction.transaction_details,
                transaction_date: this.state.form.transaction_date,
            };
            
            if ((UserHelper.isConsultant() && id && id === "new") || (!UserHelper.isConsultant() && childId && childId === "new")) {
                this.props.create("formData", "consultants/booking", data);
                this.goBack();
            } else {
                const bookingId = UserHelper.isConsultant() ? id : childId;
                this.props.update("formData", "consultants/booking", bookingId, data);
            }

            this.resetForm();
            this.goBack();
        } else {
            this.handleError();
        }
    }

    bindData = () => {
        const { childId, id } = this.props.match.params;
        if (childId && childId !== "new") {
            crudService._get("consultants/booking", childId).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        form: response.data,
                    });
                }
            });
        }
    };

    componentDidMount() {
        this.bindData();
    }

    render() {
        const { classes } = this.props;
        const { id, childId } = this.props.match.params;
        let title = "Add Booking";
        let btnText = "Create";
        if (childId && childId !== "new") {
            title = "Edit Booking Details";
            btnText = "Update";
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

BookingForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { form, confirm } = state;
    return {
        form,
        confirm,
    };
};

const actionCreators = {
    getAll: crudActions._getAll,
    getCrud: crudActions._get,
    getAllParam: crudActions._getAllWithParam,
    clearCrud: crudActions._clear,
    create: crudActions._create,
    update: crudActions._update,
    showLoader: loaderActions.show,
    hideLoader: loaderActions.hide,
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
        actionCreators
    )(BookingForm)
);

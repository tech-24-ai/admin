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
// import { YEAR, COMPANY_TYPE } from "../../../_constants/form.constants";
import Button from "@material-ui/core/Button";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from "react-redux";
import { crudActions, loaderActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";
import Icon from "@material-ui/core/Icon";

const initialState = {
    id: "new",
    form: {
        start_time: "",
        end_time: "",
        booking_history_id: "",
        meeting_transcript: "",
    },
};
class BookingLogsForm extends React.PureComponent {
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
            {
                name: "start_time",
                label: "Start Time",
                type: "time",
                value: form.start_time || "",
                icon: "assignment",
                // error: this.validator.message("name", form.first_name, "required|min:3"),
            },
            // {
            //     name: "booking_history_id",
            //     label: "Booking History ",
            //     value: form.booking_history_id || "",
            //     icon: "assignment",
            //     type: "autocomplete",
            //     url: "consultants/booking-log",
            //     getOptionLabel: "booking_history_id",
            //     getOptionValue: "booking_history_id",
            //     error: this.validator.message(
            //         "booking_history_id",
            //         form.booking_history_id,
            //         "required"
            //     ),
            // },

            // {
            //     name: "end_time",
            //     label: "End Time",
            //     type: "time",
            //     value: form.end_time || "",
            //     icon: "assignment",
            //     // error: this.validator.message("name", form.first_name, "required|min:3"),
            // },
            // {
            //     name: "meeting_transcript",
            //     label: "Meeting Transcript",
            //     type: "textbox",
            //     value: form.meeting_transcript || "",
            //     icon: "assignment",
            //     // error: this.validator.message("image", form.image, "required"),
            // },
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
                booking_history_id: this.state.form.booking_history_id,
                start_time: this.state.form.start_time,
            };
            let response_data = {
                end_time: this.state.form.start_time,
                meeting_transcript: this.state.form.meeting_transcript
            }
            if (childId && childId === "new") {
                this.props.create("formData", "consultants/booking-log", data);
                this.goBack();
            } else {
                this.props.update("formData", "consultants/booking-log", childId, data);
            }
        } else {
            this.handleError();
        }
    }

    bindData = () => {
        const { id } = this.props.match.params;
        if (id && id !== "new") {
            crudService._get("consultants/booking-log", id).then((response) => {
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
        let title = "Add Booking Logs";
        let btnText = "Create";
        if (childId && childId !== "new") {
            title = "Edit Booking Logs Details";
            btnText = "Update";
        }
        // console.log("id", id);
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

BookingLogsForm.propTypes = {
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
    )(BookingLogsForm)
);

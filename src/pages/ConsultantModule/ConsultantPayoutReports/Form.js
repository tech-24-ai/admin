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
        subject: "",
        message: "",
        ref_id: ""
    },
};
class ComplaintsForm extends React.PureComponent {
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
        const { id, childId } = this.props.match.params;
        const consultantId = id ? id : this.state.form.consultant_id;
        const formFields = [

            {
                name: "subject",
                label: "Subject",
                type: "textbox",
                value: form.subject || "",
                icon: "assignment",
                // error: this.validator.message("name", form.first_name, "required|min:3"),
            },
            {
                name: "message",
                label: "message",
                type: "textbox",
                value: form.message || "",
                icon: "assignment",
                // error: this.validator.message("name", form.first_name, "required|min:3"),
            },
        ];
        if (!id && childId) {
            formFields.push({
                name: "consultant_id",
                label: "Consultant Name",
                value: form.consultant_id || "",
                type: "autocomplete",
                url: "consultants",
                icon: "assignment",
                getOptionLabel: "first_name",
                getOptionValue: "id",
                error: this.validator.message(
                    "consultant_id",
                    form.consultant_id,
                    "required"
                ),
            });
        }
        formFields.push(
            {
                name: "visitor_id",
                label: "Visitor Name",
                type: "autocomplete",
                url: "visitors",
                value: form.visitor_id || "",
                icon: "assignment",
                getOptionLabel: "name",
                getOptionValue: "id",
                error: this.validator.message(
                    "visitor_id",
                    form.visitor_id,
                    "required"
                ),
            },
        )
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
                consultant_id: id,
                // first_name: this.state.form.consultant.first_name,
                complain_by: this.state.form.complain_by,
                // created_at: this.state.form.created_at,
                subject: this.state.form.subject,
                message: this.state.form.message,
                red_id: 1,
                // raised_by: this.state.form.raised_by.name,
            };
            let response_data = {
                subject: this.state.form.subject,
                message: this.state.form.message,
                // red_id: 1,
            }
            if (id && id === "new") {
                this.props.create("formData", "complaints", data);
                this.goBack();
            } else {
                this.props.update("formData", "complaints", id, response_data);
            }
        } else {
            this.handleError();
        }
    }

    bindData = () => {
        const { id } = this.props.match.params;
        if (id && id !== "new") {
            crudService._get("complaints", id).then((response) => {
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
        const { id } = this.props.match.params;
        let title = "Add Complaints";
        let btnText = "Create";
        if (id && id !== "new") {
            title = "Edit Complaints Details";
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

ComplaintsForm.propTypes = {
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
    )(ComplaintsForm)
);

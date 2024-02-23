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
import ChatHistory from "components/ChatHistory/Chats";

// import { YEAR, COMPANY_TYPE } from "../../../_constants/form.constants";
import Button from "@material-ui/core/Button";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from "react-redux";
import { crudActions, loaderActions } from "../../../_actions";
import { crudService } from "../../../_services";
import { SCHEDULING_TYPE } from "../../../_constants/form.constants";

import SimpleReactValidator from "simple-react-validator";
import Icon from "@material-ui/core/Icon";
import { UserHelper } from "_helpers";

const initialState = {
    id: "new",
    form: {
        chat_id: "",
        message: "",
    },
};
class VisitorChatLogForm extends React.PureComponent {
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
            newState.form[event.target.name] = event.target.checked;
        } else {
            newState.form[event.target.name] = event.target.value;
        }
        this.setState(newState);
        this.handleError();
    }

    getFormFields = () => {
        const { form, options } = this.state;
        const formFields = [

            {
                name: "chat_id",
                label: "Chat Id",
                type: "textbox",
                value: form.chat_id || "",
                // error: this.validator.message(
                //   "document_file_name",
                //   form.document_file_name,
                //   "url"
                // ),
            },
            {
                name: "messsage",
                label: "Message",
                type: "textbox",
                value: form.message || "",
                icon: "assignment",
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

    // goBack = () => {
    //     this.props.history.push(`/admin/consultant-scheduling-daily`);
    // };
    goBack = () => {
        this.props.history.goBack();
    };

    handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            const { childId, id } = this.props.match.params;
            let data = {
                consultant_id: UserHelper.isConsultant() ? undefined : id,
                message: this.state.form.message,
                chat_id: this.state.form.chat_id,
            };
            if (childId && childId === "new") {
                this.props.create("formData", "chat-log", data);
                this.goBack();
            } else {
                this.props.update(
                    "formData",
                    "chat-log",
                    childId,
                    data
                );
            }
        } else {
            this.handleError();
        }
    }

    bindData = () => {
        const { childId } = this.props.match.params;
        if (childId && childId !== "new") {
            crudService
                ._get("consultants/chat-log", childId)
                .then((response) => {
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
        let title = "View Visitor Chat";
        let btnText = "Create";
        if (childId && childId !== "new") {
            title = "Chat History Details";
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
                            {/* <MyForm
                handleInputChange={this.handleInputChange}
                formFields={this.getFormFields()}
                handleSubmit={this.handleSubmit}
                handleCancel={this.goBack}
                btnText={btnText}
              /> */}
                            <ChatHistory 
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

VisitorChatLogForm.propTypes = {
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
    )(VisitorChatLogForm)
);


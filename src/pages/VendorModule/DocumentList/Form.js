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
// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import { connect } from "react-redux";
import { crudActions } from "../../../_actions";
import { crudService } from "../../../_services";

import SimpleReactValidator from "simple-react-validator";

const initialState = {
  id: "new",
  form: {
    document_type: "",
    document_title: "",
    document_file_name: "",
  },
};
class DocumentListForm extends React.PureComponent {
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
        name: "document_type",
        label: "Choose Document Type",
        type: "autocomplete",
        url: "document_types",
        getOptionLabel: "name",
        getOptionValue: "id",
        value: form.document_type || "",
        option: { label: form.document_type, value: form.document_type },
        error: this.validator.message(
          "document_type",
          form.document_type,
          "required"
        ),
      },
      {
        name: "document_file_name",
        label: "Document Link",
        type: "file",
        value: form.document_file_name || "",
        uploadUrl: "upload/document",
        error: this.validator.message(
          "document_file_name",
          form.document_file_name,
          "url"
        ),
      },
      {
        name: "document_title",
        label: "Document Title",
        type: "textbox",
        value: form.document_title || "",
        icon: "assignment",
        error: this.validator.message(
          "document_title",
          form.document_title,
          "required|min:3"
        ),
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
        document_type: this.state.form.document_type,
        document_title: this.state.form.document_title,
        document_file_name: this.state.form.document_file_name,
        vendor_id: id,
        currency: this.state.form.currency,
        acquired_amount: this.state.form.acquired_amount,
      };
      if (childId && childId === "new") {
        this.props.create(
          "formData",
          `documents-list/${this.props.match.params}`,
          data
        );
      } else {
        this.props.update(
          "formData",
          `documents-list/${this.props.match.params}`,
          childId,
          data
        );
      }
      this.resetForm();
      this.goBack();
    } else {
      this.handleError();
    }
  }

  resetForm = () => {
    const { form } = this.state;
    const formFields = this.getFormFields();
    if (formFields) {
      formFields.forEach((element) => {
        form[element.name] = null;
      });
    }
    this.setState(form);
    this.props.clearCrud("form");
  };

  bindData = () => {
    const { childId } = this.props.match.params;
    if (childId && childId !== "new") {
      crudService
        ._get(`documents-list/${this.props.match.params}`, childId)
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
    const { id } = this.props.match.params;
    let title = "Add New Document List";
    let btnText = "Create";
    if (id && id !== "new") {
      title = "Edit Document List Details";
      btnText = "Update";
    }
    console.log("id", this.props.match.params);
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

DocumentListForm.propTypes = {
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
  clearCrud: crudActions._clear,
  create: crudActions._create,
  update: crudActions._update,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actionCreators
  )(DocumentListForm)
);

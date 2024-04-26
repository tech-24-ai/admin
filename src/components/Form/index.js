import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import Icon from "@material-ui/core/Icon";
// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

import MuiCard from "@material-ui/core/Card";
import MuiCardHeader from "@material-ui/core/CardHeader";
import MuiCardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { alertActions, modalActions } from "../../_actions";

import RenderSelectBox from "./renderSelect";
import RenderTextBox from "./renderTextbox";
import RenderMultiSelectBox from "./renderMultiSelect";
import RenderPassBox from "./renderPassBox";
import RenderCheckTextBox from "./renderChecktBox";
import RenderFileBox from "./renderFilebox";
import GoogleDriveFilebox from "./googleDriveFilebox";
import RenderDate from "./renderDate";
import RenderImageUpload from "./renderImageUpload";
import RenderColorPicker from "./renderColorPicker";
import Autocomplete from "./autocomplete";
import GroupAutocomplete from "./group_autocomplete";
import SlotAutocomplete from "./slot_autocomplete";
import TimeZoneAutocomplete from "./zone_autocomplete";
import MultiGroupAutocomplete from "./multi_group_autocomplete";
import MultiAutocomplete from "./multi_autocomplete";
import MultiGroupCheckBox from "./multi_group_checkbox";
import MultiMultiCheckBox from "./multi_checkbox";
import BookingDetails from "./booking_detail";

import RenderDynamicForm from "./renderDynamicForm";
import RenderTableDynamicForm from "./renderTableDynamicForm";
import RenderScheduleDynamicForm from "./renderScheduleDynamicForm";
import RenderTableDynamicList from "./renderTableDynamicList";
import RenderEditor from "./renderEditor";
import RenderPageBuilder from "./renderPageBuilder";
import TreeBox from "./treeBox";
import Chatform from "./chatform";
import { crudService } from "../../_services";
import { Chat } from "@material-ui/icons";

class MyForm extends React.PureComponent {
  handleSubmit = (event) => {
    this.props.handleSubmit(event);
  };

  handleCancel = () => {
    this.props.handleCancel();
  };

  handleReject = (event) => {
    this.props.handleReject(event);
  };

  fileUpload = (event) => {
    this.props.fileUpload(event);
  };

  handleInputChange = (event) => {
    this.props.handleInputChange(event);
  };

  addDynamicForm = () => {
    this.props.addDynamicForm(
      this.props.dynamicForm.concat([this.props.dynamicFormFields])
    );
  };
  resetDynamicForm = (items) => {
    this.props.addDynamicForm(items);
  };

  addDynamicScheduleForm = (formFieldData, formOptions) => {
    if (formFieldData == null) {
      return this.props.warningAlert("Select required fields!");
    }
    const isDayExist = this.props.dynamicForm.findIndex(
      (dynamicForm) => dynamicForm.id === formFieldData.id
    );

    if (isDayExist < 0) {
      this.props.addDynamicForm(this.props.dynamicForm.concat([formFieldData]));
    } else {
      const { schedules } = this.props.dynamicForm[isDayExist];
      schedules.push(...formFieldData.schedules);
      this.props.addDynamicForm(this.props.dynamicForm);
    }
  };

  removeScheduleDynamicForm = (daysId, timeIndex) => {
    const newSchedule = this.props.dynamicForm.filter((day) => {
      if (day.id == daysId) {
        day.schedules = day.schedules.filter((t, idx) => idx !== timeIndex);
      }
      return day.schedules.length > 0;
    });

    this.props.removeScheduleDynamicForm(newSchedule);
  };

  addDynamicDailyScheduleForm = (formFieldData, formOptions) => {
    if (formFieldData == null) {
      return this.props.warningAlert("Select required fields!");
    }
    const isDayExist = this.props.dynamicForm.findIndex(
      (dynamicForm) => dynamicForm.date === formFieldData.date
    );
    if (isDayExist < 0) {
      this.props.addDynamicForm(this.props.dynamicForm.concat([formFieldData]));
    } else {
      const { schedules } = this.props.dynamicForm[isDayExist];
      schedules.push(...formFieldData.schedules);
      this.props.addDynamicForm(this.props.dynamicForm);
    }
  };

  removeDailyScheduleDynamicForm = (date, timeIndex) => {
    const newSchedule = this.props.dynamicForm.filter((day) => {
      if (day.date == date) {
        day.schedules = day.schedules.filter((t, idx) => idx !== timeIndex);
      }
      return day.schedules.length > 0;
    });

    this.props.removeScheduleDynamicForm(newSchedule);
  };

  addDynamicTableForm = async (formFieldData, formOptions) => {
    if (formFieldData) {
      if (formOptions) {
        formOptions.map(async (option) => {
          if (option.name === "question_id") {
            await crudService
              ._get(option.url, formFieldData.question_id)
              .then((response) => {
                if (response.status == 200) {
                  formFieldData["question"] = response.data.name;
                  const findQ = this.props.dynamicForm.findIndex(
                    (dynamicForm) =>
                      dynamicForm.question_id === formFieldData.question_id
                  );

                  if (findQ < 0) {
                    this.props.addDynamicForm(
                      this.props.dynamicForm.concat([formFieldData])
                    );
                  } else {
                    this.props.warningAlert("Data already exists");
                  }
                }
              });
          } else if (option.name === "country_groups_id") {
            if (option.value && option.value == 99999) {
              const findAll = this.props.dynamicForm.findIndex(
                (dynamicForm) =>
                  dynamicForm.country_groups_id ===
                    formFieldData.country_groups_id &&
                  dynamicForm.year === formFieldData.year
              );
              if (findAll < 0) {
                formFieldData["name"] = "All";
                this.props.addDynamicForm(
                  this.props.dynamicForm.concat([formFieldData])
                );
              } else {
                this.props.warningAlert("Data already exists");
              }
            } else {
              await crudService
                ._get(option.url, formFieldData.country_groups_id)
                .then((response) => {
                  if (response.status == 200) {
                    formFieldData["name"] = response.data.name;
                    this.props.addDynamicForm(
                      this.props.dynamicForm.concat([formFieldData])
                    );
                  }
                });
            }
          }
        });
      }
    } else {
      this.props.warningAlert("Please select fields");
    }
  };

  removeDynamicForm = (idx) => {
    this.props.removeDynamicForm(
      this.props.dynamicForm.filter((s, sidx) => idx !== sidx)
    );
  };

  handleFormInputChange = (dynamicForm) => {
    this.props.handleFormInputChange(dynamicForm);
  };

  openStepModal = (component) => {
    this.props.openModal({
      open: true,
      component: component,
    });
  };

  render() {
    const {
      formFields,
      classes,
      btnText,
      handleCancel,
      handleReject,
      dynamicForm,
      isExport,
      displayAddBtn = true,
    } = this.props;
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        {formFields.map((formField, index) => {
          switch (formField.type) {
            case "color":
              return (
                <RenderTextBox
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "select":
              return (
                <RenderSelectBox
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "autocomplete":
              return (
                <Autocomplete
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "multi_autocomplete":
              return (
                <MultiAutocomplete
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "group_autocomplete":
              return (
                <GroupAutocomplete
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "slot_autocomplete":
              return (
                <SlotAutocomplete
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "time_zone_autocomplete":
              return (
                <TimeZoneAutocomplete
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "multi_group_autocomplete":
              return (
                <MultiGroupAutocomplete
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "multi_checkbox":
              return (
                <MultiMultiCheckBox
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "multi_group_checkbox":
              return (
                <MultiGroupCheckBox
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "multiSelect":
              return (
                <RenderMultiSelectBox
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "password":
              return (
                <RenderPassBox
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "textarea":
              return (
                <RenderTextBox
                  key={index}
                  formField={formField}
                  multiline={true}
                  rowMax={3}
                  rows={3}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "file":
              return (
                <RenderFileBox
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "googleDriveFileUpload":
              return (
                <GoogleDriveFilebox
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "checkbox":
              return (
                <RenderCheckTextBox
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "treebox":
              return (
                <TreeBox
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "date":
              return (
                <RenderDate
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "imageUpload":
              return (
                <RenderImageUpload
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "chatform":
              return (
                <Chatform
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
              {
                /* case "booking_details":
              return (
                <BookingDetails
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              ); */
              }
            case "colorPicker":
              return (
                <RenderColorPicker
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "NA":
              return <span></span>;
            case "dynamic":
              return (
                <MuiCard key={index} className={classes.dynamicForm}>
                  <MuiCardHeader
                    action={
                      <Button
                        color="primary"
                        type="button"
                        onClick={this.addDynamicForm}
                      >
                        <Icon>add</Icon>
                      </Button>
                    }
                    title={
                      <Typography className={classes.cardIconTitle}>
                        {formField.label}
                      </Typography>
                    }
                  />
                  <MuiCardContent>
                    <RenderDynamicForm
                      resetDynamicForm={this.resetDynamicForm}
                      removeDynamicForm={this.removeDynamicForm}
                      removeScheduleDynamicForm={this.removeScheduleDynamicForm}
                      dynamicFormOptions={formField.options}
                      dynamicForm={dynamicForm}
                      handleFormInputChange={this.handleFormInputChange}
                    />
                  </MuiCardContent>
                </MuiCard>
              );
            case "dynamicTableForm":
              return (
                <MuiCard key={index} className={classes.dynamicForm}>
                  <MuiCardHeader
                    action={
                      <Button
                        color="primary"
                        type="button"
                        onClick={() =>
                          this.addDynamicTableForm(
                            formField.formFieldData,
                            formField.options
                          )
                        }
                      >
                        <Icon>add</Icon>
                      </Button>
                    }
                    title={
                      <Typography className={classes.cardIconTitle}>
                        {formField.label}
                      </Typography>
                    }
                  />

                  <MuiCardContent>
                    <RenderTableDynamicForm
                      resetDynamicForm={this.resetDynamicForm}
                      removeDynamicForm={this.removeDynamicForm}
                      removeScheduleDynamicForm={this.removeScheduleDynamicForm}
                      dynamicFormOptions={formField.options}
                      formColumn={formField.formColumn}
                      formData={formField.formData}
                      handleInputChange={this.handleInputChange}
                    />
                  </MuiCardContent>
                </MuiCard>
              );
            case "dynamicScheduleForm":
              return (
                <MuiCard key={index} className={classes.dynamicForm}>
                  <MuiCardHeader
                    action={
                      <Button
                        color="primary"
                        type="button"
                        onClick={() =>
                          this.addDynamicScheduleForm(
                            formField.formFieldData,
                            formField.options
                          )
                        }
                      >
                        <Icon>add</Icon>
                      </Button>
                    }
                    title={
                      <Typography className={classes.cardIconTitle}>
                        {formField.label}
                      </Typography>
                    }
                  />

                  <MuiCardContent>
                    <RenderScheduleDynamicForm
                      resetDynamicForm={this.resetDynamicForm}
                      removeScheduleDynamicForm={this.removeScheduleDynamicForm}
                      dynamicFormOptions={formField.options}
                      formColumn={formField.formColumn}
                      formData={formField.formData}
                      handleInputChange={this.handleInputChange}
                    />
                  </MuiCardContent>
                </MuiCard>
              );
            case "dynamicDailyScheduleForm":
              return (
                <MuiCard key={index} className={classes.dynamicForm}>
                  <MuiCardHeader
                    action={
                      <Button
                        color="primary"
                        type="button"
                        onClick={() =>
                          this.addDynamicDailyScheduleForm(
                            formField.formFieldData,
                            formField.options
                          )
                        }
                      >
                        <Icon>add</Icon>
                      </Button>
                    }
                    title={
                      <Typography className={classes.cardIconTitle}>
                        {formField.label}
                      </Typography>
                    }
                  />

                  <MuiCardContent>
                    <RenderScheduleDynamicForm
                      resetDynamicForm={this.resetDynamicForm}
                      removeScheduleDynamicForm={
                        this.removeDailyScheduleDynamicForm
                      }
                      dynamicFormOptions={formField.options}
                      formColumn={formField.formColumn}
                      formData={formField.formData}
                      handleInputChange={this.handleInputChange}
                    />
                  </MuiCardContent>
                </MuiCard>
              );
            case "dynamicTableList":
              return (
                <MuiCard key={index} className={classes.dynamicForm}>
                  <MuiCardHeader
                    title={
                      <Typography className={classes.cardIconTitle}>
                        {formField.label}
                      </Typography>
                    }
                  />

                  <MuiCardContent>
                    <RenderTableDynamicList
                      resetDynamicForm={this.resetDynamicForm}
                      dynamicFormOptions={formField.options}
                      formColumn={formField.formColumn}
                      formData={formField.formData}
                      url={formField.url}
                      handleInputChange={this.handleInputChange}
                    />
                  </MuiCardContent>
                </MuiCard>
              );
            case "steps":
              return (
                <Button
                  key={index}
                  color="primary"
                  type="button"
                  onClick={() => this.openStepModal(formField.component)}
                >
                  {formField.btnText}
                </Button>
              );
            case "editor":
              return (
                <RenderEditor
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "pageBuilder":
              return (
                <RenderPageBuilder
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
            default:
              return (
                <RenderTextBox
                  key={index}
                  formField={formField}
                  handleInputChange={this.handleInputChange}
                />
              );
          }
        })}
        {!isExport && displayAddBtn && (
          <Button
            color="primary"
            type="submit"
            className={classes.registerButton}
          >
            {btnText} {displayAddBtn}
          </Button>
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {handleReject && (
          <Button color="warning" type="button" onClick={this.handleReject}>
            Reject
          </Button>
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {handleCancel && (
          <Button color="danger" type="button" onClick={this.handleCancel}>
            Cancel
          </Button>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const { alert } = state;
  return {
    alert,
  };
};

const actionCreators = {
  warningAlert: alertActions.warning,
  openModal: modalActions.open,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actionCreators
  )(MyForm)
);

import React from "react";
import Table from "@material-ui/core/Table";
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.js";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ArrayHelper } from "../../_helpers";

import RenderSelectBox from "./renderSelect";
import RenderTextBox from "./renderTextbox";
import RenderCheckTextBox from "./renderChecktBox";
import Autocomplete from "./autocomplete";
import GroupAutocomplete from "./group_autocomplete";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class ScheduleDynamicForm extends React.PureComponent {
  handleInputChange = (event) => {
    this.props.handleInputChange(event);
  };

  onDragEnd = (result, formData) => {
    if (!result.destination) {
      return;
    }

    const items = ArrayHelper.ReorderArray(
      formData,
      result.source.index,
      result.destination.index
    );

    this.props.resetDynamicForm(items);
  };

  removeDynamicForm = (idx, index) => () => {
    this.props.removeScheduleDynamicForm(idx, index);
  };

  rederFormtable = (row, index) => {
    if (row.id && row.id != null && row.id != undefined) {
      return (
        <React.Fragment key={index}>
          <TableRow>
            <TableCell rowSpan={row.schedules.length + 1}>
              {row.day_of_week}
            </TableCell>
          </TableRow>
          {row.schedules &&
            row.schedules.map((data, timeIndex) => (
              <TableRow key={`${row.id}-${timeIndex}`}>
                <TableCell component="th" scope="row">
                  {data.start_time}
                </TableCell>
                <TableCell component="th" scope="row">
                  {data.end_time}
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="danger"
                    type="button"
                    onClick={this.removeDynamicForm(row.id, timeIndex)}
                  >
                    <Icon>delete</Icon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </React.Fragment>
      );
    } else if (row.date && row.date != null && row.date != undefined) {
      return (
        <React.Fragment key={index}>
          <TableRow>
            <TableCell rowSpan={row.schedules.length + 1}>{row.date}</TableCell>
          </TableRow>
          {row.schedules &&
            row.schedules.map((data, timeIndex) => (
              <TableRow key={`${row.id}-${timeIndex}`}>
                <TableCell component="th" scope="row">
                  {data.start_time}
                </TableCell>
                <TableCell component="th" scope="row">
                  {data.end_time}
                </TableCell>
                <TableCell component="th" scope="row">
                  {data.is_available ? "Yes" : "No"}
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="danger"
                    type="button"
                    onClick={this.removeDynamicForm(row.date, timeIndex)}
                  >
                    <Icon>delete</Icon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </React.Fragment>
      );
    }
  };

  render() {
    const { dynamicFormOptions, formColumn, formData } = this.props;
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        {dynamicFormOptions.map((dynamicFormOption) => {
          switch (dynamicFormOption.type) {
            case "select":
              return (
                <RenderSelectBox
                  formField={dynamicFormOption}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "autocomplete":
              return (
                <Autocomplete
                  formField={dynamicFormOption}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "group_autocomplete":
              return (
                <GroupAutocomplete
                  formField={dynamicFormOption}
                  handleInputChange={this.handleInputChange}
                />
              );
            case "checkbox":
              return (
                <RenderCheckTextBox
                  formField={dynamicFormOption}
                  handleInputChange={this.handleInputChange}
                />
              );
            default:
              return (
                <RenderTextBox
                  formField={dynamicFormOption}
                  handleInputChange={this.handleInputChange}
                />
              );
          }
        })}

        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {formColumn &&
                formColumn.map((row) => <TableCell>{row}</TableCell>)}

              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData &&
              formData.map((row, index) => this.rederFormtable(row, index))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
export default ScheduleDynamicForm;

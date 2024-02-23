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
import { crudService } from "../../_services";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import moment from "moment";

class ScheduleDynamicForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selectedOptions: [],
      list: [],
    };
  }

  handleInputChange = (event) => {
    const selectedBooking = this.state.list.filter(
      (data) => data.booking_id == event.target.name
    );
    const bookingAmt = selectedBooking.length
      ? selectedBooking[0].netAmount
      : 0;
    event.target.amount = bookingAmt;
    event.target.value = bookingAmt;
    this.props.handleInputChange(event);
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const [prevConsultantId] = prevProps.dynamicFormOptions.filter(
      (data) => data.name == "consultant_id"
    );
    const [currentConsultantId] = this.props.dynamicFormOptions.filter(
      (data) => data.name == "consultant_id"
    );
    if (currentConsultantId.value !== prevConsultantId.value) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { url, dynamicFormOptions } = this.props;
    console.log("dynamicFormOptions", dynamicFormOptions);
    const [isConsultantIdSet] = dynamicFormOptions.filter(
      (data) => data.name == "consultant_id"
    );
    let query = {};
    if (isConsultantIdSet && isConsultantIdSet.value) {
      dynamicFormOptions.forEach((element) => {
        query[element.name] = element.value;
      });

      crudService._getAllWithParam(url, query).then((result) => {
        if (result.status === 200) {
          this.setState({
            list: result.data,
          });
        }
      });
    }
  };

  renderBox = (row) => {
    const { dynamicFormOptions } = this.props;
    dynamicFormOptions.map((dynamicFormOption) => {
      switch (dynamicFormOption.type) {
        case "checkbox":
          return (
            <RenderCheckTextBox
              formField={dynamicFormOption}
              handleInputChange={this.handleInputChange}
            />
          );
        default:
          return row.id;
      }
    });
  };

  render() {
    const { dynamicFormOptions, formColumn, formData } = this.props;
    const { list } = this.state;
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {formColumn &&
                formColumn.map((row) => <TableCell>{row}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row, index) => {
              const formField = {
                name: `${row.booking_id}`,
                label: "",
                value: formData.includes(row.booking_id) ? true : false,
              };
              return (
                <TableRow key={index}>
                  <TableCell>
                    <RenderCheckTextBox
                      formField={formField}
                      handleInputChange={this.handleInputChange}
                    />
                  </TableCell>
                  <TableCell>{row.total_amount}</TableCell>
                  <TableCell>{row.deduction}</TableCell>
                  <TableCell>{row.netAmount}</TableCell>
                  <TableCell>{row.skill}</TableCell>
                  <TableCell>
                    {moment(row.booking_date).format("DD-MM-YYYY")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}
export default ScheduleDynamicForm;

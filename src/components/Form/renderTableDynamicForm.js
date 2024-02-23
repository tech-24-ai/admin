import React from "react";
import Table from '@material-ui/core/Table';
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.js";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ArrayHelper } from '../../_helpers';

import RenderSelectBox from './renderSelect'
import RenderTextBox from './renderTextbox'
import RenderCheckTextBox from './renderChecktBox'
import Autocomplete from './autocomplete'
import GroupAutocomplete from './group_autocomplete'

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class TableDynamicForm extends React.PureComponent {

    handleInputChange = (event) => {
        this.props.handleInputChange(event);
    }

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
    }

    removeDynamicForm = idx => () => {
        this.props.removeDynamicForm(idx)
    }

    rederFormtable = (row, index) => {
            if(row.question_id && row.question_id != null && row.question_id != undefined ) {
                return (
                    <Draggable key={row.question_id} draggableId={String(row.question_id)} index={index}>
                    {(provided) => (
                        <TableRow ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <TableCell>
                                <Icon>drag_handle</Icon>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.question}
                            </TableCell>
                            <TableCell>{row.is_advanced ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="right">
                                <Button color="danger" type="button" onClick={this.removeDynamicForm(index)}>
                                    <Icon>delete</Icon>
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </Draggable>
                )   
            } else {
                return (
                    <Draggable key={row.country_groups_id} draggableId={String(row.country_groups_id)} index={index}>
                    {(provided) => (
                        <TableRow ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <TableCell>
                                <Icon>drag_handle</Icon>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                 {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.year}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.price}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.deal_size}
                            </TableCell>
                            <TableCell align="right">
                                <Button color="danger" type="button" onClick={this.removeDynamicForm(index)}>
                                    <Icon>delete</Icon>
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </Draggable>
                )
            }
    }

    render() {
        const { dynamicFormOptions, formColumn, formData } = this.props

        return (
            <div style={{ marginTop: 10, marginBottom: 10 }}>

                {dynamicFormOptions.map(dynamicFormOption => {
                    switch (dynamicFormOption.type) {
                        case 'select':
                            return (
                                <RenderSelectBox formField={dynamicFormOption} handleInputChange={this.handleInputChange} />
                            )
                        case 'autocomplete':
                            return (<Autocomplete formField={dynamicFormOption} handleInputChange={this.handleInputChange} />)
                        case 'group_autocomplete':
                            return (<GroupAutocomplete formField={dynamicFormOption} handleInputChange={this.handleInputChange} />)
                        case 'checkbox':
                            return (
                                <RenderCheckTextBox formField={dynamicFormOption} handleInputChange={this.handleInputChange} />
                            )
                        default:
                            return (
                                <RenderTextBox formField={dynamicFormOption} handleInputChange={this.handleInputChange} />
                            )
                    }
                })}

                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {formColumn && formColumn.map((row) => (
                                <TableCell>{row}</TableCell>
                            ))}

                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>


                    <DragDropContext onDragEnd={(event) => this.onDragEnd(event, formData)}>
                        <Droppable droppableId="tableFormDroppable">
                            {(provided) => (
                                <TableBody {...provided.droppableProps}
                                    ref={provided.innerRef}>

                                    {formData && formData.map((row, index) => (
                                        this.rederFormtable(row, index) 
                                    ))}
                                    {provided.placeholder}
                                </TableBody>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Table>
            </div>
        )
    }
}
export default TableDynamicForm
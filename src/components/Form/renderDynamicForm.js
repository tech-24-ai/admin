import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { ArrayHelper } from '../../_helpers';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import CustomSelect from "components/CustomSelect/CustomSelect.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

import MuiCard from '@material-ui/core/Card';
import MuiCardContent from '@material-ui/core/CardContent';
import MuiCardActions from '@material-ui/core/CardActions';

import Autocomplete from './autocomplete'
import AutocompleteOption from './autocompleteOption'

class DynamicForm extends React.PureComponent {

    handleFormInputChange(event, idx) {
        const dynamicForm = this.props.dynamicForm.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;

            if (event.target.type === 'checkbox') {
                shareholder[event.target.name] = event.target.checked;
            } else {
                shareholder[event.target.name] = event.target.value;
            }

            return { ...shareholder, shareholder };
        });
        this.props.handleFormInputChange(dynamicForm)
    }

    handleFormAutoChange(event, idx) {
        const dynamicForm = this.props.dynamicForm.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;

            shareholder[event.target.name] = event.target.value;

            return { ...shareholder, shareholder };
        });
        this.props.handleFormInputChange(dynamicForm)
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

    removeDynamicForm = (idx) => {
        this.props.removeDynamicForm(idx)
    }

    render() {
        const { dynamicFormOptions, dynamicForm, classes } = this.props

        return (
            <div style={{ marginTop: 10, marginBottom: 10 }}>
                <DragDropContext onDragEnd={(event) => this.onDragEnd(event, dynamicForm)}>
                    <Droppable droppableId="dynamicFormDroppable">
                        {(provided) => (
                            <div {...provided.droppableProps}
                                ref={provided.innerRef}>
                                {dynamicForm.map((inputField, index) => {
                                    return (
                                        <Draggable key={index} draggableId={`draggableId${index}`} index={index}>
                                            {(provided) => (
                                                <MuiCard className={classes.dragCard}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>

                                                    <MuiCardContent>

                                                        <div style={{ textAlign: 'center' }}>
                                                            <Icon>drag_handle</Icon>
                                                        </div>

                                                        {dynamicFormOptions.map(dynamicFormOption => {
                                                            if (dynamicFormOption.type === 'autocomplete') {
                                                                dynamicFormOption.value = inputField[dynamicFormOption.name]
                                                                return (<Autocomplete formField={dynamicFormOption} handleInputChange={event => this.handleFormAutoChange(event, index)} />)
                                                            }

                                                            if (dynamicFormOption.type === 'select') {
                                                                return (
                                                                    <CustomSelect
                                                                        title={dynamicFormOption.label}
                                                                        name={dynamicFormOption.name}
                                                                        value={inputField[dynamicFormOption.name]}
                                                                        items={dynamicFormOption.options}
                                                                        onChange={event => this.handleFormInputChange(event, index)}
                                                                    />
                                                                )
                                                            }
                                                            if (dynamicFormOption.type === 'autocomplete_option') {
                                                                return (
                                                                    <div style={{ zIndex: 1000, marginBottom: 50 }}>
                                                                        <AutocompleteOption
                                                                            title={dynamicFormOption.label}
                                                                            name={dynamicFormOption.name}
                                                                            value={inputField[dynamicFormOption.name]}
                                                                            options={dynamicFormOption.options}
                                                                            getOptionLabel={dynamicFormOption.getOptionLabel}
                                                                            getOptionValue={dynamicFormOption.getOptionValue}
                                                                            onChange={event => this.handleFormInputChange(event, index)}
                                                                        />
                                                                    </div>
                                                                )
                                                            }
                                                            if (dynamicFormOption.type === 'textbox') {
                                                                return (
                                                                    <CustomInput
                                                                        labelText={dynamicFormOption.label}
                                                                        formControlProps={{
                                                                            fullWidth: true
                                                                        }}
                                                                        inputProps={{
                                                                            value: inputField[dynamicFormOption.name],
                                                                            name: dynamicFormOption.name,
                                                                            onChange: event => {
                                                                                this.handleFormInputChange(event, index)
                                                                            },
                                                                        }}
                                                                    />
                                                                )
                                                            }
                                                            if (dynamicFormOption.type === 'checkbox') {
                                                                return (
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                name={dynamicFormOption.name}
                                                                                tabIndex={-1}
                                                                                checked={inputField[dynamicFormOption.name] ? true : false}
                                                                                onClick={(event) => this.handleFormInputChange(event, index)}
                                                                                checkedIcon={<Check className={classes.checkedIcon} />}
                                                                                icon={<Check className={classes.uncheckedIcon} />}
                                                                                classes={{
                                                                                    checked: classes.checked,
                                                                                    root: classes.checkRoot
                                                                                }}
                                                                            />
                                                                        }
                                                                        classes={{
                                                                            label: classes.label,
                                                                            root: classes.labelRoot
                                                                        }}
                                                                        label={dynamicFormOption.label}
                                                                    />
                                                                )
                                                            }
                                                            return null
                                                        })}


                                                    </MuiCardContent>
                                                    <MuiCardActions disableSpacing>

                                                        <Button color="danger" type="button" onClick={() => this.removeDynamicForm(index)}>
                                                            <Icon>delete</Icon>
                                                        </Button>
                                                    </MuiCardActions>
                                                    {provided.placeholder}
                                                </MuiCard>
                                            )
                                            }
                                        </Draggable>
                                    )
                                })}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div >
        )
    }
}
export default withStyles(styles)(DynamicForm)
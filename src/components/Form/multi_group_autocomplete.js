import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { crudService } from '../../_services';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
const selectAllOption = {
    value: "SELECT_ALL",
    label: "Select All"
};
class MuiAutocompleteBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            options: [],
            selectOptions: [],
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        const { formField } = this.props
        crudService._getAllWithParam(formField.url, {})
            .then(
                result => {
                    if (result.status === 200) {
                        this.setState({
                            options: result.data,
                        }, () => this.bindOptions())
                    }
                }
            );
    }

    bindOptions = () => {
        const { options } = this.state;
        const selectOptions = [];
    
        const processElement = (element, prefix = '') => {
            const label = `${prefix}${this.getLabel(element)}`;
            const value = this.getValue(element);
            
            selectOptions.push({ label, value });
    
            if (element.children && element.children.length) {
                element.children.forEach(child => {
                    processElement(child, `${label} > `);
                });
            }
        };
    
        if (options) {
            options.forEach(element => {
                processElement(element);
            });
        }
    
        this.setState({ selectOptions });
    }

    handleChange = (e, values) => {
        e.persist();
        const { formField } = this.props
        const { selectOptions } = this.state
        let selectedValues = []

        if (values) {
            values.forEach(element => {
                if (element.value === 'SELECT_ALL') {
                    selectedValues = []
                    if (selectOptions) {
                        selectOptions.forEach(optionElement => {
                            if (optionElement.value !== 'SELECT_ALL') {
                                selectedValues.push(optionElement.value)
                            }
                        });
                    }
                } else {
                    selectedValues.push(element.value)
                }
            });
        }

        const event = {
            target: {
                name: formField.name,
                value: selectedValues
            }
        }
        this.props.handleInputChange(event)
    }

    getLabel = (element) => {
        const { formField } = this.props
        return element[formField.getOptionLabel]
    }
    getValue = (element) => {
        const { formField } = this.props
        return element[formField.getOptionValue]
    }

    render() {
        const { formField } = this.props
        const { selectOptions } = this.state
        let selectedOptions = []
        if (selectOptions) {
            selectOptions.forEach(element => {
                if (formField.value.includes(element.value)) {
                    selectedOptions.push(element)
                }
            });
        }

        return (
            <div style={{ marginTop: 10, marginBottom: 10 }}>
                <FormControl
                    error={formField.error ? true : false}
                    fullWidth={true}
                >

                    <Autocomplete
                        multiple
                        name={formField.name}
                        label={formField.label}
                        limitTags={2}
                        id={formField.label}
                        options={selectOptions}
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        value={selectedOptions}
                        onChange={this.handleChange}
                        renderInput={(params) => (
                            <TextField {...params} label={formField.label} placeholder={formField.label} />
                        )}
                    />

                    {formField.error && <FormHelperText>{formField.error}</FormHelperText>}
                </FormControl>
            </div>
        )
    }
}


export default MuiAutocompleteBox;
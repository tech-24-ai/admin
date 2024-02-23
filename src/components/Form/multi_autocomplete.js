import React from 'react';
import PropTypes from 'prop-types';
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
            searchText: '',
            options: [],
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        const { formField } = this.props
        let { searchText } = this.state
        let query = {}
        query['search'] = searchText
        if (formField.options) {
            formField.options.forEach(element => {
                query[element.name] = element.value
            });
        }
        crudService._getAllWithParam(formField.url, query)
            .then(
                result => {
                    if (result.status === 200) {
                        this.setState({
                            options: result.data,
                        })
                    }
                }
            );
    }

    handleChange = (e, values) => {
        e.persist();
        const { formField } = this.props
        const { options } = this.state
        let selectedValues = []
        if (values) {
            values.forEach(element => {

                if (element.value === 'SELECT_ALL') {
                    if (options) {
                        options.forEach(optionElement => {
                            const newOption = {
                                label: optionElement[formField.getOptionLabel],
                                value: optionElement[formField.getOptionValue],
                            }
                            if (!values.some(option => option.value === newOption.value)) {
                                selectedValues.push({
                                    [formField.getOptionLabel]: newOption.label,
                                    [formField.getOptionValue]: newOption.value,
                                })
                            }
                        });
                    }
                } else {
                    selectedValues.push({
                        [formField.getOptionLabel]: element.label,
                        [formField.getOptionValue]: element.value,
                    })
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
        const { options } = this.state
        let selectedOptions = []
        let selectOptions = []
        selectOptions.push(selectAllOption)
        if (formField.value) {
            if (formField.value.length) {
                formField.value.forEach(element => {
                    const newOption = {
                        label: element[formField.getOptionLabel],
                        value: element[formField.getOptionValue],
                    }
                    selectedOptions.push(newOption)
                    selectOptions.push(newOption)
                });
            }
        }

        if (options) {
            options.forEach(element => {
                const newOption = {
                    label: element[formField.getOptionLabel],
                    value: element[formField.getOptionValue],
                }
                if (!selectedOptions.some(option => option.value === newOption.value)) {
                    selectOptions.push(newOption)
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
                        onOpen={this.fetchData}
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

MuiAutocompleteBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
};

MuiAutocompleteBox.defaultProps = {
    name: "",
    label: "",
    value: [],
}


export default MuiAutocompleteBox;
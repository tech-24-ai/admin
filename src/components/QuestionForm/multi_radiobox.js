import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import SelectBox from './selectbox'

const priorities = [
    {
        id: 1,
        name: 'Priority 1'
    },
    {
        id: 2,
        name: 'Priority 2'
    },
    {
        id: 3,
        name: 'Priority 3'
    },
    {
        id: 4,
        name: 'Priority 4'
    },
    {
        id: '5',
        name: 'Priority 5'
    }
]

class Form extends React.Component {

    constructor() {
        super()
        this.state = {
            value: [],
            subValue: [],
        }
    }
    handleChange = (e, option) => {
        e.persist()
        if (e.target.name) {
            let { value } = this.state
            if (value.includes(option.id)) {
                let i = value.indexOf(option.id);
                if (i !== -1) value.splice(i, 1);
            } else {
                value.push(option.id)
            }
            this.setState(value)
            this.props.handleChange(this.state.value, e.target.name, this.state.subValue)
        }
    }

    handleSelectChange = (data, name, option) => {
        let { subValue } = this.state

        let haveValue = false
        let valueIndex
        subValue.forEach((element, i) => {
            if (element.id === option.id) {
                haveValue = true
                valueIndex = i
            }
        });

        if (haveValue) {
            subValue.splice(valueIndex, 1)
            subValue.push({
                id: option.id,
                value: data
            })
        } else {
            subValue.push({
                id: option.id,
                value: data
            })
        }

        this.setState(subValue)

        this.props.handleChange(this.state.value, name, this.state.subValue)
    }

    render() {
        const { name, label, options, helperText, value, subValue } = this.props
        return (
            <React.Fragment>
                <FormControl
                    error={helperText ? true : false}
                    fullWidth={true}
                >
                    <FormLabel component="legend">{label}</FormLabel>

                    {options && options.map(option => {

                        let subValueData
                        if (subValue && subValue) {
                            subValue.forEach(priority => {
                                if (priority.id === option.id) {
                                    subValueData = priority.value
                                }
                                return null
                            })
                        }

                        let finalValue = false

                        if (typeof value == 'string' || typeof value == 'number') {
                            if (option.id === value) {
                                finalValue = true
                            }
                        } else {
                            if (value !== undefined && value.includes(option.id)) {
                                finalValue = true
                            }
                        }

                        return (
                            <RadioGroup aria-label="position" row>
                                <FormControlLabel
                                    checked={finalValue}
                                    name={name}
                                    control={<Radio />}
                                    label={option.name}
                                    labelPlacement="end"
                                    onClick={e => this.handleChange(e, option)}
                                />

                                {finalValue && option.have_priority === 1 && <div style={{ marginTop: -15 }}>
                                    <SelectBox
                                        style={{ width: 200 }}
                                        label='Priority'
                                        name='Priority'
                                        fullWidth={false}
                                        options={priorities}
                                        value={subValueData}
                                        handleChange={e => this.handleSelectChange(e, name, option)}
                                    />
                                </div>}
                            </RadioGroup>
                        )
                    })}
                </FormControl>

            </React.Fragment>
        )

    }
}

export default Form;
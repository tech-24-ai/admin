import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class Form extends React.Component {

    handleChange = (e, option) => {
        e.persist()
        this.props.handleChange(option.id, e.target.name, [])
    }

    render() {
        const { name, label, options, helperText, value, index } = this.props
        
        return (
            <React.Fragment>
                <FormControl
                    error={helperText ? true : false}
                    fullWidth={true}
                >
                    <FormLabel component="legend">{label}</FormLabel>

                    {options && options.map(option => {
                        return (
                            <RadioGroup aria-label="position" row>
                                <FormControlLabel
                                    checked={value == option.id ? true : false}
                                    name={name}
                                    index={index}
                                    control={<Radio />}
                                    label={option.name}
                                    labelPlacement="end"
                                    onChange={e => this.handleChange(e, option)}
                                />
                            </RadioGroup>
                        )
                    })}
                </FormControl>

            </React.Fragment>
        )

    }
}

export default Form;
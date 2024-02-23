import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import { crudService } from '../../_services';
import { withStyles } from "@material-ui/core/styles";


const styles = ((theme) => ({
    root: {
        width: '100%',
    },
}));

class MuiMultiCheckBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            options: [],
            selectedOptions: [],
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
                        })
                    }
                }
            );
    }

    handleChange = (e, value) => {
        e.persist();
        const { formField } = this.props
        const selectedOptions = formField.value

        if (e.target.checked) {
            selectedOptions.push(value)
        } else {
            const index = selectedOptions.indexOf(value)
            if (index >= 0) {
                selectedOptions.splice(index, 1)
            }
        }

        const event = {
            target: {
                name: formField.name,
                value: selectedOptions
            }
        }
        this.props.handleInputChange(event)
    }

    handleCheckAll = (e) => {
        e.persist()
        const { options } = this.state
        const { formField } = this.props
        let selectedOptions = []

        if (e.target.checked) {
            options.forEach(element => {
                selectedOptions.push(this.getValue(element))
            });
        } else {
            selectedOptions = []
        }

        const event = {
            target: {
                name: formField.name,
                value: selectedOptions
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

        let parentChecked = false

        if(formField.value && formField.value.length){
            parentChecked = true 
        }

        return (
            <div style={{ marginTop: 10, marginBottom: 10 }}>
                <FormControl
                    error={formField.error ? true : false}
                    fullWidth={true}
                >
                    <FormControlLabel
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={
                            <Checkbox
                                checked={parentChecked}
                                onChange={(e) => this.handleCheckAll(e)}
                            />
                        }
                        label={formField.label}
                    />

                    <FormGroup>

                        <Grid container>
                            {options && options.map((option) => {
                                let checked = false
                                if (formField.value) {
                                    checked = formField.value.includes(this.getValue(option))
                                }
                                return (
                                    <Grid container item xs={6} md={4}>
                                        <FormControlLabel
                                            control={<Checkbox checked={checked} onChange={(e) => this.handleChange(e, this.getValue(option))} />}
                                            label={this.getLabel(option)}
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>

                    </FormGroup>

                    {formField.error && <FormHelperText>{formField.error}</FormHelperText>}
                </FormControl>
            </div>
        )
    }
}


export default withStyles(styles)(MuiMultiCheckBox)
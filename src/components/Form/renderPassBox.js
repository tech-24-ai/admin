import React from "react";
import Icon from "@material-ui/core/Icon";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

class RenderPassBox extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: [],
        }
    }

    handleChange = (e) => {
        e.persist();
        const event = {
            target: {
                name: e.target.name,
                value: e.target.value
            }
        }
        this.props.handleInputChange(event)
    }

    handleShowPassword = (value) => {
        const { showPassword } = this.state
        showPassword[value] = !showPassword[value]
        this.setState(showPassword);
    }


    render() {
        const { formField, handleInputChange, classes } = this.props
        const { showPassword } = this.state

        return (
            <div style={{ marginTop: 10, marginBottom: 10 }}>
                <CustomInput
                    success={!formField.error}
                    error={!!formField.error}
                    labelText={formField.label}
                    helperText={formField.error}
                    id={formField.name}
                    key={formField.name}
                    formControlProps={{
                        fullWidth: true
                    }}
                    type={showPassword[formField.name] ? 'textbox' : 'password'}
                    inputProps={{
                        value: formField.value,
                        name: formField.name,
                        onChange: this.handleChange,
                        endAdornment: (
                            <InputAdornment position="end">
                                <Icon className={classes.inputAdornmentIcon} onClick={() => { this.handleShowPassword(formField.name) }}>
                                    {showPassword[formField.name] ? "visibility" : "visibility_off"}
                                </Icon>
                            </InputAdornment>
                        )
                    }}

                />
            </div>
        )
    }
}
export default withStyles(styles)(RenderPassBox)
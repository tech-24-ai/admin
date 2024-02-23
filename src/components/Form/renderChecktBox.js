import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

class RenderCheckTextBox extends React.PureComponent {

    render() {
        const { formField, handleInputChange, classes } = this.props
        return (
            <div style={{ marginTop: 10, marginBottom: 10 }} key={formField.name}>
                <FormControlLabel
                    control={
                        <Checkbox
                            name={formField.name}
                            tabIndex={-1}
                            checked={formField.value}
                            onClick={(event) => handleInputChange(event)}
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
                    label={formField.label}
                />
            </div>
        )
    }
}
export default withStyles(styles)(RenderCheckTextBox)
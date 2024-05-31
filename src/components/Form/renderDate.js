import React from "react";
import Icon from "@material-ui/core/Icon";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import moment from "moment";
class RenderDate extends React.PureComponent {
  handleChange = (e) => {
    e.persist();
    const event = {
      target: {
        name: e.target.name,
        value: e.target.value,
      },
    };
    this.props.handleInputChange(event);
  };

  render() {
    const { formField, classes, multiline, rowMax, rows } = this.props;
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <CustomInput
          success={!formField.error}
          error={formField.error}
          labelText={formField.label}
          helperText={formField.error}
          id={formField.name}
          disabled={formField.disabled}
          key={formField.name}
          multiline={multiline}
          rowMax={rowMax}
          rows={rows}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            value: moment(formField.value).format("YYYY-MM-DD"),
            name: formField.name,
            type: formField.type,
            onChange: this.handleChange,
            endAdornment: (
              <InputAdornment position="end">
                {formField.icon && (
                  <Icon className={classes.inputAdornmentIcon}>
                    {formField.icon}
                  </Icon>
                )}
              </InputAdornment>
            ),
          }}
        />
        {formField?.extra_info}
      </div>
    );
  }
}
export default withStyles(styles)(RenderDate);

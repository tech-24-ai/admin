import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/components/customInputStyle.js";
const useStyles = makeStyles(styles);

export default function CustomSelect(props) {
  const classes = useStyles();
  const handleChange = (param) => {
    if (props && props.onChange) {
      props.onChange(param);
    }
  };

  const { value, name, title, items, id, error, success, helperText } = props;

  let helpTextClasses = classNames({
    [classes.labelRootError]: error,
    [classes.labelRootSuccess]: success && !error,
  });

  return (
    <FormControl fullWidth className={classes.selectFormControl}>
      <InputLabel htmlFor={`${name}-select`} className={classes.selectLabel}>
        {title}
      </InputLabel>
      <Select
        MenuProps={{
          className: classes.selectMenu,
        }}
        classes={{
          select: classes.select,
        }}
        value={value}
        onChange={(event) => handleChange(event)}
        inputProps={{
          name: name,
          id: `${name}-select`,
        }}
      >
        <MenuItem
          disabled
          classes={{
            root: classes.selectMenuItem,
          }}
        >
          Choose Item
        </MenuItem>

        {items &&
          items.length &&
          items.map((value) => {
            return (
              <MenuItem
                key={value.id}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected,
                }}
                value={value.id}
              >
                {value.name}
              </MenuItem>
            );
          })}
      </Select>

      {helperText !== undefined ? (
        <FormHelperText id={id + "-text"} className={helpTextClasses}>
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}

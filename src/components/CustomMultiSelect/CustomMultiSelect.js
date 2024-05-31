import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/components/customInputStyle.js";
import { crudService } from "../../_services";
const useStyles = makeStyles(styles);
export default function CustomMultiSelect(props) {
  const classes = useStyles();
  const {
    value,
    name,
    title,
    items,
    id,
    error,
    success,
    helperText,
    disabled,
  } = props;
  let selected = [];

  const [apiOptions, setApiOptions] = useState([]);
  const [list, setList] = useState(items);
  let helpTextClasses = classNames({
    [classes.labelRootError]: error,
    [classes.labelRootSuccess]: success && !error,
  });

  const handleChange = (param) => {
    const value = param.target.value;
    let op = [];
    if (value[value.length - 1] === "all") {
      op = value.length - 1 === list.length ? [] : list.map((x) => x.id);
      param.target.value = op;
      props.onChange(param);
      return;
    }
    op = value;
    param.target.value = op;
    props.onChange(param);
  };

  const fetchData = () => {
    setApiOptions({
      options: [],
      loading: true,
    });
    const { url } = props;
    crudService._getAllWithParam(url).then((result) => {
      if (result.status === 200) {
        setApiOptions({
          options: result.data,
          loading: false,
        });
        setList(
          result.data.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  selected = [];
  if (!props.url) {
    if (items && items.length) {
      items.map((item) => {
        if (value.includes(item.id) === true) {
          selected.push(item.name);
        }
        return null;
      });
    }
  } else {
    if (apiOptions.options && apiOptions.options.length) {
      apiOptions.options.map((item) => {
        if (value.includes(item.id) === true) {
          selected.push(item.name);
        }
        return null;
      });
    }
  }
  const isAllSelected = list && list.length > 0 && value.length === list.length;

  return (
    <FormControl fullWidth className={classes.selectFormControl}>
      <InputLabel htmlFor={`${name}-select`} className={classes.selectLabel}>
        {title}
      </InputLabel>

      <Select
        MenuProps={{
          className: classes.selectMenu,
          autoFocus: false,
        }}
        classes={{
          select: classes.select,
        }}
        value={value}
        multiple
        displayEmpty={true}
        renderValue={(renderItem) => {
          if (selected) {
            return selected.join(", ");
          }
          return renderItem.join(",");
        }}
        onChange={(event) => handleChange(event)}
        inputProps={{
          name: name,
          id: `${name}-select`,
        }}
        disabled={disabled}
      >
        <MenuItem
          disabled
          classes={{
            root: classes.selectMenuItem,
          }}
        >
          Choose Item
        </MenuItem>
        <MenuItem value="all">
          <Checkbox checked={isAllSelected} />
          Select All
        </MenuItem>
        {list &&
          list.length &&
          list.map((item) => {
            return (
              <MenuItem
                key={item.id}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected,
                }}
                value={item.id}
              >
                <Checkbox checked={value.indexOf(item.id) > -1} />
                {item.name}
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

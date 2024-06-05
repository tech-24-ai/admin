import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: [],
      subValue: [],
      subOption: [],
    };
  }

  handleChange = (e, option) => {
    e.persist();
    let { value } = this.state;
    if (value.includes(option.id)) {
      let i = value.indexOf(option.id);
      if (i !== -1) value.splice(i, 1);
    } else {
      value.push(option.id);
    }
    this.setState(value);
    this.props.handleChange(
      this.state.value,
      e.target.name,
      this.state.subValue
    );
  };

  handlePriorityChange = (e, name, option) => {
    e.persist();
    const { priority } = this.props;
    const currentSelection = e.target.value;

    let newPriority = priority ? [...priority] : [];
    const optionPriorityIndex = newPriority.findIndex(p => p.id === option.id);

    if (optionPriorityIndex !== -1) {
        let { value, id } = newPriority[optionPriorityIndex];
        const selectionIndex = value.indexOf(currentSelection);

        if (e.target.checked) {
            if (selectionIndex === -1) {
                value.push(currentSelection);
            }
            if (value.length === 4) {
                value = ["0"];
            }
        } else {
            if (selectionIndex !== -1) {
                value.splice(selectionIndex, 1);
            }
            if (selectionIndex === -1 && value.length === 1 && value[0] === "0") {
                value = ["1", "2", "3", "4"].filter(e => e !== currentSelection);
            }
        }

        newPriority[optionPriorityIndex] = { id, value };
    } else {
        newPriority.push({ id: option.id.toString(), value: [currentSelection] });
    }

    this.handlePriorityChange(name, newPriority);
  };

  handleSubChange = (e, name, option, subOptionData) => {
    let { subValue, subOption } = this.state;

    if (subOption.includes(subOptionData.id)) {
      let i = subOption.indexOf(subOptionData.id);
      if (i !== -1) subOption.splice(i, 1);
    } else {
      subOption.push(subOptionData.id);
    }
    this.setState(subOption);

    let haveValue = false;
    let valueIndex;
    subValue.forEach((element, i) => {
      if (element.id === option.id) {
        haveValue = true;
        valueIndex = i;
      }
    });

    if (haveValue) {
      subValue.splice(valueIndex, 1);
      subValue.push({
        id: option.id,
        value: this.state.subOption,
      });
    } else {
      subValue.push({
        id: option.id,
        value: this.state.subOption,
      });
    }

    this.setState(subValue);

    this.props.handleChange(this.state.value, name, this.state.subValue);
  };

  getPriorityComponent = (IsChecked = false, value) => {
    return (
      <span
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          width: "22px",
          height: "22px",
          lineHeight: "22px",
          fontSize: "14px",
          borderRadius: "3px",
          textAlign: "center",
          color: IsChecked ? "#f0f0f0" : "#272727",
          backgroundColor: IsChecked ? "#3f51b5" : "#f0f0f0",
          position: "relative",
          boxShadow: "0 1.5px 3px 0 rgb(0 0 0 / 16%)",
          fontWeight: "bolder",
        }}
      >
        {value}
      </span>
    );
  };

  render() {
    const {
      label,
      options,
      name,
      required,
      value,
      subValue,
      priority,
    } = this.props;
    const priorityList = ["1", "2", "3", "4"];
    return (
      <React.Fragment>
        <FormControl fullWidth={true}>
          <FormLabel component="legend">{label}</FormLabel>
          {options &&
            options.map((option) => {
              let subValueData;
              if (subValue) {
                subValue.forEach((element) => {
                  if (element.id == option.id) {
                    subValueData = element.value;
                  }
                  return null;
                });
              }

              let priorityData = [];
              if (priority && priority.length) {
                priority.forEach((element) => {
                  if (element.id == option.id) {
                    if (element.value == "0") {
                      priorityData = priorityList;
                    } else {
                      priorityData = element.value;
                    }
                  }
                  return null;
                });
              }

              let finalValue = false;
              if (typeof value == "string" || typeof value == "number") {
                if (option.id == value) {
                  finalValue = true;
                }
              } else {
                let finalValues = [];
                if (value && value !== undefined) {
                  value.forEach((element) => {
                    finalValues.push(Number(element));
                  });
                }
                if (finalValues.includes(option.id)) {
                  finalValue = true;
                }
              }

              if (!option.sub_options.length) {
                return (
                  <React.Fragment>
                    <FormGroup
                      aria-label="position"
                      row
                      style={{ marginTop: "10px" }}
                    >
                      <FormControlLabel
                        style={{ maxWidth: "370px", marginTop: "10px" }}
                        checked={finalValue}
                        name={name}
                        control={
                          <Checkbox color="primary" required={required} />
                        }
                        label={option.name}
                        labelPlacement="end"
                        onChange={(e) => this.handleChange(e, option)}
                      />
                      {option.have_priority == true && (
                        <div>
                          {/* <FormLabel
                            component="h5"
                            style={{ marginBottom: 0, fontSize: "14px" }}
                          >
                            Priority
                          </FormLabel> */}
                          <h6
                            style={{
                              marginBottom: 0,
                              fontSize: "12px",
                              color: "rgba(0, 0, 0, 0.50)",
                              textTransform: "none",
                            }}
                          >
                            Priority
                          </h6>
                          {priorityList.map((e, i) => (
                            <Checkbox
                              style={{ padding: "0 15px 0 0" }}
                              color="primary"
                              size="small"
                              checked={priorityData.includes(e)}
                              icon={this.getPriorityComponent(false, e)}
                              checkedIcon={this.getPriorityComponent(true, e)}
                              required={required}
                              value={e}
                              onChange={(e) =>
                                this.handlePriorityChange(e, name, option)
                              }
                            />
                          ))}
                        </div>
                      )}
                    </FormGroup>
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment>
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        checked={finalValue}
                        name={name}
                        control={
                          <Checkbox color="primary" required={required} />
                        }
                        label={option.name}
                        labelPlacement="end"
                        onChange={(e) => this.handleChange(e, option)}
                      />
                    </FormGroup>

                    {option.sub_options.map((subOption) => {
                      return (
                        <div style={{ marginLeft: 50 }}>
                          <FormGroup aria-label="position" row>
                            <FormControlLabel
                              checked={
                                subValueData !== undefined &&
                                subValueData.includes(subOption.id)
                                  ? true
                                  : false
                              }
                              name={name}
                              control={
                                <Checkbox color="primary" required={required} />
                              }
                              label={subOption.name}
                              labelPlacement="end"
                              onChange={(e) =>
                                this.handleSubChange(e, name, option, subOption)
                              }
                            />
                          </FormGroup>
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              }
            })}
        </FormControl>
      </React.Fragment>
    );
  }
}

export default Form;

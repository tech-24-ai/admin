import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import ReactSelectMaterialUi from "react-select-material-ui";

class MuiAutocompleteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      value: "",
    };
  }

  componentDidMount() {
    this.setState({ options: this.props.options });
  }

  handleChange = (value, name) => {
    const event = {
      target: {
        name: name,
        value: value,
      },
    };
    this.props.onChange(event);
    this.setState({ value: "" });
  };

  render() {
    const {
      label,
      options,
      getOptionLabel,
      getOptionValue,
      value,
      error,
      name,
    } = this.props;
    let finalvalue;
    let selectOptions = [];
    if (options) {
      options
        .filter(({ name }) =>
          name.toLowerCase().includes(this.state.value.toLocaleLowerCase())
        )
        .forEach((element) => {
          let labelText = element[getOptionLabel]
          if (element.have_priority !==undefined) {
            
            if (element['have_priority']) {
              labelText = `${element[getOptionLabel]} (Priority: Yes)`
            }else{
              labelText = `${element[getOptionLabel]} (Priority: No)`
            }
          }
          selectOptions.push({
            label: labelText,
            value: element[getOptionValue],
          });
        });
    }

    if (getOptionValue === "id") {
      finalvalue = Number(value);
    } else {
      finalvalue = value;
    }

    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <FormControl error={error ? true : false} fullWidth={true}>
          <ReactSelectMaterialUi
            label={label}
            value={finalvalue}
            options={selectOptions}
            onChange={(e) => this.handleChange(e, name)}
            onInput={(e) => this.setState({ value: e.target.value })}
            onBlur={() => this.setState({ value: "" })}
            SelectProps={{
              isClearable: true,
              classNamePrefix: "react-select",
            }}
          />

          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      </div>
    );
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
  value: "",
};

export default MuiAutocompleteBox;

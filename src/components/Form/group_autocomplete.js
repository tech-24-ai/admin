import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { crudService } from "../../_services";
import ReactSelectMaterialUi from "react-select-material-ui";

class MuiAutocompleteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      options: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { formField } = this.props;
    let { searchText } = this.state;
    let query = {};
    query["search"] = searchText;
    if (formField.options) {
      formField.options.forEach((element) => {
        query[element.name] = element.value;
      });
    }
    crudService._getAllWithParam(formField.url, query).then((result) => {
      if (result.status === 200) {
        this.setState({
          options: result.data,
        });
      }
    });
  };

  handleChange = (value, name) => {
    const { formField } = this.props;
    const event = {
      target: {
        name: name,
        value: value,
      },
    };
    if (formField.getOptionAmount) {
      const selectedSkill = this.state.options.filter(
        (data) => data[formField.getOptionValue] == value
      );
      const bookingAmt = selectedSkill.length
        ? selectedSkill[0][formField.getOptionAmount]
        : 0;
      event.target.amount = bookingAmt;
    }
    this.props.handleInputChange(event);
  };

  onInputChange = (event) => {
    const newState = Object.assign({}, this.state);
    newState.searchText = event.target.value;
    newState.search = true;
    this.setState(newState, () => {
      this.fetchData();
    });
  };

  getLabel = (element) => {
    const { formField } = this.props;
    if (formField.getOptionLabel) {
      return element[formField.getOptionLabel];
    } else {
      return element;
    }
  };
  getValue = (element) => {
    const { formField } = this.props;
    if (formField.getOptionValue) {
      return element[formField.getOptionValue];
    } else {
      return element;
    }
  };

  render() {
    const { formField } = this.props;
    const { options } = this.state;

    let value;
    let selectOptions = [];
    if (options) {
      options.forEach((element) => {
        if (element.children && element.children.length) {
          element.children.forEach((element2) => {
            if (element2.children && element2.children.length) {
              element2.children.forEach((element3) => {
                if (element3.children && element3.children.length) {
                  element3.children.forEach((element4) => {
                    selectOptions.push({
                      label: `${this.getLabel(element)} > ${this.getLabel(
                        element2
                      )} > ${this.getLabel(element3)} > ${this.getLabel(
                        element4
                      )}`,
                      value: this.getValue(element4),
                    });
                  });
                } else {
                  selectOptions.push({
                    label: `${this.getLabel(element)} > ${this.getLabel(
                      element2
                    )} > ${this.getLabel(element3)}`,
                    value: this.getValue(element3),
                  });
                }
              });
            } else {
              selectOptions.push({
                label: `${this.getLabel(element)} > ${this.getLabel(element2)}`,
                value: this.getValue(element2),
              });
            }
          });
        } else {
          selectOptions.push({
            label: this.getLabel(element),
            value: this.getValue(element),
          });
        }
      });
    }

    if (formField.getOptionValue === "id") {
      value = Number(formField.value);
    } else {
      value = formField.value;
    }

    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <FormControl error={formField.error ? true : false} fullWidth={true}>
          <ReactSelectMaterialUi
            label={formField.label}
            value={value}
            options={selectOptions}
            onChange={(e) => this.handleChange(e, formField.name)}
            onInput={this.onInputChange}
            onClick={this.onInputChange}
            SelectProps={{
              isClearable: true,
            }}
          />

          {formField.error && (
            <FormHelperText>{formField.error}</FormHelperText>
          )}
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

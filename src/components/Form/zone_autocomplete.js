import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { crudService } from "../../_services";
import ReactSelectMaterialUi from "react-select-material-ui";
import moment from "moment";

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
        if (result.data.message) {
          this.setState({
            options: [],
          });
        } else {
          this.setState({
            options: result.data,
          });
        }
      }
    });
  };

  handleChange = (value, name) => {
    const event = {
      target: {
        name: name,
        value: value,
      },
    };
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
    let label = "";
    if (formField.getOptionLabel.length) {
      formField.getOptionLabel.map((field) => {
        if (field == "offset") {
          label += `(${element[field]})`;
        } else {
          label += ` ${element[field]}`;
        }
      });
    } else {
      label = element[formField.getOptionLabel];
    }

    return label;
  };
  getValue = (element) => {
    const { formField } = this.props;
    return element[formField.getOptionValue];
  };

  render() {
    const { formField } = this.props;
    const { options } = this.state;

    let value;
    let selectOptions = [];
    if (options) {
      options.forEach((element) => {
        selectOptions.push({
          label: this.getLabel(element),
          value: this.getValue(element),
        });
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

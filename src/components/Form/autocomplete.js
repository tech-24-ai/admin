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
      options: [],
      value: "",
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({
      options: [],
      loading: true,
    });
    const { formField } = this.props;
    crudService
      ._getAllWithParam(formField.url, formField.filters)
      .then((result) => {
        if (result.status === 200) {
          if (formField && formField.meta && formField.meta == "addAllOption") {
            this.setState({
              options: [{ id: 99999, name: "All" }, ...result.data],
              loading: false,
            });
          } else {
            this.setState({
              options: result.data,
              loading: false,
            });
          }
        }
      });
  };

  handleChange = (value, name, label) => {
    const [data] = this.state.options.filter((data) => data.id == value);
    const event = {
      target: {
        name: name,
        value: value,
        label: data && data.day_of_week ? data.day_of_week : null,
      },
    };
    this.props.handleInputChange(event);
  };

  render() {
    const { formField } = this.props;

    const { options, loading } = this.state;
    let value;
    let selectOptions = [];
    if (options) {
      options.forEach((element) => {
        selectOptions.push({
          label: element[formField.getOptionLabel],
          value: element[formField.getOptionValue],
        });
      });
    } else {
      selectOptions.push({
        label: "Loading...",
        value: 0,
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
            onClick={this.fetchData}
            disabled={formField.disabled}
            onChange={(e) =>
              this.handleChange(e, formField.name, formField.label)
            }
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

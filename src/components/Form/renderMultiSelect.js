import React from "react";
import CustomMultiSelect from "components/CustomMultiSelect/CustomMultiSelect.js";

class RenderMultiSelectBox extends React.PureComponent {
  render() {
    const { formField, handleInputChange } = this.props;
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <CustomMultiSelect
          title={formField.label}
          key={formField.name}
          name={formField.name}
          value={formField.value}
          success={!formField.error}
          error={formField.error}
          helperText={formField.error}
          url={formField.url}
          onChange={(event) => handleInputChange(event)}
          items={formField.options}
          disabled={formField.disabled}
        />
      </div>
    );
  }
}
export default RenderMultiSelectBox;

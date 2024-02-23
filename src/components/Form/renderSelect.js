import React from "react";
import CustomSelect from "components/CustomSelect/CustomSelect.js";

class RenderSelectBox extends React.PureComponent {
  render() {
    const { formField, handleInputChange } = this.props;
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <CustomSelect
          title={formField.label}
          key={formField.name}
          name={formField.name}
          value={formField.value}
          success={!formField.error}
          error={formField.error}
          helperText={formField.error}
          onChange={(event) => handleInputChange(event)}
          items={formField.options}
        />
      </div>
    );
  }
}
export default RenderSelectBox;

import React from "react";
import Icon from "@material-ui/core/Icon";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import { apiConfig } from "_services/api2";
class GoogleDriveFilebox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      message: "",
    };
  }

  uploadFile = (event) => {
    event.persist();
    const { formField, handleInputChange } = this.props;
    let file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    this.setState({
      loading: true,
    });
    return apiConfig
      .post(`/${formField.uploadUrl}`, formData, config)
      .then((response) => {
        if (response.status == 200) {
          this.setState({
            loading: false,
            error: false,
            message: response.data.message,
          });

          handleInputChange({
            target: {
              name: formField.name,
              value: response.data.result.document_id,
            },
          });
        } else {
          this.setState({
            loading: false,
            error: true,
            message: response.data.message,
          });
        }
      })
      .catch((error) => {
        const { response } = error;
        this.setState({
          loading: false,
          error: true,
          message: response.data.message,
        });
      });
  };

  render() {
    const { formField, handleInputChange, classes } = this.props;
    const { loading, error, message } = this.state;
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <input
          className={classes.fileHidden}
          id="document-file"
          type="file"
          onChange={(event) => this.uploadFile(event)}
        />
        <CustomInput
          success={!error}
          error={error}
          labelText={formField.label}
          helperText={message}
          id={formField.name}
          key={formField.name}
          readonly
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            value: formField.value,
            name: formField.name,
            readOnly: true,
            onChange: (event) => {
              handleInputChange(event);
            },
            endAdornment: (
              <label htmlFor="document-file">
                <InputAdornment position="end">
                  {!loading && <Icon>cloud_upload</Icon>}
                  {loading && <Icon>cached</Icon>}
                </InputAdornment>
              </label>
            ),
          }}
        />
      </div>
    );
  }
}
export default withStyles(styles)(GoogleDriveFilebox);

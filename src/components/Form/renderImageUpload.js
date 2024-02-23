import React from "react";
import ImageUpload from "components/CustomUpload/ImageUpload.js";
import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import { apiConfig } from "_services/api2";
import { loaderActions } from "../../_actions/loader.actions";
import { connect } from "react-redux";

class RenderImageUpload extends React.PureComponent {
  handleChange = (value) => {
    const event = {
      target: {
        name: this.props.formField.name,
        value,
      },
    };
    this.props.handleInputChange(event);
  };
  uploadFile(blobData) {
    if (!blobData) return this.handleChange(blobData);
    this.props.showLoader();
    const { formField } = this.props;
    let file = blobData;
    const formData = new FormData();
    formData.append("file", file, blobData.fileName);
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
          this.handleChange(response.data.result);
        }
      })
      .catch((error) => {})
      .finally(() => {
        this.props.hideLoader();
      });
  }
  render() {
    const { formField } = this.props;
    return (
      <>
        
        <div style={{padding:'8px 0'}}>
          <label htmlFor="">{formField.label}</label>
        </div>
        <ImageUpload
          addButtonProps={{
            color: "rose",
            round: true,
          }}
          changeButtonProps={{
            color: "rose",
            round: true,
          }}
          removeButtonProps={{
            color: "danger",
            round: true,
          }}
          onChange={(data) => this.uploadFile(data)}
          image={formField.value}
          error={formField.error}
          aspect={formField.aspect}
        />
      </>
    );
  }
}
const actionCreators = {
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default connect(
  () => {},
  actionCreators
)(withStyles(styles)(RenderImageUpload));

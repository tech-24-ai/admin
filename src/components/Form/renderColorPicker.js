import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import InputLabel from "@material-ui/core/InputLabel";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
class RenderColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: this.props.formField.value ? this.props.formField.value : "red",
  };
  handleClick = () => {
    this.setState(prevState => ({ displayColorPicker: !prevState.displayColorPicker }));
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    const event = {
      target: {
        name: this.props.formField.name,
        value: color.hex,
      },
    };
    this.props.handleInputChange(event);
    this.setState({ color: color.hex });
  };

  render() {
    const { formField } = this.props;
    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          background: `${formField.value ? formField.value : "red"}`,
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    return (
      <div>
        <GridContainer>
          <GridItem xs={5} style={{ marginTop: "5px" }}>
            <InputLabel style={{ color: "#4caf50" }}>
              {formField.label}
            </InputLabel>
          </GridItem>
          <GridItem xs={3}>
            <div style={styles.swatch} onClick={this.handleClick} tabIndex="0" role="button">
              <div style={styles.color} />
            </div>
          </GridItem>
          <GridItem xs={4}></GridItem>
          {this.state.displayColorPicker ? (
            <div style={styles.popover}>
              <div style={styles.cover} onClick={this.handleClose} tabIndex="0" role="button" />
              <SketchPicker
                color={this.state.color}
                onChange={this.handleChange}
              />
            </div>
          ) : null}
        </GridContainer>
      </div>
    );
  }
}

export default RenderColorPicker;

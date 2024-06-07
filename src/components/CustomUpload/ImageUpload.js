import React, { PureComponent } from "react";
// used for making the prop types of this component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// core components
import Button from "components/CustomButtons/Button.js";
import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import Typography from "@material-ui/core/Typography";
import ReactCrop from "react-image-crop";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ClearIcon from "@material-ui/icons/Clear";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import "react-image-crop/dist/ReactCrop.css";
import "./style.css";
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      crop: {
        unit: "%",
        width: 30,
        height: 30,
        aspect:props.aspect ? props.aspect:undefined,
        minHeight: 300
      },
      croppedImageUrl: null,
      defaultImage: props.avatar ? defaultAvatar : defaultImage,
      open: false,
    };
    this.fileInput = React.createRef();
  }

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
      this.setState(prevState => {
        return { ...prevState, open: true };
      });
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const { croppedImageUrl, croppedImageBlob } = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl, croppedImageBlob });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    //ctx.fillStyle = "white";
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve({ croppedImageUrl: this.fileUrl, croppedImageBlob: blob });
      }, "image/jpeg");
    });
  }

  handleClick() {
    this.fileInput.current.click();
  }

  doneEditing() {
    this.setState(prevState => ({ ...prevState, open: false }));
    this.props.onChange(this.state.croppedImageBlob);
  }

  handleRemove() {
    this.setState(prevState => ({
      ...prevState,
      croppedImageUrl: null,
      src: this.props.avatar ? defaultAvatar : defaultImage,
    }));
    this.props.onChange(null);
    this.fileInput.current.value = null;
  }
  handleCancel() {
    this.setState({
      open: false,
      croppedImageUrl: this.props.image,
      src: null,
    });
    this.fileInput.current.value = null;
  }
  render() {
    let {
      avatar,
      addButtonProps,
      changeButtonProps,
      removeButtonProps,
      error,
      image,
    } = this.props;
    let { crop, croppedImageUrl, src, open } = this.state;
    croppedImageUrl = croppedImageUrl
      ? croppedImageUrl
      : image
      ? image
      : defaultImage;
    return (
      <div className="App fileinput text-center">
        <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
          <img src={croppedImageUrl || defaultImage} alt="..." />
        </div>
        <div>
          <input
            type="file"
            src={croppedImageUrl}
            accept="image/*"
            ref={this.fileInput}
            onChange={this.onSelectFile}
          />
        </div>
        <div>
          {error && (
            <Typography variant="subtitle2" style={{ color: "red" }}>
              Please select image.
            </Typography>
          )}
          {croppedImageUrl === defaultImage ? (
            <Button {...addButtonProps} onClick={() => this.handleClick()}>
              {avatar ? "Add Photo" : "Select image"}
            </Button>
          ) : (
            <span>
              <Button {...changeButtonProps} onClick={() => this.handleClick()}>
                Change
              </Button>
              {avatar ? <br /> : null}
              <Button
                {...removeButtonProps}
                startIcon={<ClearIcon />}
                onClick={() => this.handleRemove()}
              >
                {" "}
                Remove
              </Button>
            </span>
          )}
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="modal"
          open={open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Card>
              <CardContent>
                <GridContainer>
                  <GridItem xs={6} sm={8}>
                    <Typography variant="subtitle2">
                      Drag the white lines to crop the image
                    </Typography>
                  </GridItem>
                  <GridItem xs={6} sm={4}>
                    <Button color="primary" onClick={() => this.handleCancel()}>
                      Cancel
                    </Button>
                    <Button color="primary" onClick={() => this.doneEditing()}>
                      Save
                    </Button>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={7}>
                    {src && (
                      <ReactCrop
                        src={src}
                        crop={crop}
                        ruleOfThirds
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                      />
                    )}
                  </GridItem>
                  <GridItem xs={5}>
                    {croppedImageUrl && (
                      <img
                        alt="Crop"
                        style={{ maxWidth: "100%" }}
                        src={croppedImageUrl}
                      />
                    )}
                  </GridItem>
                </GridContainer>
              </CardContent>
            </Card>
          </Fade>
        </Modal>
      </div>
    );
  }
}

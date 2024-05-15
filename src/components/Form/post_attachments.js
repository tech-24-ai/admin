import React from "react";
import { connect } from 'react-redux';

import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { crudService } from "../../_services";
import moment from "moment";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
import Link from "@material-ui/core/Link";
import { modalActions, crudActions } from '../../_actions';
import { Button, Modal } from 'antd';

class PostAttachments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            options: [],
            isModalOpen: false,
            mediaUrl: null,
            mediaExtension: null,
            mediaType: null
        };
    }

    toggleModal(url, extension, item) {
        let imageExt = ["image/jpeg","image/jpg","image/png","image/svg+xml"]
        let pdfExt = ["application/pdf"]
        let media_type = "";

        if(imageExt.includes(extension)) 
        {
            media_type = "image"
            this.setState({ mediaUrl: url, mediaExtension: extension, mediaType: media_type, isModalOpen: true });
        } 
        else if(pdfExt.includes(extension)) 
        {
            media_type = "pdf"
            const { id, name } = item;
       
            this.props.downloadDocument(
                id,
                name,
                `community/communitypost/download_attachment?attachment_id=${id}`
            );
        } 
        else 
        {
            media_type = "video"
            if(extension == "video/quicktime") {
                extension = "video/mp4";
            }
            this.setState({ mediaUrl: url, mediaExtension: extension, mediaType: media_type, isModalOpen: true });
        }
    }

    closeModal(url, mediaType) {

        this.setState({ isModalOpen: false, mediaUrl: "", mediaType: "", mediaExtension: "" })
        
        // if(mediaType) {
        //     var video = document.getElementById('example_video_1');
        //     var videosource = document.getElementById('video_source');
        //     video.pause();
        //     // video.currentTime = 0
        //     // videosource.removeAttribute('src');
        //     video.load();
        // }    
    }

    render() {
        const { formField } = this.props;
        const { values, isModalOpen, mediaUrl, mediaExtension, mediaType } = this.state;

        let attachments = [];
        if(formField.values) {
            attachments = formField.values;
        } 

        let imageExt = ["image/jpeg","image/jpg","image/png","image/svg+xml"]
        let pdfExt = ["application/pdf"]
        let replyDataItems;

        if(formField.values && attachments.length > 0) 
        {    
            replyDataItems = attachments.map((item, i) => 
                <Link 
                key={i} 
                href="javascript:"
                onClick={() => this.toggleModal(item.url, item.extension, item)}
                style={{width: "auto", maxWidth: 150, minWidth: 150, minHeight: 150, height: "auto", margin: 10, border: "1px solid #ccc", display: "flex"}}>    
                    {(() => {  
                        if (imageExt.includes(item.extension)) {   
                            return (
                                <img style={{margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%' }} alt={item.name} src={item.url} />
                            )    
                        }    
                        else if (pdfExt.includes(item.extension)) 
                        { 
                            return (
                                <img style={{margin: 'auto', display: 'block', maxWidth: '75%', maxHeight: '100%' }} alt={item.name} src="https://tech24-uat.s3.amazonaws.com/9UtKGqddEl" />
                            )    
                        }
                        else 
                        {    
                            return (
                                <img style={{margin: 'auto', display: 'block', maxWidth: '75%', maxHeight: '100%' }} alt={item.name} src="https://tech24-uat.s3.amazonaws.com/yrUrbuAfMw" />
                            )    
                        }   
                    })()}         
                </Link>
            )
        } else if(formField.values != "undefined") {
            replyDataItems = <h4 style={{marginLeft: 15}}>No attachments!</h4>;
        }    

        return (
            <div style={{ marginTop: 10, marginBottom: 10 }}>
                <div>
                    <GridContainer style={{ marginBottom: 10 }} justifyContent="flex-start" > 
                        <GridItem xs={12} >
                            <p>{formField.label}</p>
                        </GridItem>

                        <Grid item xs={2} style={{display: "contents"}} >
                            {replyDataItems}
                        </Grid>
                    </GridContainer>    
                </div>

                { isModalOpen && <Modal visible={isModalOpen} onCancel={() => this.closeModal(mediaUrl, mediaType) } footer={null}>
                        <div style={{ marginTop: 20}}>
                            {(() => {
                                if (mediaType == 'image') { 
                                    return (
                                        <img style={{margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%' }} 
                                        alt="complex" 
                                        src={mediaUrl} />
                                    )
                                }    
                                else if (mediaType == "video") 
                                { 
                                    return (
                                        <video id="example_video_1" className="video-js vjs-default-skin"
                                            controls preload="auto" width="100%" height="300">
                                            <source id="video_source" src={mediaUrl} type={mediaExtension} />
                                        </video>
                                    )    
                                } 
                            })()}    
                        </div>    
                    </Modal>
                }    
            </div>
        );
    }
}

PostAttachments.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
};

PostAttachments.defaultProps = {
    name: "",
    label: "",
    value: "",
};

const actionCreators = {
    openModal: modalActions.open,
    downloadDocument: crudActions._downloadPostAttachment,
}

export default connect("",actionCreators)(PostAttachments);

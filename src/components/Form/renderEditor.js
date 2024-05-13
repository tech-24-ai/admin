import React, { Component, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

class RenderEditor extends React.PureComponent {
  constructor(props) {
    super(props);
  }
    
  render() {
    const { handleInputChange, formField } = this.props;
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <div style={{padding:'8px 0'}}>
          <label htmlFor="">{formField.label}</label>
        </div>
        <Editor
          apiKey="7l7ragmn51cz1m01rx3nmet4t836bylfx522m19vye0ofdue"
          value={formField.value}
       
          init={{
            height: 500,
            image_advtab: true,
            directionality: "ltr",
            menubar: true,
            plugins: [
              "preview importcss searchreplace autolink autosave", 
              "save directionality code visualblocks visualchars fullscreen image link media template codesample",
               "table charmap pagebreak nonbreaking anchor insertdatetime advlist lists",
               "wordcount help charmap quickbars emoticons",
              
            ],
            file_picker_types: 'image',
            a11y_advanced_options: true,
            file_picker_callback: (callback, value, meta) => {
              /* Provide file and text for the link dialog */
              if (meta.filetype === 'file') {
                
              }
          
              /* Provide image and alt text for the image dialog */
              if (meta.filetype === 'image') {
                
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
            
                input.addEventListener('change', (e) => {
                  const file = e.target.files[0];
            
                  const reader = new FileReader();
                  reader.addEventListener('load', (e) => {
                    /*
                      Note: Now we need to register the blob in TinyMCEs image blob
                      registry. In the next release this part hopefully won't be
                      necessary, as we are looking to handle it internally.
                    */
                    // const id = 'blobid' + (new Date()).getTime();
                    // const blobCache =  editorRef.activeEditor.editorUpload.blobCache;
                    // const base64 = reader.result.split(',')[1];
                    // const blobInfo = blobCache.create(id, file, base64);
                    // blobCache.add(blobInfo);
            
                    /* call the callback and populate the Title field with the file name */
                    callback(e.target.result, { title: file.name });
                  });
                  reader.readAsDataURL(file);
                });
            
                input.click();
              }

          
              /* Provide alternative source and posted for the media dialog */
              if (meta.filetype === 'media') {
                callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
              }
            },
            toolbar:
              "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
              
          }}
          onEditorChange={handleInputChange}
        />
      </div>
    );
  }
}

export default RenderEditor;

import React, { useEffect, useState, Fragment, useRef } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import basicBlockPlugin from "grapesjs-blocks-basic";
import formPlugin from "grapesjs-plugin-forms";

const Editor = ({ formField, handleInputChange }) => {
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);

  const editorRef = useRef(null);

  const storeData = (editor) => {
    editor.Storage.add("remote", {
      async store(data) {
        const htmlContent = editor.getHtml();
        const cssStyle = editor.getCss();
        handleInputChange({
          html: htmlContent,
          css: cssStyle,
        });
      },
    });
  };

  // useEffect(() => {
  //   let htmlContent = "";
  //   let cssStyle = "";
  //   if (formField.value && typeof formField.value == "object") {
  //     const { html, css } = formField.value;
  //     htmlContent = html;
  //     cssStyle = css;
  //   }
  //   if (formField.value && typeof formField.value == "string") {
  //     const { html, css } = JSON.parse(formField.value);
  //     htmlContent = html;
  //     cssStyle = css;
  //   }
  //   // console.log("htmlContent", htmlContent);
  //   console.log("isEditorLoaded", isEditorLoaded);

  //   // if (!isEditorLoaded) {
  //   //   editor = grapesjs.init({
  //   //     // container: "#editor",
  //   //     // height: "100%",
  //   //     container: editorRef.current,
  //   //     panels: { defaults: [] }, // Avoid default panels
  //   //     plugins: [gjsPresetWebpage, storeData, basicBlockPlugin, formPlugin],
  //   //     pluginsOpts: {
  //   //       gjsPresetWebpage: {},
  //   //       basicBlockPlugin: {},
  //   //       formPlugin: {},
  //   //     },
  //   //     storageManager: {
  //   //       type: "remote",
  //   //     },
  //   //     components: htmlContent,
  //   //     style: cssStyle,
  //   //   });

  //   //   setIsEditorLoaded(true);

  //   //   return () => {
  //   //     editor.destroy();
  //   //     setIsEditorLoaded(false);
  //   //     console.log("useeffectReturn");
  //   //   };
  //   // }
  // }, []);

  useEffect(() => {
    initializeEditor();

    return () => {
      destroyEditor();
    };
  }, []);

  const initializeEditor = () => {
    let htmlContent = "";
    let cssStyle = "";
    if (formField.value && typeof formField.value == "object") {
      const { html, css } = formField.value;
      htmlContent = html;
      cssStyle = css;
    }

    if (formField.value && typeof formField.value == "string") {
      const { html, css } = JSON.parse(formField.value);
      htmlContent = html;
      cssStyle = css;
    }
    editorRef.current = grapesjs.init({
      container: "#editor",
      // height: "100%",
      panels: { defaults: [] }, // Avoid default panels
      plugins: [gjsPresetWebpage, storeData, basicBlockPlugin, formPlugin],
      pluginsOpts: {
        gjsPresetWebpage: {},
        basicBlockPlugin: {},
        formPlugin: {},
      },
      storageManager: {
        type: "remote",
      },
      components: htmlContent,
      style: cssStyle,
    });
  };

  const reinitializeEditor = () => {
    destroyEditor();
    initializeEditor();
  };

  const destroyEditor = () => {
    if (editorRef.current) {
      editorRef.current.destroy();
      editorRef.current = null;
    }
  };

  useEffect(() => {
    if (formField.value && typeof formField.value == "string") {
      reinitializeEditor();
    }
  }, [formField.value]);

  return <div id="editor"></div>;
};

export default Editor;

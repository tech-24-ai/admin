import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

      export const downloadImage = (id, name) => {
      const input = document.getElementById(id);
      html2canvas(input).then(canvas => {
      let a = document.createElement('a'); 
      document.body.appendChild(a); 
      a.download = "Competitive Landscape Graph.jpeg"; 
      a.href =  canvas.toDataURL();
      a.click();
      });	 
      }


  
    export const pdfGenerator = (id, name) => {
    const input = document.getElementById(id);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpg");
      var i = new Image();
      i.onload = function () {
        var pdf = new jsPDF("p", "px", [i.width, i.height]);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${name}.pdf`);
      };
      i.src = imgData;
    });
  };

  
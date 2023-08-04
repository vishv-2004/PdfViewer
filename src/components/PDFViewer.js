// src/components/PDFViewer.js

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Configure PDF.js worker path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < numPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pdf-viewer">
      <div className="pdf-controls">
        <button onClick={goToPreviousPage} disabled={currentPage <= 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {numPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage >= numPages}>
          Next
        </button>
      </div>
      <div className="pdf-document">
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={currentPage} />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;

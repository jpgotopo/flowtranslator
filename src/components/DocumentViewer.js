// src/DocumentViewer.js
import React from 'react';
import Viewer from 'react-viewerjs';

const DocumentViewer = ({ fileUrl }) => {
  return fileUrl ? (
    <div className="document-viewer">
      <Viewer file={fileUrl} />
    </div>
  ) : null;
};

export default DocumentViewer;

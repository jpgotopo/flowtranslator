// src/FileUploader.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import mammoth from 'mammoth';

const FileUploader = ({ onTextExtracted, onFileLoaded }) => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileUrl(URL.createObjectURL(file));

    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    onTextExtracted(result.value);
    onFileLoaded(fileUrl);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.docx' });

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta el archivo aquí...</p>
      ) : (
        <p>Arrastra un archivo aquí, o haz clic para seleccionar uno</p>
      )}
    </div>
  );
};

export default FileUploader;

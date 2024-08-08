// src/App.js
import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import DocumentViewer from './components/DocumentViewer';
import TranslationPanel from './components/TranslationPanel';
import './App.css';
import { Document, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';

function App() {
  const [sentences, setSentences] = useState([]);
  const [translations, setTranslations] = useState({});
  const [fileUrl, setFileUrl] = useState(null);

  const handleTextExtracted = (text) => {
    const sentencesArray = text.match(/[^.!?]+[.!?]+/g) || [text];
    setSentences(sentencesArray);
  };

  const handleTranslationChange = (index, translation) => {
    setTranslations({ ...translations, [index]: translation });
  };

  const handleGenerateDocument = () => {
    const translatedSentences = sentences
      .map((_, index) => translations[index] || '')
      .filter(translation => translation.trim() !== '');

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: translatedSentences.map(sentence => new Paragraph(sentence)),
        },
      ],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'traduccion.docx');
    });
  };

  return (
    <div className="app-container">
      <h1>Aplicación de Traducción</h1>
      {!fileUrl && (
        <FileUploader onTextExtracted={handleTextExtracted} onFileLoaded={setFileUrl} />
      )}
      <div className="main-content">
        {fileUrl && <DocumentViewer fileUrl={fileUrl} />}
        <TranslationPanel
          sentences={sentences}
          translations={translations}
          handleTranslationChange={handleTranslationChange}
        />
      </div>
      <button onClick={handleGenerateDocument} className="generate-btn">
        Generar Documento
      </button>
    </div>
  );
}

export default App;

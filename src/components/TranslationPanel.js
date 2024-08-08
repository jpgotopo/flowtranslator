// src/TranslationPanel.js
import React from 'react';

const TranslationPanel = ({ sentences, translations, handleTranslationChange }) => {
  return (
    <div className="translation-panel">
      {sentences.map((sentence, index) => (
        <div key={index} className="sentence-block">
          <p>{sentence}</p>
          <textarea
            value={translations[index] || ''}
            onChange={(e) => handleTranslationChange(index, e.target.value)}
            placeholder="Escribe la traducción aquí"
            rows="3"
          />
        </div>
      ))}
    </div>
  );
};

export default TranslationPanel;

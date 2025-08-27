// useFileOperations.js - Custom hook for file import/export operations

import { useCallback } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { templateManager } from '../utils/cvTemplates';
import { CVParser } from '../utils/cvParser';

GlobalWorkerOptions.workerSrc = workerUrl;

export const useFileOperations = (
  cvData,
  selectedTemplate,
  sectionOrder,
  hiddenSections,
  setCvData,
  setSectionOrder,
  setHiddenSections,
  setSelectedTemplate
) => {
  // PDF text extraction
  const extractPdfText = useCallback(async (fileOrArrayBuffer) => {
    const data = fileOrArrayBuffer instanceof ArrayBuffer
      ? fileOrArrayBuffer
      : await fileOrArrayBuffer.arrayBuffer();

    const pdf = await getDocument({ data }).promise;
    const pages = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const linesMap = new Map();
      const yTolerance = 2;

      for (const item of content.items) {
        const text = (item.str || '').trim();
        if (!text) continue;

        const tm = item.transform || item.matrix || [];
        const yRaw = typeof tm[5] === 'number' ? tm[5] : 0;
        const yBucket = Math.round(yRaw / yTolerance) * yTolerance;

        if (!linesMap.has(yBucket)) linesMap.set(yBucket, []);
        linesMap.get(yBucket).push(text);
      }

      const lineYs = Array.from(linesMap.keys()).sort((a, b) => b - a);
      const pageLines = lineYs.map(y => linesMap.get(y).join(' '));
      pages.push(pageLines.join('\n'));
    }

    return pages.join('\n\n');
  }, []);

  // Export to PDF
  const exportToPDF = useCallback(() => {
    const visibleSections = sectionOrder.filter(section => !hiddenSections.includes(section));
    const jsonData = JSON.stringify({ cvData, sectionOrder, hiddenSections, selectedTemplate });
    const printWindow = window.open('', '_blank');
    
    // Use the export-specific function that always uses light theme
    const content = templateManager.generateExportHTML(selectedTemplate, cvData, visibleSections);
    
    const contentWithData = content.replace(
      '</body>',
      `<!-- CV_DATA:${btoa(jsonData)}:CV_DATA --></body>`
    );
    
    printWindow.document.write(contentWithData);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }, [cvData, selectedTemplate, sectionOrder, hiddenSections]);

  // Import from file
  const importFromFile = useCallback(async (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    try {
      let text = '';

      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        const pdfText = await extractPdfText(file);

        // Check for embedded JSON data first
        const marker = /CV_DATA:([A-Za-z0-9+/=]+):CV_DATA/;
        const match = pdfText.match(marker);
        if (match) {
          try {
            const jsonData = JSON.parse(atob(match[1]));
            if (jsonData.cvData) {
              setCvData(jsonData.cvData);
              if (jsonData.sectionOrder) setSectionOrder(jsonData.sectionOrder);
              if (jsonData.hiddenSections) setHiddenSections(jsonData.hiddenSections);
              if (jsonData.selectedTemplate) setSelectedTemplate(jsonData.selectedTemplate);
              alert('CV data imported successfully from exported PDF!');
              event.target.value = '';
              return;
            }
          } catch (e) {
            console.warn('Failed to parse embedded JSON data:', e);
          }
        }

        text = pdfText;
        
        if (!text || text.trim().length < 10) {
          alert('This PDF has no selectable text. Try exporting with selectable text or import a .json/.txt file instead.');
          event.target.value = '';
          return;
        }
      } else if (file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt')) {
        text = await file.text();
      } else if (file.name.toLowerCase().endsWith('.json')) {
        try {
          const imported = JSON.parse(await file.text());
          if (imported.cvData) {
            setCvData(imported.cvData);
            if (imported.sectionOrder) setSectionOrder(imported.sectionOrder);
            if (imported.hiddenSections) setHiddenSections(imported.hiddenSections);
            if (imported.selectedTemplate) setSelectedTemplate(imported.selectedTemplate);
          } else {
            setCvData(imported);
          }
          alert('CV data imported from JSON file.');
          event.target.value = '';
          return;
        } catch (e) {
          alert('Invalid JSON file format.');
          event.target.value = '';
          return;
        }
      } else {
        alert('Please upload a PDF, TXT, or JSON file.');
        event.target.value = '';
        return;
      }

      const parseResult = CVParser.parseCV(text);
      setCvData(parseResult.data);
      
      if (parseResult.message) {
        alert(`Import completed: ${parseResult.message}`);
      }
      
    } catch (error) {
      console.error('Import error:', error);
      alert(`Error reading file: ${error?.message ?? 'Unknown error'}`);
    } finally {
      if (event?.target) event.target.value = '';
    }
  }, [extractPdfText, setCvData, setSectionOrder, setHiddenSections, setSelectedTemplate]);

  return {
    importFromFile,
    exportToPDF
  };
};
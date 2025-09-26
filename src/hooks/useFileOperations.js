// hooks/useFileOperations.js - Updated with profile manager integration

import { useCallback } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { templateManager } from '../utils/cvTemplates';
import { CVParser } from '../utils/cvParser';
import { profileManager } from '../utils/profileManager';

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

  // Export to PDF with profile data embedded
  const exportToPDF = useCallback(() => {
    const visibleSections = sectionOrder.filter(section => !hiddenSections.includes(section));
    const jsonData = JSON.stringify({ cvData, sectionOrder, hiddenSections, selectedTemplate });
    const printWindow = window.open('', '_blank');
  
    const content = templateManager.generateExportHTML(selectedTemplate, cvData, visibleSections);
    const contentWithData = content.replace(
      '</body>',
      `<!-- CV_DATA:${btoa(jsonData)}:CV_DATA --></body>`
    );
  
    printWindow.document.open();
    printWindow.document.write(contentWithData);
    printWindow.document.close();
  
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  }, [cvData, selectedTemplate, sectionOrder, hiddenSections]);

  // Export current CV data as JSON
  const exportAsJSON = useCallback((filename = 'cv-data') => {
    const exportData = {
      cvData,
      sectionOrder,
      hiddenSections,
      selectedTemplate,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }, [cvData, sectionOrder, hiddenSections, selectedTemplate]);

  // Export current CV data as XML
  const exportAsXML = useCallback((filename = 'cv-data') => {
    const profile = {
      name: filename,
      cvData,
      sectionOrder,
      hiddenSections,
      selectedTemplate,
      savedAt: new Date().toISOString()
    };

    const xml = profileManager.convertToXML(profile);
    
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.xml`;
    link.click();
    
    URL.revokeObjectURL(url);
  }, [cvData, sectionOrder, hiddenSections, selectedTemplate]);

  // Import from file (enhanced with profile support)
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
              
              // Optionally save as profile
              if (window.confirm('Would you like to save this imported CV as a new profile?')) {
                const profileName = prompt('Enter a name for this profile:') || 'Imported from PDF';
                try {
                  profileManager.saveProfile(
                    profileName,
                    jsonData.cvData,
                    jsonData.sectionOrder || sectionOrder,
                    jsonData.hiddenSections || hiddenSections,
                    jsonData.selectedTemplate || selectedTemplate
                  );
                  alert(`CV imported and saved as profile "${profileName}"`);
                } catch (saveError) {
                  alert('CV imported successfully, but failed to save as profile: ' + saveError.message);
                }
              } else {
                alert('CV data imported successfully from exported PDF!');
              }
              
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
            
            // Ask if user wants to save as profile
            if (window.confirm('Would you like to save this imported CV as a new profile?')) {
              const profileName = prompt('Enter a name for this profile:') || file.name.replace('.json', '');
              try {
                profileManager.saveProfile(
                  profileName,
                  imported.cvData,
                  imported.sectionOrder || sectionOrder,
                  imported.hiddenSections || hiddenSections,
                  imported.selectedTemplate || selectedTemplate
                );
                alert(`CV imported and saved as profile "${profileName}"`);
              } catch (saveError) {
                alert('CV imported successfully, but failed to save as profile: ' + saveError.message);
              }
            } else {
              alert('CV data imported from JSON file.');
            }
          } else {
            setCvData(imported);
            alert('CV data imported from JSON file.');
          }
          event.target.value = '';
          return;
        } catch (e) {
          alert('Invalid JSON file format.');
          event.target.value = '';
          return;
        }
      } else if (file.name.toLowerCase().endsWith('.xml')) {
        // Basic XML parsing for CV profile format
        text = await file.text();
        try {
          // This is a simplified XML parser for the CV format we export
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(text, "text/xml");
          
          if (xmlDoc.querySelector('cvProfile')) {
            // Extract data from XML structure
            const name = xmlDoc.querySelector('metadata name')?.textContent || 'Imported from XML';
            const templateName = xmlDoc.querySelector('metadata selectedTemplate')?.textContent || 'plain-professional';
            
            alert('XML import is partially supported. For full compatibility, please use JSON format.');
            event.target.value = '';
            return;
          }
        } catch (xmlError) {
          console.warn('XML parsing failed, falling back to text parsing:', xmlError);
        }
      } else {
        alert('Please upload a PDF, TXT, JSON, or XML file.');
        event.target.value = '';
        return;
      }

      // Parse as plain text CV
      const parseResult = CVParser.parseCV(text);
      setCvData(parseResult.data);
      
      // Ask if user wants to save parsed CV as profile
      if (window.confirm('Would you like to save this parsed CV as a new profile?')) {
        const profileName = prompt('Enter a name for this profile:') || file.name.replace(/\.[^.]+$/, '');
        try {
          profileManager.saveProfile(
            profileName,
            parseResult.data,
            sectionOrder,
            hiddenSections,
            selectedTemplate
          );
          alert(`CV parsed and saved as profile "${profileName}"`);
        } catch (saveError) {
          alert('CV parsed successfully, but failed to save as profile: ' + saveError.message);
        }
      }
      
      if (parseResult.message) {
        alert(`Import completed: ${parseResult.message}`);
      }
      
    } catch (error) {
      console.error('Import error:', error);
      alert(`Error reading file: ${error?.message ?? 'Unknown error'}`);
    } finally {
      if (event?.target) event.target.value = '';
    }
  }, [extractPdfText, setCvData, setSectionOrder, setHiddenSections, setSelectedTemplate, sectionOrder, hiddenSections, selectedTemplate]);

  return {
    importFromFile,
    exportToPDF,
    exportAsJSON,
    exportAsXML,
    extractPdfText
  };
};
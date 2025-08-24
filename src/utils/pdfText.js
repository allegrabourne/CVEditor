// utils/pdf_text.js
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function extractPdfText(file) {
  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map(it => it.str).join('\n');
    pages.push(text);
  }
  return pages.join('\n\n'); 
}

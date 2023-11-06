import { pdfjs } from 'react-pdf';

// Specify the path to the PDF.js worker file
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

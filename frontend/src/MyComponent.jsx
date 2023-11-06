import pdfFile from './meme.pdf';
import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import API from './components/API';


const MyPDFViewer = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const [pdfUrl, setPdfUrl] = useState('');
  console.log(pdfUrl)
  //update window size
  useEffect(() => {
    var getvacancy = async () => {
      try {
        const resp = await API.get("api/files/13/");
        console.log(resp.data)
        setPdfUrl(resp.data.file)
      } catch (e) {
        console.log(e)
      }
    }

    getvacancy();
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

    }, []);

  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const pages = [];

  for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
    pages.push(
      <Page
        key={pageNumber}
        pageNumber={pageNumber}
        width={windowSize.width * 0.8}
        height={windowSize.height * 0.8}
        renderTextLayer={false}
        renderInteractiveForms={false}
        renderAnnotationLayer={false}
        renderMode="canvas"
        margin={0}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {pages}
      </Document>
    </div>
  );


};

export default MyPDFViewer;
 
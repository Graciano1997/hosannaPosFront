import React, { useState } from 'react';
import pdfFile from './item.pdf';
import LargeModal from '../general/LargeModal';

function PdfViewer({url,closeHandler=()=>{}}) {
  // You can use state to control which PDF is displayed
  const [pdfUrl, setPdfUrl] = useState(url);
  
  // Optional: Function to change the PDF source dynamically
  const changePdf = (newUrl) => {
    setPdfUrl(newUrl);
  };

  return (
    <LargeModal closeHandler={closeHandler} >
    <div className="pdf-container">
      {false && <div className="pdf-header">
        {/* Example buttons to change PDFs */}
        <div className="pdf-controls">
          <button onClick={() => changePdf('https://example.com/sample.pdf')}>
            Document 1
          </button>
          <button onClick={() => changePdf('https://example.com/another.pdf')}>
            Document 2
          </button>
        </div>
      </div>
    } 
      <div className="pdf-viewer">

        <iframe
          title="PDF Viewer"
          width="100%"
          height="600px"
          className='rounded-[8px]'
          // style={{ border: 'none', background:'transparent' }}
          allowFullScreen
          >
            {pdfUrl}
            </iframe>
      </div>
    </div>
 </LargeModal>
  );
}

export default PdfViewer;
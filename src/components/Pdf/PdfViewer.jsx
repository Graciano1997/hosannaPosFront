import React, { useState } from 'react';
import pdfFile from './item.pdf';
import LargeModal from '../general/LargeModal';

function PdfViewer() {
  // You can use state to control which PDF is displayed
  const [pdfUrl, setPdfUrl] = useState(pdfFile);
  
  // Optional: Function to change the PDF source dynamically
  const changePdf = (newUrl) => {
    setPdfUrl(newUrl);
  };

  return (
    <LargeModal>
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
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&download=1&view=FitH`}
          title="PDF Viewer"
          width="100%"
          height="600px"
          className='rounded-[8px]'
          style={{ border: 'none', background:'transparent' }}
          allowFullScreen
          />
      </div>
    </div>
 </LargeModal>
  );
}

export default PdfViewer;
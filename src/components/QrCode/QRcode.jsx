import { QRCodeCanvas } from "qrcode.react";
import { QrReader } from "react-qr-reader";

function QRcode() {
  const handleResult = (result, error) => {
    if (result) {
      console.log("QR Code Lido:", result.text);
      alert(result.text);
    }
    if (error) {
      console.error("Erro ao ler QR Code:", error);
    }
  };

  return (
    <div>
      <h1>Gerar e Ler QR Codes</h1>

      {/* Gerar QR Code */}
      <div>
        <h2>Gerar QR Code</h2>
        <QRCodeCanvas value="https://exemplo.com" size={256} />
      </div>


      <div>
        <h2>Ler QR Code</h2>
        <QrReader
          onResult={handleResult}
          constraints={{ facingMode: "environment" }}
          containerStyle={{heigt:`${300}px`,width:`${300}px`,borderRadius:`${20}px`}}
          style={{ width: "100%" }}
          videoStyle={{borderRadius:`${20}px`}}
          className="rounded"
        />
      </div>
    </div>
  );
}

export default QRcode;

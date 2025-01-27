import { useRef } from "react";
import { QrReader } from "react-qr-reader";

const QrCodeReader =({setIsReadingQr,setReadValue,readValue,setToastObject})=>{
const qrRef =  useRef(null);

    return(
    <div>
    <div className="fixed w-[100%] h-[100%] top-[0] bg-black opacity-50 left-[0] bg-black">
       <div className="w-[10px] h-[10px] z-[2000] fixed right-[15px] top-[20px] flex flex-col justify-center items-center">
        <button className="text-black text-lg bg-white p-2 rounded shadow" onClick={()=>{
        setIsReadingQr(false);
            if(qrRef.current){
                qrRef.current.stopCamera();
            }
            }}>X</button>
       </div>
    </div>
    <div className="fixed w-[350px] h-[400px]  top-[50%] left-[50%] bg-white rounded shadow-md flex flex-col justify-center items-center transform -translate-x-1/2 -translate-y-1/2"
    >
        <p className="p-2 mt-[12px]">Leiror QRcode</p>  
        {readValue && (<p>Valor lido: {readValue}</p>)}
    <QrReader 
    ref={qrRef}
     videoContainerStyle={{
        width: '350px',
        height: '350px', 
      }}
     onResult={(result,error)=>{
        if(!!result){

            if(result.text!='' || result.text!=null){
                setReadValue(result.text);
                // setIsReadingQr(false);
                setToastObject({error:false,success:true,message:"Lido com sucesso!"})
            }

            if(qrRef.current){qrRef.current.stopCamera();}
        }
    }}/>
    </div>
    </div>
)
};

export default QrCodeReader;
// import { useRef } from "react";
// import { QrReader } from "react-qr-reader";

// const QrCodeReader =({setIsReadingQr,setReadValue,readValue,setToastObject})=>{
// const qrRef =  useRef(null);
//     document.getElementById('root').classList.add('no-scrool');
//     return(
//     <div>
//     <div className="fixed w-[100%] h-[100%] top-[0] bg-black opacity-50 left-[0] bg-black">
//     </div>
//     <button  className="absolute text-black text-lg bg-white p-2 rounded shadow  right-[15px] top-[20px]" onClick={()=>{
//         setIsReadingQr(false);
//             if(qrRef.current){
//                 qrRef.current.stopCamera();
//             }
//             document.getElementById('root').classList.remove('no-scrool');
//             }}>X</button>
//     <div className="fixed w-[350px] h-[400px]  top-[50%] left-[50%] bg-white rounded shadow-md flex flex-col justify-center items-center transform -translate-x-1/2 -translate-y-1/2">
   
//         <p className="p-2 text-center mt-[12px]">Leiror QRcode</p>  
//     <QrReader 
//     ref={qrRef}
//      videoContainerStyle={{
//         width: '350px',
//         height: '350px', 
//       }}
//      onResult={(result,error)=>{
//         if(!!result){

//             if(result.text!='' || result.text!=null){
//                 setReadValue(result.text);
//                 setIsReadingQr(false);
//                 setToastObject({error:false,success:true,message:"Lido com sucesso!"})
//             }

//             if(qrRef.current){qrRef.current.stopCamera();}
//         }
//     }}/>
//     </div>
//     </div>
// )
// };

// export default QrCodeReader;
import ButtonGroup from "./Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";


const SaleDetails = ()=>{
    return(
        <div className={`h-[500px] bg-white rounded shadow-md p-3 flex flex-col gap-3`}>
        <h1 className="font-bold mt-5 text-end">* Sales Details</h1>
       
        <div className="flex flex-col saleDetails relative h-[600px]">
            <div className="flex flex-col bg-green-100">
                <div className='bg-green-100  flex justify-between items-center rounded p-1 shadow'>
                <input type='text' className='p-2 rounded outline-none  bg-green-100 w-[100%]' onInput={(el)=>{
                    
                    clearInterval(typingTimer);
                    typingTimer = setTimeout(()=>{
                        setHistoric(el.target.value);
                        
                    },1500);

                }
                }  placeholder="Procurar produto"/>
                <MagnifyingGlassIcon className="w-5 y-5 text-[#323232] cursor-pointer"/>
                </div>
            </div>

            <div className="mt-[40px] p-3 bg-white transition-all duration-200 shadow-sm hover:shadow-md rounded">
                
                <div className="grid grid-cols-[25fr_25fr_25fr_25fr] shadow-sm">
                <p className="text-red-500">Produto</p>
                <p className="text-red-500">Preco</p>
                <p className="text-red-500">qty</p>
                <p className="text-red-500">total</p>
                </div>

                <div className="flex flex-col gap-2 h-[230px] mt-2" style={{overflow:'auto'}}>
                <div className="grid grid-cols-[25fr_25fr_25fr_25fr] bg-green-50">
                <p>Banana</p>
                <p>100kz</p>
                <p>2</p>
                <p>5000kz</p>
                </div>
                <div className="grid grid-cols-[25fr_25fr_25fr_25fr]">
                <p>Banana</p>
                <p>100kz</p>
                <p>2</p>
                <p>5000kz</p>
                </div>
                
                </div>
               
            </div>
            
        <ButtonGroup/>
        </div>
        </div> 
    );
};

export default SaleDetails;
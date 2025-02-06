import ButtonGroup from "./Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SaleDetailsHeader from "./SaleDetailsHeader";
import SaleItem from "./SaleItem";


const SaleDetails = ({readValue})=>{
    return(
        <div className={`h-[500px] bg-white rounded shadow-md p-3 flex flex-col gap-3`}>
        <h1 className="font-bold mt-1 text-end">* Sales Details</h1>
       
        <div className="flex flex-col saleDetails relative h-[500px]">
        
        <div className="flex flex-col gap-3">
                <label htmlFor="searchProduct">Search Product</label>
                <div className="flex flex-col bg-green-100 rounded">
                <div className='bg-green-100  flex justify-between items-center rounded p-1 shadow'>
                <input type='text' id="searchProduct" className='p-1 rounded outline-none  bg-green-100 w-[100%]'
                value={readValue??''}
                onInput={(el)=>{
                    
                    clearInterval(typingTimer);
                    typingTimer = setTimeout(()=>{
                        setHistoric(el.target.value);
                        
                    },1500);

                }
                }  placeholder="Procurar produto"/>
                <MagnifyingGlassIcon className="w-5 y-5 text-[#323232] cursor-pointer"/>
                </div>
            </div>
            </div>
               
   

            <div className="mt-[40px] p-3 bg-white transition-all duration-200 shadow-sm hover:shadow-md rounded">
                
                <SaleDetailsHeader/>

                <div className="flex flex-col gap-2 h-[230px] mt-1" style={{overflow:'auto'}}>
                <SaleItem/>
                <SaleItem/>
                <SaleItem/>
                <SaleItem/>
                </div>
               
            </div>
            
        <ButtonGroup/>
        </div>
        </div> 
    );
};

export default SaleDetails;
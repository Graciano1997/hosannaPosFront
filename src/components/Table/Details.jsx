import { useSelector } from "react-redux";
import Modal from "../general/Modal";
import Money from "../general/Money";
import { stateDisplay, textDisplay } from "../../lib/activeDisplay";
import { useTranslation } from "react-i18next";
import { UserIcon } from "@heroicons/react/24/solid";
import { firstCapitalize } from "../../lib/firstCapitalize";

const Details = ({cleanItemDetails,filterDetails=[],rowStyle}) =>{

    const moneyFields = ['price','total', 'amount', 'cost_price','discount','difference','received_cash'];
    const detailsItem = useSelector((state)=>state.appState.itemDetails);
    let keys = Object.keys(detailsItem);
    const hasImage = detailsItem.image ?true:false;
    keys = keys.filter((item) => !filterDetails.includes(item))
    const {t}= useTranslation();
    
    return(
        <Modal helper={cleanItemDetails}>
            <div className="flex p-2">
            <div className="w-[100%]">
                <h4 className="text-3xl font-light text-end">{ firstCapitalize(t('details'))}</h4>
                <div className={`mt-[2rem] p-1 ${hasImage?'grid gap-[2rem] justify-center':'flex'}`} style={{gridTemplateColumns:`${ hasImage ?'10fr 90fr':'100fr'}`}}>      
                { hasImage && <div className="h-[100%]">
                <div className="w-[250px] h-[300px] sm:shadow rounded-[16px]">
                    {detailsItem.image==="none" && <UserIcon className="w-[100%] h-[100%] rounded-[16px]"/> }
                    {detailsItem.image!=="none" &&  <img src={detailsItem.image} className="w-[100%] h-[100%] rounded-[16px]" />}
                </div>
                </div>}
                <div className="flex flex-col w-[100%] h-[300px] p-3 rounded sm:shadow overflow-y-scroll">
                <div className="mt-2">
                {keys.map((item)=>
                <div className="flex flex-col gap-1 hover:shadow p-2">
                    <p className={`${rowStyle} p-1`}>{ firstCapitalize(t(item))}</p>
                    <p className="font-light">
                    {moneyFields.includes(item) &&  <Money amount={detailsItem[item]} />}
                        {typeof (detailsItem[item]) == "boolean" && stateDisplay(detailsItem[item]) }
                        {item!=="image" && !moneyFields.includes(item) && typeof(detailsItem[item]) != "boolean" &&  detailsItem[item]}
                    </p>
                </div>
                )}

                {
                    detailsItem.payment_way	&&
                    <>
                    <h2 className="text-end text-xl p-1">{firstCapitalize(t('products'))}</h2>
                 <div className="shadow p-2" >
                    <div className="grid grid-cols-7 gap-2 p-4">
                    { Object.keys(detailsItem.sale_products[0]).map((item)=><p className="font-bold">{firstCapitalize(t(item))}</p>)}
                    </div>

                    {detailsItem.sale_products.map((item,index)=>
                    <div className={`${index % 2 == 0 ? 'bg-red-200' : ''} hover:shadow grid grid-cols-7 gap-2 p-2 font-light`}>
                        <p>{item.code}</p>
                        <p>{item.name}</p>
                        <p>{item.qty}</p>
                        <p>{item.discount}</p>
                        <p>{item.taxes}</p>
                        <p><Money amount={item.price}/></p>
                        <p><Money amount={item.subtotal}/></p>
                    </div>
                    )}
                </div>
                    </>}

                </div>
                </div>
                </div>
                {/* <div className="mt-[2rem] flex justify-end">
                <button className="bg-green-200 p-2 rounded hover:shadow"> {firstCapitalize(t('export'))}</button>
                </div> */}
            </div>
            </div>
        </Modal>
    )
};

export default Details;

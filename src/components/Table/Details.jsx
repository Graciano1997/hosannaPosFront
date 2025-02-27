import { useSelector } from "react-redux";
import Modal from "../general/Modal";
import Money from "../general/Money";
import { stateDisplay, textDisplay } from "../../lib/activeDisplay";
import { useTranslation } from "react-i18next";
import LargeModal from "../general/LargeModal";
import { UserIcon } from "@heroicons/react/24/solid";

const Details = ({cleanItemDetails,filterDetails=[]}) =>{

    const moneyFields = ['price', 'total', 'amount', 'cost_price'];
    const detailsItem = useSelector((state)=>state.appState.itemDetails);
    let keys = Object.keys(detailsItem);

    keys = keys.filter((item) => !filterDetails.includes(item))
    const {t}= useTranslation();
    

    return(
        <Modal helper={cleanItemDetails}>
            <div className="flex p-2">
            <div>
                <h4 className="text-3xl font-light text-end">{t('details')}</h4>
                <div className="mt-[2rem] p-1 grid gap-[2rem] justify-center" style={{gridTemplateColumns:'10fr 90fr'}}>
            
                <div className="h-[100%]">

                <div className="w-[250px] h-[250px] sm:shadow rounded">
                    {detailsItem.image==="none" && <UserIcon className="w-[100%] h-[100%]"/> }
                    {detailsItem.image!=="none" &&  <img src={detailsItem.image} className="w-[100%] h-[100%]" />}
                </div>
                </div>
                <div className="flex flex-col w-[100%] h-[250px] p-3 rounded sm:shadow overflow-y-scroll">
                <div className="mt-2">
                {keys.map((item)=>
                <div className="flex flex-col gap-1 hover:shadow p-2">
                    <p className=" bg-green-200 p-1">{ (t(item))[0].toUpperCase().concat(t(item).slice(1)) }</p>
                    <p className="font-light">
                        
                        {/* {moneyFields.includes(item) ? <Money amount={detailsItem[item]} /> : typeof (detailsItem[item]) == "boolean" ? stateDisplay(detailsItem[item]) : detailsItem[item]} */}

                    {moneyFields.includes(item) &&  <Money amount={detailsItem[item]} />}
                        {typeof (detailsItem[item]) == "boolean" && stateDisplay(detailsItem[item]) }
                        {/* {key=="image" && item[key]==="none" && <div className="flex justify-center"><UserIcon className="w-[30px] h-[30px] rounded-[20px] duration-200 transition-all hover:shadow" /></div>} */}
                        {item!=="image" && !moneyFields.includes(item) && typeof(detailsItem[item]) != "boolean" &&  detailsItem[item]}
                    </p>
                </div>
                )}
                </div>
                </div>
                </div>
                <div className="mt-[2rem] flex justify-end">
                <button className="bg-green-200 p-2 rounded hover:shadow"> {t('export')}</button>
                </div>
            </div>
            </div>
        </Modal>
    )
};

export default Details;

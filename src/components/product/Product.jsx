import { useTranslation } from "react-i18next";
import Title from "./Title";
import { useState } from "react";
import Table from "../Table/Table";
import Create from "./Create";

const Product=()=>{
    const {t}=useTranslation();
    const [isShowing,setIsShowing]=useState(false);
    const [products,setProducts]=useState([{
        name:'Banana',
        price:200,
        qty:20,
        state:'available',
        expireDate:'2023-12-12', 
    },

]);

    return(
        <>
        <div className="bg-white rounded p-2 h-[500px] mt-[2rem]">
        <Title title={t('products')}/>
        <div className="h-[350px] rounded p-2" style={{marginBottom:'2rem',paddingBottom:'2rem', overflowY:'scroll'}}>
        
        <Table collection={products}/>
        </div>
        </div>
        {isShowing && (<Create setIsShowing={setIsShowing}/>)}
        </>
    )
};

export default Product;
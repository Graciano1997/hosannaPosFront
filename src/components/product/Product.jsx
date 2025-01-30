import { useTranslation } from "react-i18next";
import Title from "../general/Title";
import { useState } from "react";
import Table from "../Table/Table";
import Create from "./Create";

const Product=()=>{
    const {t}=useTranslation();
    const [isCreating,setIsCreating]=useState(false);
    const [products,setProducts]=useState([{
        name:'Banana',
        price:200,
        qty:20,
        state:'available',
        expireDate:'2023-12-12'     
    },
    {
        name:'Banana',
        price:200,
        qty:20,
        state:'available',
        expireDate:'2023-12-12'     
    },
    {
        name:'Banana',
        price:200,
        qty:20,
        state:'available',
        expireDate:'2023-12-12'     
    },
    {
        name:'Banana',
        price:200,
        qty:20,
        state:'available',
        expireDate:'2023-12-12'     
    },
    {
        name:'Banana',
        price:200,
        qty:20,
        state:'available',
        expireDate:'2023-12-12'     
    },
    {
        name:'Banana',
        price:200,
        qty:20,
        state:'available',
        expireDate:'2023-12-12'     
    },
    {
        name:'Banana',
        price:200,
        qty:20,
        state:'available',
        expireDate:'2023-12-12'     
    },
    {
        name:'Banana',
        price:200,
        qty:20,
        state:'available',
        expireDate:'2023-12-12'     
    },
    {
        name:'Banana',
        price:200,
        qty:20,
        state:'available',
        expireDate:'2023-12-12'     
    }
]);

    return(
        <>
        <Title setIscreating={setIsCreating} title={t('products')}/>
        <Table collection={products}/>
        {isCreating && (<Create/>)}
        </>
    )
};

export default Product;
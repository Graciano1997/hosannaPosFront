import { useTranslation } from "react-i18next";
import Title from "../general/Title";
import { useState } from "react";
import Table from "../Table/Table";

const Product=()=>{
    const {t}=useTranslation();
    const [products,setProducts]=useState([{
        name:'Banana',
        price:200,
        quantity:20,
        availableToSale:true,
        creationDate:'2023-12-12',
        expireDate:'2023-12-12'     
    },
    {
        name:'Banana',
        price:200,
        quantity:20,
        availableToSale:true,
        creationDate:'2023-12-12',
        expireDate:'2023-12-12'     
    },
    {
        name:'Banana',
        price:200,
        quantity:20,
        availableToSale:true,
        creationDate:'2023-12-12',
        expireDate:'2023-12-12'     
    },
    {
        name:'Banana',
        price:200,
        quantity:20,
        availableToSale:true,
        creationDate:'2023-12-12',
        expireDate:'2023-12-12'     
    },
    {
        name:'Banana',
        price:200,
        quantity:20,
        availableToSale:true,
        creationDate:'2023-12-12',
        expireDate:'2023-12-12'     
    },
    {
        name:'Banana',
        price:200,
        quantity:20,
        availableToSale:true,
        creationDate:'2023-12-12',
        expireDate:'2023-12-12'     
    }
]);

    return(
        <>
        <Title title={t('products')}/>
        <Table collection={products}/>
        </>
    )
};

export default Product;
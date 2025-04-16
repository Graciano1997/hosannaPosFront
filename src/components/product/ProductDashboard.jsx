import { useTranslation } from "react-i18next";
import Card from "../general/Card";
import { BarChart } from "../dashboard/BarChart";
import LastSelling from "../dashboard/LastSelling";
import currency from "currency.js";
import { PieChart } from "../dashboard/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { extractFieldToArray } from "../../lib/extractFieldToArray";
import { RandomColor } from "../../lib/randomColor";
import LastExpired from "../dashboard/LastExpired";
import { expiredProducts } from "../../lib/expiredProducts";
import { sortCollection } from "../../lib/sortCollection";
import { sum } from "../../lib/sumCollection";
import { useEffect } from "react";
import { fetchAnualExpiredProducts, fetchProducts } from "../../slices/productSlice";
import { annualMonths } from "../../lib/Months";
import { firstCapitalize } from "../../lib/firstCapitalize";
import Money from "../general/Money";

const ProductDashboard=()=>{
  const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(fetchAnualExpiredProducts());
      dispatch(fetchProducts());
    },[]);

    const {t}=useTranslation();
    const productState = useSelector((state)=>state.productState);   
    const products = productState.products;   
    const lastExpireds=sortCollection(expiredProducts(products),'expire',true,true);


    const barChartData = {
      labels:annualMonths.map((month)=>firstCapitalize(t(month))),
  datasets: [
      {
      label:t('expired'),
      data: productState.anualExpireds,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
  ],
  };


    const labels = extractFieldToArray(products,'name');
     const data = {
        labels,
        datasets: [
          {
            label: t('available'),
            data: extractFieldToArray(products,'qty',{key1:'qty',key2:'output',op:'-'}),
            backgroundColor: labels.map(()=>`${RandomColor().background}`) ,
            borderColor: labels.map(()=>`${RandomColor().borderColor}`),
            borderWidth: 1,
          },
        ],
      };


    return(
        <>
        <div className="flex flex-wrap justify-center items-center gap-[20px] mt-[3rem] p-1">
        <BarChart data={barChartData} width={450} height={350} info={firstCapitalize(t('annual_expireds'))} />
        <PieChart data={data} width={390} height={390} info={t('products_availability')}/>
        <Card className="font-black" width={400} height={350} info={{title:t('total_expireds',),output:true,description:<Money amount={sum(productState.expireds,'total').total} />}} />
        </div>
        </>
    )
};

export default ProductDashboard;
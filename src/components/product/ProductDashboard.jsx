import { useTranslation } from "react-i18next";
import Card from "../general/Card";
import { BarChart } from "../dashboard/BarChart";
import LastSelling from "../dashboard/LastSelling";
import currency from "currency.js";
import { PieChart } from "../dashboard/PieChart";
import { useSelector } from "react-redux";
import { extractFieldToArray } from "../../lib/extractFieldToArray";
import { RandomColor } from "../../lib/randomColor";
import LastExpired from "../dashboard/LastExpired";
import { expiredProducts } from "../../lib/expiredProducts";
import { sortCollection } from "../../lib/sortCollection";

const ProductDashboard=()=>{
    const {t}=useTranslation();
    const products = useSelector((state)=>state.productState.products);   
    const lastExpireds=sortCollection(expiredProducts(products),'expire',true,true);

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
        <Card className="font-black" width={400} height={350} info={{title:t('today_balance'),description:currency(1000,{separator:'.', decimal:',',precision:2}).add(200).format()}} />
        <PieChart data={data} width={390} height={390} info={t('products_availability')}/>
        <LastExpired width={450} data={lastExpireds} height={350} info={t('expireds')} />
        </div>
        </>
    )
};

export default ProductDashboard;
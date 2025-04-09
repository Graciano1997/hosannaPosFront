import currency from "currency.js";
import { useSelector } from "react-redux";

const Money = ({amount})=>{
const currencySetting = useSelector((state)=>state.appState.currency);

    return(
        <p className="">
        {currency(amount, {
            separator: ',',    // Thousands separator
            decimal: '.',      // Decimal separator
            symbol:'KZ ',      // Correct currency symbol
            precision: 2       // Decimal precision
        }).format()
    }
    </p>
           );
};

export default Money;
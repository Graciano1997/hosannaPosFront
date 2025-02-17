import currency from "currency.js";

const Money = ({amount})=>{

    return(
        <p className="">
        {currency(amount, {
            separator: ',',    // Thousands separator
            decimal: '.',      // Decimal separator
            symbol: 'kz ',      // Correct currency symbol
            precision: 2       // Decimal precision
        }).format()
    }
    </p>
           );
};

export default Money;
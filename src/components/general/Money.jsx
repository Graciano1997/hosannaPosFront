import currency from "currency.js";

const Money = ({amount})=>{

    return(
        <>
        {currency(amount, {
                            separator: ',',    // Thousands separator
                            decimal: '.',      // Decimal separator
                            symbol: 'kz ',      // Correct currency symbol
                            precision: 2       // Decimal precision
                            }).format()
        }
        </>
    );
};

export default Money;
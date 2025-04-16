import currency from "currency.js";
import { useSelector } from "react-redux";

const Money = ({ amount }) => {
  const currencySetting = useSelector((state) => state.appState.currency);

  return (
    <p className="">
      {currency(amount, {
        separator: ',',    // Milhar com ponto
        decimal: '.',      // Decimal com vírgula
        symbol: '',        // Pode ser 'Kz' se quiseres
        precision: 2
      }).format()}
    </p>
  );
};

export default Money;

import currency from "currency.js";
import { useSelector } from "react-redux";

const Money = ({ amount }) => {
  const currencySetting = useSelector((state) => state.appState.currency);
 
  const formattedMoney = new Intl.NumberFormat("pt-AO",{
    style:"currency",
    currency:"AOA"
  }).format(amount);

  return (
    <p className="">
      {formattedMoney}
    </p>
  );
};

export default Money;

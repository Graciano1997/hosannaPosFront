import React from "react";
import { useSelector } from "react-redux";

const Money = React.memo(
   ({ amount }) => {
  const currencySetting = useSelector((state) => state.appState.currency);
 
  const formattedMoney = new Intl.NumberFormat("pt-AO",{
    style:"currency",
    currency:"AOA"
  }).format(amount);

  return (
    <p className="truncate">
      {formattedMoney}
    </p>
  );
});

export default Money;

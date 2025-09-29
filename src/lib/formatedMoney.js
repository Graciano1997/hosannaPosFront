export const formattedMoney =(amount)=>{
   const formated =  new Intl.NumberFormat("pt-AO",{
    style:"currency",
    currency:"AOA"
  }).format(amount);
  
  return formated;
} 


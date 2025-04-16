export const totalWithTaxesAndDiscounts = (item,qtyToBuy) => { 
    
    const total = item.price * qtyToBuy;
    console.log("total",total);
    const discount = ((total * (item.discount?item.discount:0)/100));
    console.log("discount",discount);
    const tax = ((total * (item.taxes?item.taxes:0)/100));
    console.log("tax",tax);
    const totalGeral = (total + tax - discount);
    console.log("totalGeral",totalGeral);
    return totalGeral;
  }
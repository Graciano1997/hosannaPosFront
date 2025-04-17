export const totalWithTaxesAndDiscounts = (item,qtyToBuy) => { 
    
    const total = item.price * qtyToBuy;
    const discount = ((total * (item.discount?item.discount:0)/100));
    const tax = ((total * (item.taxes?item.taxes:0)/100));
    const totalGeral = (total + tax - discount);
    return totalGeral;
  }
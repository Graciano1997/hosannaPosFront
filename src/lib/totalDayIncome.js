export const totalDayIncome = (collection=[], date) => {

    let total = 0;

    if (collection.length > 0) {
         collection.forEach(element => {
            const saleDate = new Date(element.created_at);
            if(saleDate.getDate()==date.getDate() && saleDate.getMonth()==date.getMonth() && saleDate.getFullYear()==date.getFullYear()){
                total+=element.total*1
            }
            });
     }
    return  total ;
}
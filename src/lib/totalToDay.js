export const totalToDay = (collection=[], date,key=undefined) => {

    let total = 0;

    if (collection.length > 0) {
         collection.forEach(element => {
            const saleDate = new Date(element.created_at);
            if(saleDate.getDate()==date.getDate() && saleDate.getMonth()==date.getMonth() && saleDate.getFullYear()==date.getFullYear()){
                if(key){
                    total+=element[key]*1
                }else{
                    total+=element.total*1
                }
            }
            });
     }
    return  total ;
}
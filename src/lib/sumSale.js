export const sum=(sales)=>{

    let total =0;
    let totalItems=0;

    if(sales.length>0){
        sales.forEach(element =>{
            total+=element.total;
            totalItems+=element.qty*1;
        } );
        return {total:total,totalItems:totalItems};
    }
    
    return {total:0,totalItems:0};
}
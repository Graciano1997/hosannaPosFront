export const expiredProducts=(collection)=>{
    const expiredCollection =[];
    const today = new Date();

    collection.forEach((item)=>{
        if(item.expire_date!=null && today > (new Date(item.expire_date))){
            expiredCollection.push({name:item.name,qty:(item.qty-item.output),total:(item.qty - item.output)*item.price,data:{expire:item.expire_date,issue:item.manufacture_date}}
            );
        }
    });

    return expiredCollection;
}
export const removeDuplicate = (items,key)=>{
    if(items.length===0)
        return [];

    const uniqueItemskey = [];
    const uniqueItems = [];

    items.forEach(item => {
        if(!uniqueItemskey.includes(item[key])){
            uniqueItems.push(item);
            uniqueItemskey.push(item[key]);
        }
    });
    return uniqueItems;
}
export const sortCollection = (collectionArr,key,desc=false,date=false)=>{

    const collection = [...collectionArr]
    for(let i=0; i < collection.length; i++){
        for(let j=0; j<collection.length-1; j++){

             if(date){
                 if( (new Date(collection[j][key])) > (new Date(collection[j+1][key]))){
                     let temp = collection[j][key];
                     collection[j][key]=collection[j+1][key];
                     collection[j+1][key]=temp;
                 }
             }else{
                if(collection[j][key] > collection[j+1][key]){
                    let temp = collection[j];
                    collection[j]=collection[j+1]
                    collection[j+1]=temp;
                }
            }
        }
    }
    if(desc)
        return collection.reverse();
    
    return collection;
}


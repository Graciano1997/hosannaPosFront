export const sortCollection = (collection,key,desc=false,date=false)=>{
    for(let i=0; i< collection.length; i++){
        for(let j=0; j<collection.length - 1;j++){

            if(date){
                if( (new Date(collection[j][key])) > (new Date(collection[j+1][key]))){
                    const auxiliar = collection[j][key];
                    collection[j][key]=collection[j+1][key];
                    collection[j+1][key]=auxiliar;
                }
            }else{
                if(collection[j][key] > collection[j+1][key]){
                    const auxiliar = collection[j][key];
                    collection[j][key]=collection[j+1][key]
                    collection[j+1][key]=auxiliar;
                }
            }
        }
    }
        return collection;    
}

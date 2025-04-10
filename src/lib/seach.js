import { removeDiacritics } from "./removeDiacritic";

const searchCollection = (collection,key)=>{

    
   let item = collection.find(item=>item.id==key);

   let auxiliar = [];

   //means that it founded the searched id item....
   if(item!=undefined){
    auxiliar.push(item);
       return auxiliar;
    }
    

   const numericFields = [];
   const textFields = [];

   const keys = Object.keys(collection[0]);

     keys.forEach((field) =>{
         if(isNaN(collection[0][field])){
            textFields.push(field);
        }else{
             numericFields.push(field);
         }
     });


     if(isNaN(key)){
         let textResult = [];
         textFields.forEach((field=>{
             const result = collection.filter(item=> item[field]!=null && (removeDiacritics(item[field])).includes(removeDiacritics(key)));
             textResult=[...textResult,
                ...result
            ];
        }));
        
        auxiliar = [...textResult]; 
        return removeDuplicate(auxiliar,'id')
    }
     else{
         numericFields.forEach((field=>{
             let result = collection.find(item=>item[field]==key);
             if(result!=undefined){
                auxiliar.push(result);
             }
         }));
         return removeDuplicate(auxiliar,key);
     }
};

const removeDuplicate = (collection,key)=>{
    const arr=[];

    if(collection.length!=0){
        collection.forEach((item)=>{
            if(arr.find((it)=>it[key]==item[key])==undefined){
                arr.push(item);
            }
        });
    }

    return arr;
};

export default searchCollection;

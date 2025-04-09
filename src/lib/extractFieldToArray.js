export const extractFieldToArray =(objectCollection,field, object=undefined)=>{
    const fieldArray=[];

    
    if(objectCollection.length>0){
        objectCollection.forEach((item)=>{
            if(object!=undefined){
                switch(object.op){
                    case '-':
                        fieldArray.push((item[object.key1] - item[object.key2]));
                    break;
                    case '+':
                        fieldArray.push((item[object.key1]*1 + item[object.key2]*1));
                    break;

                    case '*':
                        fieldArray.push((item[object.key1] * item[object.key2]));
                    break;

                    case '/':
                        fieldArray.push((item[object.key1] / item[object.key2]));
                    break;
                }
            }else{
                fieldArray.push(item[field]);
            }
        });
    }

    return fieldArray;
}
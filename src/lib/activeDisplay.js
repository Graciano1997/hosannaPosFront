export const stateDisplay =state=>state?"Activo":"Desativo";

export const textDisplay = (text)=>{
    
    if(text){
        if(text.length>15){
            return text.slice(0,15).concat('...')
        }
    }
    return text;
}
export const auxiliar = (field,productConfigurationElements)=>{
    const element = productConfigurationElements.find(item=>item.field === field);
    console.log(element);

    if(element!=undefined){
        return {active:element.active,mandatory:element.mandatory}
    }

    return false;
}

export const DateTime=(data)=>{ return new Date(data).toLocaleString("pt-PT", {day: "2-digit",month: "2-digit",year: "numeric",hour: "2-digit",minute: "2-digit",}).replace(",", "")}
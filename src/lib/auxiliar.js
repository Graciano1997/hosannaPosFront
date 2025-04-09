export const auxiliar = (field,productConfigurationElements)=>{
    const element = productConfigurationElements.find(item=>item.field === field);
    console.log(element);

    if(element!=undefined){
        return {active:element.active,mandatory:element.mandatory}
    }

    return false;
}
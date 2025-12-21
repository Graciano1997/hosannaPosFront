export const handleSearchClick=(event,ref)=>{
    event.stopPropagation();
     if(!(ref.current!=null && ref.current==event.target || ref.current.contains(event.target)) ){
        searchHandleClick(false);
     }    
}

export const handleType=(event)=>{
    event.stopPropagation();
     if(event.key=="Escape"){
        searchHandleClick(false);
     }    
}


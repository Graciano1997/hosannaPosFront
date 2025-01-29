import Tr from "./Tr";

const Tbody =({items})=>{
    return(
        <tbody className="h-[300px]">
            {items.map((item,index)=><Tr item={item} index={index}/>)}
        </tbody>
    )
};

export default Tbody;
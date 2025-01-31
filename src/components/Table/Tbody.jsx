import Tr from "./Tr";

const Tbody =({items})=>{
    return(
        <tbody>
            {items.map((item,index)=><Tr item={item} index={index}/>)}
        </tbody>
    )
};

export default Tbody;
import Tr from "./Tr";

const Tbody =({items,deleteItem})=>{
    return(
        <tbody>
            {items.map((item,index)=><Tr deleteItem={deleteItem} item={item} index={index}/>)}
        </tbody>
    )
};

export default Tbody;
import Tr from "./Tr";

const Tbody =({items,deleteItem, filterRows})=>{
    return(
        <tbody>
            {items.map((item,index)=><Tr filterRows={filterRows} deleteItem={deleteItem} item={item} index={index}/>)}
        </tbody>
    )
};

export default Tbody;
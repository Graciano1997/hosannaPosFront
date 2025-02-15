import Tr from "./Tr";

const Tbody =({items,deleteItem,updateItem, filterRows})=>{
    return(
        <tbody>
            {items.map((item,index)=><Tr filterRows={filterRows} updateItem={updateItem} deleteItem={deleteItem} item={item} index={index}/>)}
        </tbody>
    )
};

export default Tbody;
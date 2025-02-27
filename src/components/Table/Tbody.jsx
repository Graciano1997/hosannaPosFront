import Tr from "./Tr";

const Tbody =({items,deleteItem,updateItem, filterRows,filterDetails})=>{
    return(
        <tbody>
            {items.map((item,index)=><Tr filterDetails={filterDetails} filterRows={filterRows} updateItem={updateItem} deleteItem={deleteItem} item={item} index={index}/>)}
        </tbody>
    )
};

export default Tbody;
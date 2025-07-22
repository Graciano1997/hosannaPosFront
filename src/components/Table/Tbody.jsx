import Tr from "./Tr";

const Tbody =({items,deleteItem,updateItem,printItem, filterRows,filterDetails,addItem})=>{
    return(           
        <tbody className={`overflow-y-scroll text-sm`} >
            {items.map((item,index)=><Tr filterDetails={filterDetails} printItem={printItem} filterRows={filterRows} updateItem={updateItem} deleteItem={deleteItem} addItem={addItem} item={item} index={index}/>)}
        </tbody>
    )
};

export default Tbody;
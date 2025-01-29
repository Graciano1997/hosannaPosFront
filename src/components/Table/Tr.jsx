const Tr =({item,index})=>{
    const keys = Object.keys(item)
    return(
        <tr className={`${index%2==0?'bg-green-100':''}`}>
            {keys.map((key)=><td>{item[key]==true?'Yes':item[key]}</td>)}
        </tr>
    )
}

export default Tr;
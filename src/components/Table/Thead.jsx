const Thead=({object})=>{

    const keys=Object.keys(object)

    return(
      <thead>
      <tr className="p-2 shadow h-[45px]">
      {keys.map((label)=><th className="p-1">{label[0].toUpperCase().concat(label.slice(1))}</th>)}
      <th className="p-1">{' '}</th>
      </tr>
      </thead>
    ); 
};

export default Thead;
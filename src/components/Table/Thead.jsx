const Thead=({object})=>{

    console.log(object);

    const keys=Object.keys(object);
console.log(keys);
  return(
      <thead>
      <tr className="p-1 shadow">
      {keys.map((label)=><td className="p-1">{label}</td>)}
      </tr>
      </thead>
    ); 
};

export default Thead;
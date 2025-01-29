const Thead=({object})=>{

    console.log(object);

    const keys=Object.keys(object);
console.log(keys);
  return(
      <thead>
      <tr className="p-2 shadow">
      {keys.map((label)=><th className="p-1 text-center">{label}</th>)}
      </tr>
      </thead>
    ); 
};

export default Thead;
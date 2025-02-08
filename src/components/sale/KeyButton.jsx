const KeyButton = ({number})=>{
    return(
        <div className="">
        <button className={`${number==0?"w-[100%]":"w-[50px]"}  h-[53px] p-2 rounded bg-green-200 text-black text-3xl text-bold hover:shadow`}>
        {number}
        </button>
        </div>
    );
};

export default KeyButton;
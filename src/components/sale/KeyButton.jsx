const KeyButton = ({number})=>{
    return(
        <button className="w-[60px] h-[50px] p-2 rounded bg-green-200 text-black text-3xl text-bold hover:shadow">
        {number}
        </button>
    );
};

export default KeyButton;
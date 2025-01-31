const CurrentUser=(props)=>{
    return(
                <div className="flex justify-start items-center gap-2 mt-1 w-[100%]">
                <div className="w-[40px] h-[40px]">
                    <img src={props.image} className="w-[100%] h-[100%] rounded-full cursor-pointer shadow-lg"/>
                </div>
                <p className="text-[12px]">{props.username}</p>
                </div>
    );

};

export default CurrentUser;
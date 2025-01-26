const CurrentUser=(props)=>{
    return(
                <div className="flex justify-between items-center gap-2">
                <div className="w-[60px] h-[60px]">
                    <img src={props.image} className="w-[100%] h-[100%] rounded-full cursor-pointer shadow-lg"/>
                </div>
                <p className="text-[12px]">{props.username}</p>
                </div>
    );

};

export default CurrentUser;
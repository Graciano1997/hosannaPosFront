const CardWrapper = ({children,centralize=false})=>
<div className={`${centralize?'flex justify-center items-center':''}  rounded p-2   mt-[3rem] `}>{children}</div>;

export default CardWrapper;
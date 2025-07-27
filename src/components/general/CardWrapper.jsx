const CardWrapper = ({children,centralize=false})=>
<div className={`${centralize?'flex justify-center items-center':''}  rounded p-2  mt-[3rem] resize-y`}>{children}</div>;

export default CardWrapper;
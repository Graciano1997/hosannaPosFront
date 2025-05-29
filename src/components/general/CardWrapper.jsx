const CardWrapper = ({children,centralize=false})=><div className={`${centralize?'flex justify-center items-center':''} rounded p-2 lg:h-[100%] overflow-y-hidden  mt-[3rem] `}>{children}</div>;

export default CardWrapper;
const TabWrapper = ({children, size=null})=> 
     <div className={`${size?`w-[${size}%]`: `` } h-[${80}%]   rounded p-2 overflow-y-auto bg-white`}>{children}</div>
export default TabWrapper;      
const TabWrapper = ({children, size=null})=> 
     <div className={`${size?`w-[${size}%]`: `` }  resize-y   rounded p-2 bg-white`}>{children}</div>
export default TabWrapper;      
const TabWrapper = ({children, size=null})=> 
     <div className={`${size?`w-[${size}%]`: `` } pt-3 resize-y   rounded p-2 bg-white`}>{children}</div>
export default TabWrapper;      
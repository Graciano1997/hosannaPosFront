export const Button =({className="",content,type="button", onClickHandler=()=>{}})=>{
    const bgClass = className.includes("bg-")? "": "bg-primary-dark";
    return(<button type={type} onClick={onClickHandler} className={`${bgClass} ${className}`}>{content}</button>)
};

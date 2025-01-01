import { useEffect, useRef} from "react";

const Navegation =({visible,setVisibility})=>{

    const navegationRef = useRef(null);

    useEffect(()=>{

        const handlerClick=(event)=>{
            if(!((event.target).contains(navegationRef.current))){
                setVisibility(false);
            }
        }
        
        window.addEventListener("click",handlerClick)

        return()=>{
            window.removeEventListener("click",handlerClick)
        }

    },[]);

    return(
        <nav ref={navegationRef} className={`rounded opacity-95 fixed h-[100%] w-[18%] bg-white top-[0] shadow-md left-[-18%] transition-all duration-700 navegation ${visible ? 'visible':''}`}>
        </nav>
    )
};

export default Navegation;

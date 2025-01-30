
const Modal = ({child})=>{
    return(
        <>
        <div className="flex items-center">
        <div className="fixed w-[100%] h-[100%] top-[0] left-[0] blur-sm">
        </div>
        <div className='fixed  bg-black/20 w-[100%] h-[100%] top-[0] left-[0] flex justify-center'>
            <div className='p-3 mt-[5rem]  w-[80%]  h-[350px]  rounded bg-white shadow'>
                {child}
            </div>
        </div>
        </div>
    </>
    );
};

export default Modal;

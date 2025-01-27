const ShowToast = ({object})=>{
    return(
       <div className={`bg-black opacity-75 w-[400px]
        ${object.success?'text-green-500':''}
        ${object.error?'text-red-500':''}
        flex justify-center items-center
        p-4 fixed bottom-[10px] right-[10px]
        rounded-[16px] flex-wrap`}>
        <p>{object.message}</p>
      </div>
    );
}

export default ShowToast;

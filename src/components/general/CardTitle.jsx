import { firstCapitalize } from "../../lib/firstCapitalize";

const CardTitle=({title})=>{
    return(
        <div className="shadow bg-white-500 pl-4 flex justify-center items-center rounded-t">
        <h2 className="text-center">{firstCapitalize(title)}</h2>
     </div>
    );
};

export default CardTitle;
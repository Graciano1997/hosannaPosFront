import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/solid";
import { SortIcon } from "../general/SortIcon";
import { useState } from "react";
import { sortCollection } from "../../lib/sortCollection";
import { useDispatch } from "react-redux";

const Thead = ({ object, filterRows, items=[], setCollection }) => {

  const { t } = useTranslation();
  const [activeSortCol,setActiveSortCol]=useState('id');
  const [activeSortOrdDesc,setActiveSortOrdDesc]=useState(false);
  const sortingFieldFilter=['image'];
  const dispatch = useDispatch();
  const keys = Object.keys(object).filter((item) => !filterRows.includes(item));
  
  return (
    <thead className="sticky bg-white top-[-8px]" >
      <tr className="p-2 shadow h-[45px]">
        {keys.map((label) => 
        <th className="p-2 text-sm cursor-pointer"  onClick={()=>{
          
          let defaultState=false;

          if(activeSortCol==label){
            defaultState=!activeSortOrdDesc;
            setActiveSortOrdDesc(defaultState);
          }else{
            defaultState=false;

            setActiveSortOrdDesc(defaultState);
            if(!sortingFieldFilter.includes(label))
              setActiveSortCol(label);
          }
          dispatch(setCollection(sortCollection(items,label,activeSortOrdDesc)));
          //this ensure to set the sorted collection....
          }}>
            <div className="flex justify-center items-center gap-3 ">{firstCapitalize(t(label))}
              {<SortIcon desc={activeSortOrdDesc} show={ sortingFieldFilter.includes(label)? false: label==activeSortCol}/>}
            </div>
          </th>)}
        <th className="p-2">{' '}</th>
      </tr>
    </thead>
  );
};

export default Thead;
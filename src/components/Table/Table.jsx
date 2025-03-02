import { PlusIcon } from "@heroicons/react/24/solid";
import Tbody from "./Tbody";
import Thead from "./Thead";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../slices/appSlice";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { firstCapitalize } from "../../lib/firstCapitalize";

const Table = ({ collection, deleteItem = () => { }, update = () => { }, create = () => { }, filterRows = [], filterDetails = [] }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const appState= useSelector((state)=>state.appState);
    
    return (
        <>
            <div className="">
              {pathname !=='/sales' &&
               <div className="flex justify-end">
               <button onClick={() => { dispatch(create()); dispatch(openModal()); }} className="p-2"><PlusIcon className="rounded-[30%] w-10 h-10 text-green-700 shadow hover:shadow-md" /></button>
                </div>
              } 
              
                {(appState.error!='' && !appState.loading) &&
                    <div className="rounded text-center w-[100%] mt-[5rem]">
                        <div className="mt-[5rem] flex justify-center">
                            <p className="text-2xl font-light text-red-500 p-1"> {firstCapitalize(appState.error)}</p>
                        </div>

                    </div>
                }

                {(appState.loading) &&
                    <div className="rounded text-center w-[100%] mt-[5rem]">
                        <div className="mt-[5rem] flex justify-center">
                            <p className="text-2xl font-light text-green-900 p-1"> {firstCapitalize(t('loading'))}</p>
                        </div>
                    </div>
                }

                {(collection.length==0) && appState.error=='' && !appState.loading &&
                    <div className="rounded text-center w-[100%] mt-[5rem]">
                        <div className=" mt-[5rem] flex justify-center">
                            <p className="text-2xl font-light p-1"> {firstCapitalize(t('no_registry'))}</p>
                        </div>
                    </div>
                }

                {appState.error=='' && !appState.loading && collection.length > 0 &&
                    <div className="w-100 overflow-scroll p-1 h-[400px]">
                        <table className="rounded shadow-md  w-[100%]" style={{borderLeft:'4px solid green'}}>
                            <Thead filterRows={filterRows} object={collection[0]} />
                            <Tbody filterDetails={filterDetails} filterRows={filterRows} updateItem={update} deleteItem={deleteItem} items={collection} />
                        </table>
                    </div>
                }
            </div>
        </>
    );
};

export default Table;
import { ArrowPathIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import Tbody from "./Tbody";
import Thead from "./Thead";
import { useDispatch, useSelector } from "react-redux";
import { activeTab, openModal, setTableCurrentCollection } from "../../slices/appSlice";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { firstCapitalize } from "../../lib/firstCapitalize";
import searchCollection from "../../lib/seach";
import { useEffect, useState } from "react";


const Table = ({ collection = [], addItem = null, setCollection=()=>{}, deleteItem = () => { }, printItem=null , update = () => { }, create = () => { }, filterRows = [], filterDetails = [], dispatcher = () => { }, fetcher = () => { } }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const appState = useSelector((state) => state.appState);
    const [query, setQuery] = useState('');

    const searchHandler = () => {
        if(query.trim().length > 0) {
            const result = searchCollection(collection, query);
            dispatch(dispatcher(result));
        }
    }
    return (
        <>
            <div className="">
                {create &&
                    <div className="flex justify-end">
                        <button onClick={() => { dispatch(create()); dispatch(openModal()); }} className="p-2">
                            <PlusIcon className="rounded-[30%] w-10 h-10 text-green-700 shadow hover:shadow-md" />
                        </button>
                    </div>
                }

                <div className="mb-2">
                            <input type="search" onKeyDown={(el) => {
                                if (el.key == "Enter") {
                                    searchHandler();
                                }
                            }}
                                onChange={(el) => {
                                    if ((el.target.value).trim() != "") {
                                        setQuery(el.target.value);
                                    } else {
                                        setQuery('');
                                        dispatch(fetcher());
                                    }
                                }}
                                className="p-[4px_15px_4px_4px] border-none outline outline-1 outline-green-300 " id="search" placeholder={firstCapitalize(t('filter'))} />

                            <button
                                onClick={searchHandler}
                                className="bg-black p-[5px_25px] text-white relative top-[5px]">
                                <MagnifyingGlassIcon
                                    onClick={(e) => { }} className="w-5 y-5 cursor-pointer" />
                            </button>
                        </div>

                {(appState.error != '' && !appState.loading) &&
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

                {(collection.length == 0) && appState.error == '' && !appState.loading &&
                    <div className="rounded text-center w-[100%] mt-[5rem]">
                        <div className=" mt-[5rem] flex flex-col justify-center">
                            <p className="text-2xl font-light p-1"> {firstCapitalize(t('no_registry'))}</p>

                            <div className="flex justify-center mt-[1rem]">
                                <button
                                    onClick={() => {
                                        dispatch(fetcher());
                                    }}
                                    className="rounded-[4px] p-2  flex items-center  bg-black text-white">{firstCapitalize(t('reload'))}
                                    <ArrowPathIcon className="w-5 h-5 cursor-pointer relative left-[5px]" />
                                </button>
                            </div>
                        </div>
                    </div>
                }

                {appState.error == '' && !appState.loading && collection.length > 0 &&
                    <div className={`w-100 overflow-scroll p-1 h-[400px]  mt-[1.5rem] resize-y`}>
                        
                        <table className="rounded shadow-md  w-full h-full table-auto" >
                            <Thead filterRows={filterRows} setCollection={setCollection} items={collection} object={collection[0]} />
                            <Tbody filterDetails={filterDetails} addItem={addItem} filterRows={filterRows} updateItem={update} deleteItem={deleteItem} printItem={printItem} items={collection} />
                        </table>
                    </div>
                }
            </div>
        </>
    );
};

export default Table;
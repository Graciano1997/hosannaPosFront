import { ArrowPathIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import Tbody from "./Tbody";
import Thead from "./Thead";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../slices/appSlice";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import searchCollection from "../../lib/seach";
import { useState } from "react";
import { DatePickerFilter } from "../general/DatePickerFilter";
import { useLocation } from "react-router-dom";


const Table = ({ collection = [], addItem = null, setCollection = () => { }, deleteItem = () => { }, printItem = null, update = () => { }, create = () => { }, filterRows = [], filterDetails = [], dispatcher = () => { }, fetcher = () => { }, fetcherParam = null, searchBackEndHandler = null, loadingMore = null, rowStyle = "bg-green-100" }) => {

    const exceptionUrl = ['/setting'];
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const appState = useSelector((state) => state.appState);
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searching, setSearching] = useState(false);
    const [rangeDate, setRangeDate] = useState({
        from: null,
        to: null
    });

    const [visibility, setVisibility] = useState(false);


    const searchHandler = async () => {
        if (query.trim().length > 0) {
            setSearching(true);
            const result = searchCollection(collection, query);

            if (result.length == 0) {
                if (searchBackEndHandler) {
                    dispatch(searchBackEndHandler())
                        .then((searchResultAction) => {
                            console.log(searchResultAction);
                        })
                }
            }

            setSearchResult(result);
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

                <div className="flex gap-5 items-center">

                    {
                        !exceptionUrl.includes(pathname) &&
                        <>

                            {collection.length > 0 &&
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
                                                setSearching(false);
                                                dispatch(setSearchResult([]));
                                            }
                                        }}
                                        className="p-[4px_15px_4px_4px] border-none outline outline-1 outline-green-300 border border-gray-300 rounded" id="search" placeholder={firstCapitalize(t('filter'))} />

                                    <button
                                        onClick={searchHandler}
                                        className="bg-black p-[5px_25px] text-white relative top-[5px]">
                                        <MagnifyingGlassIcon
                                            onClick={(e) => { }} className="w-5 y-5 cursor-pointer" />
                                    </button>
                                </div>
                            }


                            <p className="font-bold">{firstCapitalize(t('date_interval'))}:</p>

                            {collection.length > 0 &&
                                <div>
                                    <div className="mb-2">
                                        <input type="search" value={rangeDate.from != null && rangeDate.to != null ? `${rangeDate.from} - ${rangeDate.to}` : ''} onClick={() => { setVisibility(true) }}
                                            className="p-[4px_15px_4px_4px] border-none outline outline-1 outline-green-300 border border-gray-300 rounded px-2 py-1" id="search" placeholder={firstCapitalize(t('data_interval_example'))} />
                                        <button
                                            className="bg-black p-[5px_25px] text-white relative top-[5px]">
                                            <MagnifyingGlassIcon
                                                onClick={(e) => { }} className="w-5 y-5 cursor-pointer" />
                                        </button>
                                    </div>
                                    <DatePickerFilter setRangeDate={setRangeDate} visibility={visibility} setVisibility={setVisibility} />
                                </div>
                            }

                        </>
                    }


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
                                        dispatch(fetcher(fetcherParam));
                                    }}
                                    className="rounded-[4px] p-2  flex items-center  bg-black text-white">{firstCapitalize(t('reload'))}
                                    <ArrowPathIcon className="w-5 h-5 cursor-pointer relative left-[5px]" />
                                </button>
                            </div>
                        </div>
                    </div>
                }

                {(searching && searchResult.length == 0 && query != '') ?
                    (<div className="rounded text-center w-[100%] mt-[5rem]">
                        <div className=" mt-[5rem] flex flex-col justify-center">
                            <p className="text-2xl font-light p-1"> {firstCapitalize(t('no_founded_item'))}</p>
                        </div>
                    </div>) :
                    <>
                        {appState.error == '' && !appState.loading && collection.length > 0 &&
                            <div className={`w-100  p-1 h-[300px] overflow-auto  mt-[1.5rem] flex flex-col justify-between`}>

                                <table className="rounded shadow-md overflow-auto w-full  table-auto" >
                                    <Thead filterRows={filterRows} setCollection={setCollection} items={collection} object={collection[0]} />
                                    <Tbody filterDetails={filterDetails} addItem={addItem} filterRows={filterRows} updateItem={update} deleteItem={deleteItem} printItem={printItem} items={searchResult.length ? searchResult : collection} rowStyle={rowStyle} />
                                </table>
                            </div>
                        }
                    </>

                }


                {!searching && collection.length > 0 && fetcherParam &&
                    <div className="flex justify-end item-center mt-2">
                        <button className="bg-black text-white p-2 rounded" onClick={() => {
                            if (loadingMore) {
                                dispatch(loadingMore());
                            }
                            dispatch(fetcher(fetcherParam))
                        }}>Carregar Mais</button>
                    </div>
                }
            </div>
        </>
    );
};

export default Table;
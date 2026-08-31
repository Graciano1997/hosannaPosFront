import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchPrinters, printTest, setPrinterConfig } from "../../slices/printerSlice";
import { showToast } from "../../slices/appSlice";
import { CurrentUser } from "../../lib/CurrentUser";

const BoxConfiguration = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    

    const formHandler = (el) => {
        setPrinterSetting({
            ...printerSetting,
            [el.target.name]: typeof el.target.value * 1 == "number" ? el.target.value * 1 : el.target.value
        });
    };


    return (
        <>
            <div className="flex gap-10  overflow-auto p-5">

                <div className="flex flex-col gap-3">
                    <label for="box_control" className="font-medium flex gap-2 text-md cursor-pointer"> {firstCapitalize(t('box_sale_question'))}
                    <input type="checkbox" id="box_control" defaultChecked name="box_control"/>
                    </label>
                </div>

            </div>
                
                <div className="text-white flex gap-5 items-center justify-end">
                    <button onClick={() => {
                        dispatch(setPrinterConfig(printerSetting))
                        .then((resultAction)=>{
                          if(setPrinterConfig.fulfilled.match(resultAction)){
                                    dispatch(showToast({ success: true, message: firstCapitalize(t('saved_sucessfuly')) }));
                          }
                          if(setPrinterConfig.rejected.match(resultAction)){
                                dispatch(showToast({ error: true, message: firstCapitalize(t('error')) }));
                          }
                        })
                    }} className="rounded bg-green-200 p-2 text-black">{firstCapitalize(t('save'))}</button>
                </div>
        </>
    )
};

export default BoxConfiguration;
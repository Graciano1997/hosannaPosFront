import { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";

const Export = ({ stopExporting }) => {
    const dispatch = useDispatch();
    const {t}=useTranslation();

    const formHandler = (el) => {
        setProduct({
            ...product,
            [el.target.name]: el.target.value
        })
    }

    const handleFormSubmition = (el) => {
        el.preventDefault();

        // let treatedProductObject = {
        //     ...product,
        //     category_id: parseInt(product.category_id),
        //     dimension: JSON.stringify(dimensionVector)
        // }

        //  if (treatedProductObject.id) {
        //      dispatch(updateProduct(treatedProductObject));
        //  } else {
        //      dispatch(registerProduct(treatedProductObject));
        //  }
    }

    return (
        <>
            <Modal helper={stopExporting}>
                <form onSubmit={handleFormSubmition} action="POST" className='flex flex-col h-[100%]  mt-[1rem] rounded p-3'>
                    
                <label>
                    {firstCapitalize(t('whichformatToExport'))}
                     <br />
                        <select name="product_type" value={true} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'>
                        <option value="" disabled selected>Selecione o tipo de formato </option>
                        <option value="service">{firstCapitalize(t('excel'))}</option>
                        <option value="good">{firstCapitalize(t('word'))}</option>
                        <option value="service">{firstCapitalize(t('pdf'))}</option>
                        <option value="service">{firstCapitalize(t('img'))}</option>
                        </select>
                </label>
                    
                    <div className="flex justify-end p-2 mt-auto"><button className="p-2 bg-green-100 rounded">{firstCapitalize(t('export'))}</button></div>
                </form>
            </Modal>
        </>
    );
};

export default Export;
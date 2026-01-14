import { useTranslation } from "react-i18next";

const SaleDetailsHeader =()=>{
    const {t}=useTranslation();

    return(
    <div className="grid grid-cols-7 gap-5 place-items-center shadow-sm text-black-900 font-bold">
    {/* <p>{t('code')}</p> */}
    <p>{t('product')}</p>
    <p>{t('price')}</p>
    <p>{t('bough_qty')}</p>
    <p>{t('taxes')}</p>
    <p>{t('discount')}</p>
    <p>{t('subtotal')}</p>
    <p>{t('return_qty')}</p>
    </div>
);
};

export default SaleDetailsHeader;
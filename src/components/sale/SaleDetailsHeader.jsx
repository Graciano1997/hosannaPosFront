import { useTranslation } from "react-i18next";

const SaleDetailsHeader =()=>{
    const {t}=useTranslation();

    return(
    <div className="grid grid-cols-[15fr_15fr_15fr_20fr_25fr_10fr] place-items-center shadow-sm text-black-900 font-bold">
    <p>{t('code')}</p>
    <p>{t('product')}</p>
    <p>{t('price')}</p>
    <p>{t('qty')}</p>
    <p>{t('total')}</p>
    <p></p>
    </div>
);
};

export default SaleDetailsHeader;
import { useTranslation } from "react-i18next";

const SaleDetailsHeader =()=>{
    const {t}=useTranslation();

    return(
    <div className="grid grid-cols-[20fr_20fr_20fr_20fr_20fr] md:grid-cols-[10fr_10fr_10fr_10fr_10fr_25fr_10fr] place-items-center shadow-sm text-black-900 font-bold">
    {/* <p>{t('code')}</p> */}
    <p>{t('product')}</p>
    <p>{t('price')}</p>
    <p className="hidden md:block">{t('discount')}</p>
    <p className="hidden md:block">{t('taxes')}</p>
    <p>{t('qty')}</p>
    <p>{t('total')}</p>
    <p></p>
    </div>
);
};

export default SaleDetailsHeader;
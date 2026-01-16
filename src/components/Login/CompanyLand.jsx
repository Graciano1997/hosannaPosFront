import { useTranslation } from 'react-i18next';
import logo from '../../../src/assets/Img/Logo.svg'

const CompanyLand = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col justify-center items-center col-span-4  xl:bg-green-200 text-black p-10">
            <div className="h-[200px] w-[200px] md:h-[300px] md:w-[300px] lg:h-[300px] lg:w-[300px]">
                <img src={logo} className="h-full w-full" alt="" />
            </div>
            <div className='lg:mt-10'>
                <p className="hidden lg:flex text-left text-xl md:text-3xl">
                    O HosannaSales Point ajuda-te a vender melhor
                    e a gerir o teu negócio
                    com mais organização e confiança.
                </p>
            </div>
            <div className="hidden lg:flex flex-col justify-center sm:mt-[2rem] gap-[8px] py-5">
                <p className="text-center text-light text-red-900">{t('author')}</p>
            </div>
        </div>
    )
}


export default CompanyLand;
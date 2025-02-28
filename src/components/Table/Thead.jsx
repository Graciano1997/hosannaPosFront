import { useTranslation } from "react-i18next";

const Thead = ({ object, filterRows }) => {

  const { t } = useTranslation();

  const keys = Object.keys(object).filter((item) => !filterRows.includes(item));
  return (
    <thead className="">
      <tr className="p-2 shadow h-[45px]">
        {keys.map((label) => <th className="p-2">{t(label)[0].toUpperCase().concat(t(label).slice(1))}</th>)}
        <th className="p-2">{' '}</th>
      </tr>
    </thead>
  );
};

export default Thead;
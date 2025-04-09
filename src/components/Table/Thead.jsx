import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";

const Thead = ({ object, filterRows }) => {

  const { t } = useTranslation();

  const keys = Object.keys(object).filter((item) => !filterRows.includes(item));
  return (
    <thead className="sticky bg-white top-[-8px]" >
      <tr className="p-2 shadow h-[45px]">
        {keys.map((label) => <th className="p-2 text-sm">{firstCapitalize(t(label))}</th>)}
        <th className="p-2">{' '}</th>
      </tr>
    </thead>
  );
};

export default Thead;
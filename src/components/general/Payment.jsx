import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";

export default function Translator({ word }){
    const { t } = useTranslation();
    return (firstCapitalize(t(word)));
  };
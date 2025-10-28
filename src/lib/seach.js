import { removeDiacritics } from "./removeDiacritic";

const searchCollection = (collection, key = "", period = null) => {
  if (!Array.isArray(collection) || collection.length === 0) return [];
  if (!key.trim() && !period?.from && !period?.to) return collection;

  let auxiliar = [];

  // 🔍 Filtro por período
  if (period?.from && period?.to) {
    auxiliar = collection.filter((item) => {
      const dateItem = (item.created_at || "").split(" ")[0];
      return dateItem >= period.from && dateItem <= period.to;
    });
  }

  if (period?.from && period?.to && !key.trim()) return removeDuplicate(auxiliar, "id");

  if (key.trim()) {
    const collectionToSearch = period?.from && period?.to ? auxiliar : collection;

    // 🔎 Busca direta por ID
    const foundById = collectionToSearch.find((item) => item.id == key);
    if (foundById) return [foundById];

    const keys = Object.keys(collectionToSearch[0]);
    const numericFields = [];
    const textFields = [];

    keys.forEach((field) => {
      if (isNaN(collectionToSearch[0][field])) textFields.push(field);
      else numericFields.push(field);
    });

    // 🔠 Busca textual
    if (isNaN(key)) {
      const normalizedKey = removeDiacritics(key.toLowerCase());
      let textResult = [];

      textFields.forEach((field) => {
        const result = collectionToSearch.filter(
          (item) =>
            item[field] != null &&
            removeDiacritics(String(item[field]).toLowerCase()).includes(normalizedKey)
        );
        textResult = [...textResult, ...result];
      });

      auxiliar = textResult;
      return removeDuplicate(auxiliar, "id");
    } 
    // 🔢 Busca numérica
    else {
      numericFields.forEach((field) => {
        const result = collectionToSearch.find((item) => item[field] == key);
        if (result) auxiliar.push(result);
      });
      return removeDuplicate(auxiliar, "id");
    }
  }

  return collection;
};

const removeDuplicate = (collection, key) => {
  const arr = [];
  collection.forEach((item) => {
    if (!arr.find((it) => it[key] == item[key])) arr.push(item);
  });
  return arr;
};

export default searchCollection;

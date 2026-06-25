import { removeDiacritics } from "./removeDiacritic";

const searchCollection = (
  collection,
  key = "",
  period = null,
  user_id = null
) => {
  
  if (!Array.isArray(collection) || collection.length === 0) return [];

  const searchKey = String(key ?? "").trim();

  if (!searchKey && !period?.from && !period?.to && !user_id) {
    return collection;
  }

  let auxiliar = [...collection];

  // 🔍 Filtro por período
  if (period?.from && period?.to) {
    auxiliar = auxiliar.filter((item) => {
      const dateItem = (item.created_at || "").split(" ")[0];
      return dateItem >= period.from && dateItem <= period.to;
    });
  }

  // 🔍 Filtro por usuário
  if (user_id) {
    auxiliar = auxiliar.filter((item) => +item.user_id === +user_id);
  }

  // Se não existe texto de pesquisa, devolve apenas os filtros aplicados
  if (!searchKey) {
    return removeDuplicate(auxiliar, "id");
  }

  // 🔎 Busca direta por ID
  const foundById = auxiliar.find((item) => String(item.id) === searchKey);
  if (foundById) return [foundById];

  const keys = Object.keys(auxiliar[0] || {});

  const numericFields = [];
  const textFields = [];

  keys.forEach((field) => {
    if (typeof auxiliar[0][field] === "number") {
      numericFields.push(field);
    } else {
      textFields.push(field);
    }
  });

  // 🔠 Busca textual
  if (isNaN(searchKey)) {
    const normalizedKey = removeDiacritics(searchKey.toLowerCase());

    auxiliar = auxiliar.filter((item) =>
      textFields.some(
        (field) =>
          item[field] != null &&
          removeDiacritics(String(item[field]).toLowerCase()).includes(
            normalizedKey
          )
      )
    );

    return removeDuplicate(auxiliar, "id");
  }

  // 🔢 Busca numérica
  let result = [];

  numericFields.forEach((field) => {
    result.push(
      ...auxiliar.filter((item) => String(item[field]) === searchKey)
    );
  });

  return removeDuplicate(result, "id");
};

const removeDuplicate = (collection, key) => {
  const arr = [];

  collection.forEach((item) => {
    if (!arr.some((it) => it[key] === item[key])) {
      arr.push(item);
    }
  });

  return arr;
};

export default searchCollection;
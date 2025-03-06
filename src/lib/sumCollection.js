export const sum = (collection, keyElement, itemKey = undefined) => {

    let total = 0;
    let totalItems = 0;

    if (collection.length > 0) {
        collection.forEach(element => {
            total += element[keyElement] * 1;
            if (itemKey != undefined) {
                totalItems += element[itemKey] * 1;
            }
        });
        return { total: total, totalItems: totalItems };
    }

    return { total: 0, totalItems: 0 };
}
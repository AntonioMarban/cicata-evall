export const removeItemByIndex = (array, index) => {
    return array.filter((_, i) => i !== index);
};

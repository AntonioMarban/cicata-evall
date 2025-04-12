export const useFormAddHandler = ({ setState, key, onSuccess, initialData, isEditMode }) => {
    return (e, formData, editIndex) => {
        e.preventDefault();
        
        setState(prevState => {
            const newState = { ...prevState };
            
            if (isEditMode && editIndex !== undefined) {
                // Modo edición - actualizar elemento existente
                const newArray = [...newState[key]];
                newArray[editIndex] = formData;
                newState[key] = newArray;
            } else {
                // Modo agregar - añadir nuevo elemento
                newState[key] = [...newState[key], formData];
            }
            
            return newState;
        });
        
        if (onSuccess) {
            onSuccess();
        }
    };
};
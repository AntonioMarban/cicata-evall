import { useCallback } from "react";

export const useFormAddHandler = ({
    setState,
    key,
    extraData = {},
    onSuccess = () => {},
    resetForm = true,
  }) => {
    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newItem = Object.fromEntries(formData.entries());
  
        const itemWithExtras = { ...newItem, ...extraData };
  
        setState((prevState) => ({
          ...prevState,
          [key]: [...prevState[key], itemWithExtras],
        }));
  
        if (resetForm) event.target.reset();
        onSuccess();
      },
      [setState, key, extraData, onSuccess, resetForm]
    );
  
    return handleSubmit;
  };
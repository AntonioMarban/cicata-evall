import { updateForm  } from "../db/index";

export const useFormHandler = ({
    form,
    onSuccess = () => {},
  }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await updateForm(form);
        } catch(error){
            alert("Error al guardar formulario2",error.message);
            return;
        }
        onSuccess();
      };
      return handleSubmit
  };
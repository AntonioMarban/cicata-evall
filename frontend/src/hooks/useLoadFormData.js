import { useEffect } from "react";
import { getFormData  } from "../db/index";
const useLoadFormData = (idF, setData) => {
    useEffect(() => {
        const loadFormData = async () => {
            if (!idF) return; 

            try {
                const formData = await getFormData(idF);
                if (formData) {
                    setData(formData);
                }
            } catch (error) {
                console.error("Error al cargar los datos", error);
            }
        };

        loadFormData();
    }, [idF]); 
};

export default useLoadFormData;
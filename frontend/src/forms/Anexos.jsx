import { useState } from "react";
import { updateForm,getAllData } from "../db/index";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";

const  Anexos = ({option,setOption}) => {
    const [anexos, setAnexos] = useState(
        {   idF: 13,
            anexos:"" });
    const [forms,setForms] = useState([]);
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try{
            await updateForm(anexos);

        } catch(error){
            console.log("Error al guardar contracto",error);
        }
        try{
            const formData = await getAllData();
            if (formData) {
                setForms(formData);
                console.log(formulario)
            }
        }catch(error){
            console.log("Error al guardar contracto",error);
        }
        setOption(prevOption => prevOption + 1);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnexos({ ...anexos, [name]: value });
    };
    useLoadFormData(anexos.idF,setAnexos);
    return (
        <form onSubmit={handleOnSubmit}>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Agrega comentarios adicionales a tener en cuenta en el proyecto</p>
                </div>
                <div className="flex-1 !mt-5">
                    <div className="flex flex-wrap">
                        <div className="flex-1">
                            <textarea  
                            className="w-full h-full !p-2 rounded-lg border-2 border-gray-300 text-[19px] flex justify-start items-start text-gray-600 mt-3 min-w-[250px]"
                            name="anexos" 
                            value={anexos.anexos}
                            onChange={handleChange}
                            placeholder="Escribe los comentarios adicionales..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center !mt-5 !mb-5">
                <button className="!mr-5 !ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" onClick={handleOnSubmit}>Siguiente</button>
            </div>
        </form>
    )
}

export default Anexos;
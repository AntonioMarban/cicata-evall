import { useState } from "react";
import useLoadFormData from "../hooks/useLoadFormData";
import useSubmitFormBack from "../hooks/useSubmitFormBack";
import useSubmitFormNext from "../hooks/useSubmitFormNext";

const  Contributions = ({option,setOption}) => {
    const [contributions, setContributions] = useState({  
        idF: 11,
        contributionsToIPNandCICATA:"" 
    })
    const [newErrorsD,setNewErrorsD] = useState({
        contributionsToIPNandCICATA:""
    });
    
    const handleOnSubmitFormBack = useSubmitFormBack(contributions, setOption);
    const handleOnSubmitForm = useSubmitFormNext(contributions, setOption);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContributions({ ...contributions, [name]: value });
    };

    
    const handleSubmitWithValidation = (event) => {
        event.preventDefault();
        const newErrorsDF = {}
        if (!contributions.contributionsToIPNandCICATA || (typeof contributions.contributionsToIPNandCICATA === 'string' 
            && contributions.contributionsToIPNandCICATA.trim() === '')) {
                newErrorsDF.contributionsToIPNandCICATA = "El campo es requerido";
        }
        setNewErrorsD(newErrorsDF)
        if(!Object.keys(newErrorsDF).length>0){
            handleOnSubmitForm(event)
        }
    }


    useLoadFormData(contributions.idF,setContributions);
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Aportaciones del proyecto al IPN y al CICATA Unidad Morelos
                        <br/> {newErrorsD.contributionsToIPNandCICATA && <span className="text-red-600">*{newErrorsD.contributionsToIPNandCICATA}</span>}
                    </p>
                </div>
                <div className="flex-1 !mt-5">
                    <div className="flex flex-wrap">
                        <div className="flex-1">
                            <textarea  
                            className="w-full h-full !p-2 rounded-lg border-2 border-gray-300 text-[19px] flex 
                            hover:border-[#5CB7E6] transition-colors duration-300
                            justify-start items-start text-gray-600 mt-3 min-w-[250px]"
                            name="contributionsToIPNandCICATA" 
                            value={contributions.contributionsToIPNandCICATA}
                            onChange={handleChange}
                            placeholder="Escribe las aportaciones del proyecto..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center !mt-5 !mb-5">
                <button className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300" type="button"  onClick={handleOnSubmitFormBack}>Regresar</button>
                <button className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300" onClick={handleSubmitWithValidation}>Siguiente</button>
            </div>
        </div>
    )
}

export default Contributions;
import { useState } from "react";
import { useFormHandler } from "../hooks/useFormHandler";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";

const  Contributions = ({option,setOption}) => {
    const [contributions, setContributions] = useState(
        {   idF: 10,
            contributions:"" })
    const handleOnSubmitForm = useFormHandler({
        form: contributions,
        onSuccess: ()=> setOption(prevOption => prevOption + 1),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContributions({ ...contributions, [name]: value });
    };
    useLoadFormData(contributions.idF,setContributions);
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Aportaciones del proyecto al IPN y al CICATA Unidad Morelos</p>
                </div>
                <div className="flex-1 !mt-5">
                    <div className="flex flex-wrap">
                        <div className="flex-1">
                            <textarea  
                            className="w-full h-full !p-2 rounded-lg border-2 border-gray-300 text-[19px] flex justify-start items-start text-gray-600 mt-3 min-w-[250px]"
                            name="contributions" 
                            value={contributions.contributions}
                            onChange={handleChange}
                            placeholder="Escribe las aportaciones del proyecto..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center !mt-5 !mb-5">
                <button className="!mr-5 !ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" onClick={handleOnSubmitForm}>Siguiente</button>
            </div>
        </div>
    )
}

export default Contributions;
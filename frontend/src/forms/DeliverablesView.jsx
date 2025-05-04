import { useState } from "react";
import { useFormHandler } from "../hooks/useFormHandler";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";
import "../styles/deliverables.css"
const  DeliverablesView = ({option,setOption}) => {
    const [deliverables, setDeliverables] = useState(
    {
        idF: 10
    }
    );

    const handleOnSubmitForm = useFormHandler({
        form: deliverables,
        onSuccess: ()=> setOption(prevOption => prevOption + 1),
    });
    const handleChange = (section, deliverable, category, value) => {
        setDeliverables((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [deliverable]: {
              ...((prev[section] && prev[section][deliverable]) || {}),
              [category]: value,
            },
          },
        }));
      };
    const deliverables3 = [
        "Proceso",
        "Patente",
        "Hardware",
        "Prototipo",
        "Certificado de inversión",
        "Software",
      ];
      const deliverables2 = [
        "Artículo de divulgación",
        "Congresos",
        "Cursos",
        "Libros",
        "Conferencias o ponencias",
        "Articulos cientifico",
        "Seminarios",
        "Manuales",
        "Programas de Radio y/o TV",
        "Otro"
      ];
    const deliverables1 = [
    "Tesis (Alumnos titulados)",
    "Practicantes profesionales",
    "Alumnos PIFI",
    "Prestante del servicio social",
    "Otro",
    ];
    const categories = ["Nacional", "Internacional"];
    const categories2 = ["Medio", "Superior","Posgrado"];
    useLoadFormData(deliverables.idF,setDeliverables);
    return (
        <div>
            <table className="table">
                <caption>
                    <div className="Caption">
                        <p>Clasificación de entregables</p>
                        <p>Metas para cumplir durante todo el proyecto</p>
                    </div>
                </caption>
                <thead>
                    <tr className="header-table">
                        <td></td>
                        {categories2.map((category) => (
                            <td key={category}>{category}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {deliverables1.map((deliverable) => (
                    <tr key={deliverable}>
                        <td data-label="Entregable">{deliverable}</td>
                        {categories2.map((category) => (
                        <td key={category} data-label={category}>
                            <input type="number" min={0} value={deliverables["educational"]?.[deliverable]?.[category] || ""}
                            onChange={(e) =>handleChange("educational", deliverable, category, e.target.value)}/>
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>

            <table className="table">
                <thead>
                    <tr className="header-table">
                        <td></td>
                        {categories.map((category) => (
                            <td key={category}>{category}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {deliverables2.map((deliverable) => (
                    <tr key={deliverable}>
                        <td data-label="Entregable">{deliverable}</td>
                        {categories.map((category) => (
                        <td key={category} data-label={category}>
                            <input type="number" 
                                value={deliverables["diffusion"]?.[deliverable]?.[category] || ""}
                                onChange={(e) =>handleChange("diffusion", deliverable, category, e.target.value)}/>
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>

            <table className="table">
                <thead>
                    <tr className="header-table">
                        <td></td>
                        {categories.map((category) => (
                            <td key={category}>{category}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {deliverables3.map((deliverable) => (
                    <tr key={deliverable}>
                        <td data-label="Entregable">{deliverable}</td>
                        {categories.map((category) => (
                        <td key={category} data-label={category}>
                            <input type="number" value={deliverables["technology"]?.[deliverable]?.[category] || ""}
                                onChange={(e) => handleChange("technology", deliverable, category, e.target.value)}/>
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end items-center !mt-5 mb-5">
                <button className="!p-2 !mr-5 ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  
                    onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!p-2 !ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" 
                    onClick={handleOnSubmitForm}>Siguiente</button>
            </div>
        </div>
    )
}

export default DeliverablesView;
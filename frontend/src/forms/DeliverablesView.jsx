import { useState } from "react";
import { useFormHandler } from "../hooks/useFormHandler";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";
import "../styles/deliverables.css";

const DeliverablesView = ({ option, setOption }) => {
  const [deliverables, setDeliverables] = useState({
    idF: 10,
  });


  const [deliverables1, setDeliverables1] = useState([
    "Tesis (Alumnos titulados)",
    "Practicantes profesionales",
    "Alumnos PIFI",
    "Prestante del servicio social",
  ]);
    const [deliverables3, setDeliverables3] = useState([
        "Proceso",
        "Patente",
        "Hardware",
        "Prototipo",
        "Certificado de inversión",
        "Software",
      ]);
    const [deliverables2, setDeliverables2] = useState([
        "Artículo de divulgación",
        "Congresos",
        "Cursos",
        "Libros",
        "Conferencias o ponencias",
        "Articulos cientifico",
        "Seminarios",
        "Manuales",
        "Programas de Radio y/o TV",
    ]);
  
    const [extras1, setExtras1] = useState([]);
    const [extras2, setExtras2] = useState([]);
    const [extras3, setExtras3] = useState([]);
    const categories2 = ["Medio", "Superior", "Posgrado"];

    const categories = ["Nacional", "Internacional"];
    useLoadFormData(deliverables.idF, setDeliverables);


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

    const handleOnClick2 = (setData, extra, deliverable) => {
    const nuevo = `Entregable ${deliverable.length + extra.length + 1}`;
    setData([...extra, nuevo]);
};
    const handleDelete1 = (entregable) => {
        setExtras1(extras1.filter((e) => e !== entregable));
        setDeliverables((prev) => {
        const updated = { ...prev };
        if (updated["educational"]) {
            delete updated["educational"][entregable];
        }
        return updated;
        });
    };
    const handleDelete2 = (entregable) => {
        setExtras2(extras2.filter((e) => e !== entregable));
        setDeliverables((prev) => {
        const updated = { ...prev };
        if (updated["difusion"]) {
            delete updated["difusion"][entregable];
        }
        return updated;
        });
    };
    const handleDelete3 = (entregable) => {
        setExtras3(extras3.filter((e) => e !== entregable));
        setDeliverables((prev) => {
        const updated = { ...prev };
        if (updated["technology"]) {
            delete updated["technology"][entregable];
        }
        return updated;
        });
    };
    const allDeliverables = [...deliverables1, ...extras1];

    const allDeliverables2 = [...deliverables2, ...extras2];

    const allDeliverables3 = [...deliverables3, ...extras3];
    const handleOnSubmitForm = useFormHandler({
        form: deliverables,
        onSuccess: () => setOption((prev) => prev + 1),
    });

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
            {allDeliverables.map((deliverable) => (
                <tr key={deliverable}>
                <td data-label="Entregable">
                    {deliverable}
                    {extras1.includes(deliverable) && (
                    <div>
                        <button onClick={() => handleDelete1(deliverable)} style={{ marginLeft: 8 }}>
                            Eliminar Funciona
                        </button>
                    </div>
                    )}
                </td>
                {categories2.map((category) => (
                    <td key={category} data-label={category}>
                    <input
                        type="number"
                        min={0}
                        value={deliverables["educational"]?.[deliverable]?.[category] || ""}
                        onChange={(e) =>
                        handleChange("educational", deliverable, category, e.target.value)
                        }
                    />
                    </td>
                ))}
                </tr>
            ))}
            {/* <tr>
                <td>
                <button className="button-other" onClick={()=>{handleOnClick2(setExtras1,extras1,deliverables1)}}>
                    Otro
                </button>
                </td>
            </tr> */}
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
            {allDeliverables2.map((deliverable) => (
                <tr key={deliverable}>
                <td data-label="Entregable">
                    {deliverable}
                    {extras2.includes(deliverable) && (
                    <div>
                        <button onClick={() => handleDelete2(deliverable)} style={{ marginLeft: 8 }}>
                            Eliminar Funciona
                        </button>
                    </div>
                    )}
                </td>
                {categories.map((category) => (
                    <td key={category} data-label={category}>
                    <input
                        type="number"
                        min={0}
                        value={deliverables["technology"]?.[deliverable]?.[category] || ""}
                        onChange={(e) =>
                        handleChange("technology", deliverable, category, e.target.value)
                        }
                    />
                    </td>
                ))}
                </tr>
            ))}
            {/* <tr>
                <td>
                <button className="button-other" onClick={()=>{handleOnClick2(setExtras2,extras2,deliverables2)}}>
                    Otro
                </button>
                </td>
            </tr> */}
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
            {allDeliverables3.map((deliverable) => (
                <tr key={deliverable}>
                <td data-label="Entregable">
                    {deliverable}
                    {extras3.includes(deliverable) && (
                    <div>
                        <button onClick={() => handleDelete3(deliverable)} style={{ marginLeft: 8 }}>
                            Eliminar Funciona
                        </button>
                    </div>
                    )}
                </td>
                {categories.map((category) => (
                    <td key={category} data-label={category}>
                    <input
                        type="number"
                        min={0}
                        value={deliverables["technology"]?.[deliverable]?.[category] || ""}
                        onChange={(e) =>
                        handleChange("technology", deliverable, category, e.target.value)
                        }
                    />
                    </td>
                ))}
                </tr>
            ))}
            {/* <tr>
                <td>
                <button className="button-other" onClick={()=>{handleOnClick2(setExtras3,extras3,deliverables3)}}>
                    Otro
                </button>
                </td>
            </tr> */}
            </tbody>
        </table>

      <div className="flex justify-end items-center !mt-5 mb-5">
        <button
          className="!p-2 !mr-5 ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md"
          type="button"
          onClick={() => prevOption(setOption)}
        >
          Regresar
        </button>
        <button
          className="!p-2 !ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md"
          onClick={handleOnSubmitForm}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default DeliverablesView;

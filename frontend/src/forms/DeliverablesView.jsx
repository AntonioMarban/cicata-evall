import { useState } from "react";
import useLoadFormData from "../hooks/useLoadFormData";
import "../styles/deliverables.css";
import TRASH from "../assets/trash.svg"
import useSubmitFormBack from "../hooks/useSubmitFormBack";
import useSubmitFormNext from "../hooks/useSubmitFormNext";

const DeliverablesView = ({ option, setOption }) => {
    const [deliverables, setDeliverables] = useState({
        idF: 10,
        deliverables1: [
        {id:1, name:"Tesis (Alumnos titulados)"},
        {id:2, name:"Practicantes profesionales"},
        {id:3, name:"Alumnos PIFI"},
        {id:4, name:"Prestante del servicio social"},
        ],
        deliverables2: [
        {id:5, name:"Artículo de divulgación"},
        {id:6, name:"Congresos"},
        {id:7, name:"Cursos"},
        {id:8, name:"Libros"},
        {id:9, name:"Conferencias o ponencias"},
        {id:10, name:"Articulos cientifico"},
        {id:11, name:"Seminarios"},
        {id:12, name:"Manuales"},
        {id:13, name:"Programas de Radio y/o TV"},
        ],
        deliverables3: [
        {id:14, name:"Proceso"},
        {id:15, name:"Patente"},
        {id:16, name:"Hardware"},
        {id:17, name:"Prototipo"},
        {id:18, name:"Certificado de inversión"},
        {id:19,name:"Software"},
        ],
        extras1:[],
        extras2:[],
        extras3:[]
    });
  
    const categories2 = ["Medio", "Superior", "Posgrado"];

    const categories = ["Nacional", "Internacional"];

    const handleDelete = (arrayKey, index) => {
    setDeliverables(prev => ({
        ...prev,
        [arrayKey]: (prev[arrayKey] || []).filter((_, i) => i !== index)
    }));
    };
    const createNewItem = (extraKey) => {
    const baseItems = deliverables[extraKey] || [];
    const newId = baseItems.length > 0 
        ? Math.max(...baseItems.map(item => item.id)) + 1 
        : 1;
    
    return {
        id: newId,
        name: "",
        values: { }
    };
    };
    const handleOnClickAdd = (extraKey) => {
        setDeliverables(prev => ({
            ...prev,
            [extraKey]: [...(prev[extraKey] || []), createNewItem(extraKey)]
        }));
    };
   const handleInputChange = (e, deliverableKey, field = 'name') => {
        const { value, dataset } = e.target;
        const id = Number(dataset.id);
        setDeliverables(prev => ({
            ...prev,
            [deliverableKey]: prev[deliverableKey].map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
            })
        }));
    };

    const handleInputNumberChange = (e,deliverableKey) => {
        const { value, dataset } = e.target;
        const id = Number(dataset.id);
        const index = Number(dataset.index);

        setDeliverables(prev => ({
            ...prev,
            [deliverableKey]: prev[deliverableKey].map(item => {
            if (item.id === id) {
                return {
                ...item,
                values: {
                    ...item.values,
                    [index]: Number(value)
                }
                };
            }
            return item;
            })
        }));
    };
    
    const handleOnSubmitFormBack = useSubmitFormBack(deliverables, setOption);
    const handleOnSubmitFormNext = useSubmitFormNext(deliverables, setOption);
    useLoadFormData(deliverables.idF, setDeliverables);
    
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
            {deliverables.deliverables1.map((deliverable,index) => (
                <tr key={index}>
                <td data-label="Entregable">
                    {deliverable.name}
                </td>
                {categories2.map((category,index) => (
                    <td key={category} data-label={category}>
                    <input
                        type="number"
                        min={0}
                        data-id={deliverable.id}
                        data-index={index+1}
                        value={deliverable.values?.[index+1] ?? ""}
                        onChange={(e) => handleInputNumberChange(e, 'deliverables1', index)}
                    />
                    </td>
                ))}
                </tr>
            ))}
            {deliverables.extras1 && (deliverables.extras1.map((deliverable,index) => (
                <tr key={index}>
                <td className="other-row" data-label="Entregable">
                    <input
                        placeholder="Nombre del entregable"
                        onChange={(e) => handleInputChange(e, 'extras1', 'name')}
                        value={deliverable.name}
                        data-id={index+1}
                    ></input>
                    <button className="cursor-pointer" onClick={()=>{handleDelete('extras1',index)}}><img src={TRASH}></img></button>
                </td>
                {categories2.map((category, index) => (
                    <td key={category} data-label={category}>
                    <input 
                       type="number"
                        min={0}
                        data-id={deliverable.id}
                        data-index={index+1}
                        value={deliverable.values?.[index+1] ?? ""}
                        onChange={(e) => handleInputNumberChange(e, 'extras1', index)}
                    />
                    </td>
                ))}
                </tr>
            )))}
            <tr>
                <td>
                <button className="button-other" onClick={()=>{handleOnClickAdd('extras1')}}>
                   Agregar entregable
                </button>
                </td>
            </tr> 
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
            {deliverables.deliverables2.map((deliverable,index) => (
                <tr key={index}>
                <td data-label="Entregable">
                    {deliverable.name}
                </td>
                {categories.map((category,index) => (
                    <td key={category} data-label={category}>
                    <input
                        type="number"
                        min={0}
                        data-id={deliverable.id}
                        data-index={index+1}
                        value={deliverable.values?.[index+1] ?? ""}
                        onChange={(e) => handleInputNumberChange(e, 'deliverables2', index)}
                    />
                    </td>
                ))}
                </tr>
            ))}
            {deliverables.extras2 && (deliverables.extras2.map((deliverable,index) => (
                <tr key={index}>
                <td className="other-row" data-label="Entregable">
                    <input
                        placeholder="Nombre del entregable"
                        onChange={(e) => handleInputChange(e, 'extras2', 'name')}
                        name="name" 
                        value={deliverable.name}
                        data-id={index+1}
                    ></input>
                    <button className="cursor-pointer" onClick={()=>{handleDelete('extras2',index)}}><img src={TRASH}></img></button>
                </td>
                {categories.map((category, index) => (
                    <td key={category} data-label={category}>
                    <input 
                        type="number"
                        min={0}
                        data-id={deliverable.id}
                        data-index={index+1}
                        value={deliverable.values?.[index+1] ?? ""}
                        onChange={(e) => handleInputNumberChange(e, 'extras2', index)}
                    />
                    </td>
                ))}
                </tr>
            )))}
            <tr>
                <td>
                <button className="button-other" onClick={()=>{handleOnClickAdd('extras2')}}>
                   Agregar entregable
                </button>
                </td>
            </tr>
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
            {deliverables.deliverables3.map((deliverable,index) => (
                <tr key={index}>
                <td data-label="Entregable">
                    {deliverable.name}
                </td>
                {categories.map((category,index) => (
                    <td key={category} data-label={category}>
                    <input
                        type="number"
                        min={0}
                        data-id={deliverable.id}
                        data-index={index+1}
                        value={deliverable.values?.[index+1] ?? ""}
                        onChange={(e) => handleInputNumberChange(e, 'deliverables3', index)}
                    />
                    </td>
                ))}
                </tr>
            ))}
            {deliverables.extras3 && (deliverables.extras3.map((deliverable,index) => (
                <tr key={index}>
                <td className="other-row" data-label="Entregable">
                    <input
                        placeholder="Nombre del entregable"
                        onChange={(e) => handleInputChange(e, 'extras3', 'name')}
                        name="name" 
                        value={deliverable.name}
                        data-id={index+1}
                    ></input>
                     <button className="cursor-pointer" onClick={()=>{handleDelete('extras3',index)}}><img src={TRASH}></img></button>
                </td>
                {categories.map((category, index) => (
                    <td key={category} data-label={category}>
                    <input 
                        type="number"
                        min={0}
                        data-id={deliverable.id}
                        data-index={index+1}
                        value={deliverable.values?.[index+1] ?? ""}
                        onChange={(e) => handleInputNumberChange(e, 'extras3', index)}
                    />
                    </td>
                ))}
                </tr>
            )))}
            <tr>
                <td>
                <button className="button-other" onClick={()=>{handleOnClickAdd('extras3')}}>
                   Agregar entregable
                </button>
                </td>
            </tr>
            </tbody>
        </table>

      <div className="flex justify-end items-center !mt-5 mb-5">
        <button
          className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300"
          type="button"
          onClick={handleOnSubmitFormBack}
        >
          Regresar
        </button>
        <button
          className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300"
          onClick={handleOnSubmitFormNext}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default DeliverablesView;

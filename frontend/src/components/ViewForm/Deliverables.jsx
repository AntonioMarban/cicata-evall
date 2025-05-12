import React from 'react';
import "../../styles/viewcompleteforms.css"
import { useState } from "react";

const Deliverables = ({Deliverables}) => {  
    const deliverables3 = [
        "Proceso",
        "Patente",
        "Hardware",
        "Prototipo",
        "Certificado de inversión",
        "Software",
        "Otro"
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
    const deliverables = [
        "Tesis (Alumnos titulados)",
        "Practicantes profesionales",
        "Alumnos PIFI",
        "Prestante del servicio social",
        "Otro",
    ];
    const categories = ["Nacional", "Internacional"];
    const categories2 = ["Medio", "Superior","Posgrado"];
    return (
    <>
        <table className="table-form-show">
            <caption>
                <div >
                    <p>Clasificación de entregables</p>
                    <p>Metas para cumplir durante todo el proyecto</p>
                </div>
            </caption>
            <thead className='table-form-show-head'>
                <tr>
                    <td></td>
                    {categories2.map((category) => (
                        <td key={category}>{category}</td>
                    ))}
                </tr>
            </thead>
            <tbody className='table-form-show-body'>
                {Deliverables.educativos.map((deliverable) => (
                <tr key={deliverable.deliveryId}>
                    <td data-label="Entregable">{deliverable.name}</td>
                    {categories2.map((category,index) => (
                    <td key={category} data-label={category}>
                        <p>{deliverable.deliverableTypeId == index+1 && (deliverable.quantity)}</p>
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>

        <table className="table-form-show">
            <thead className='table-form-show-head'>
                <tr >
                    <td></td>
                    {categories.map((category) => (
                        <td key={category}>{category}</td>
                    ))}
                </tr>
            </thead>
            <tbody className='table-form-show-body'>
                {Deliverables.difusion.map((deliverable) => (
                <tr key={deliverable.deliveryId}>
                    <td data-label="Entregable">{deliverable.name}</td>
                    {categories.map((category,index) => (
                     <td key={category} data-label={category}>
                        <p>{deliverable.deliverableTypeId == index+1 && (deliverable.quantity)}</p>
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>

        <table className="table-form-show">
            <thead className='table-form-show-head'>
                <tr>
                    <td></td>
                    {categories.map((category) => (
                        <td key={category}>{category}</td>
                    ))}
                </tr>
            </thead>
            <tbody className='table-form-show-body'>
                {Deliverables.tecnologicos.map((deliverable) => (
                <tr key={deliverable.deliveryId}>
                    <td data-label="Entregable">{deliverable.name}</td>
                    {categories.map((category,index) => (
                    <td key={category} data-label={category}>
                        <p>{deliverable.deliverableTypeId == index+1 && (deliverable.quantity)}</p>
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    </>
  );
};

export default Deliverables;

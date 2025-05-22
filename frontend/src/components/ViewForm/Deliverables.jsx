import React from 'react';
import "../../styles/viewcompleteforms.css"
import { useState } from "react";

const Deliverables = ({Deliverables}) => {  
    const columns = [1, 2, 3];
    const columns2 = [4, 5];
    const columns3 = [6, 7];
    console.log(Deliverables)
    const categories3 = ["Piloto", "Laboratorio"];

    const categories = ["Nacional", "Internacional"];

    const categories2 = ["Medio", "Superior", "Posgrado"];
    return (
    <>
        <table className="table-form-show">
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
                      {columns.map((col) => (
                        <td key={col}>
                          {deliverable.values[col] ?? ''} {/* Muestra el valor o vacío si no existe */}
                        </td>
                      ))}
                  </tr>
                ))}
                {Deliverables.extras1.map((deliverable) => (
                  <tr key={deliverable.deliveryId}>
                      <td data-label="Entregable">{deliverable.name}</td>
                      {columns.map((col) => (
                        <td key={col}>
                          {deliverable.values[col] ?? ''} {/* Muestra el valor o vacío si no existe */}
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
                {Deliverables.difusion.map((deliverable) => (
                  <tr key={deliverable.deliveryId}>
                      <td data-label="Entregable">{deliverable.name}</td>
                      {columns2.map((col) => (
                        <td key={col}>
                          {deliverable.values[col] ?? ''} {/* Muestra el valor o vacío si no existe */}
                        </td>
                      ))}
                  </tr>
                ))}
                {Deliverables.extras2.map((deliverable) => (
                <tr key={deliverable.deliveryId}>
                    <td data-label="Entregable">{deliverable.name}</td>
                    {columns2.map((col) => (
                      <td key={col}>
                        {deliverable.values[col] ?? ''} {/* Muestra el valor o vacío si no existe */}
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
                    {categories3.map((category) => (
                        <td key={category}>{category}</td>
                    ))}
                </tr>
            </thead>
            <tbody className='table-form-show-body'>
                {Deliverables.tecnologicos.map((deliverable) => (
                  <tr key={deliverable.deliveryId}>
                      <td data-label="Entregable">{deliverable.name}</td>
                      {columns3.map((col) => (
                        <td key={col}>
                          {deliverable.values[col] ?? ''} {/* Muestra el valor o vacío si no existe */}
                        </td>
                      ))}
                  </tr>
                ))}
                {Deliverables.extras3.map((deliverable) => (
                <tr key={deliverable.deliveryId}>
                    <td data-label="Entregable">{deliverable.name}</td>
                    {columns3.map((col) => (
                      <td key={col}>
                        {deliverable.values[col] ?? ''} {/* Muestra el valor o vacío si no existe */}
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

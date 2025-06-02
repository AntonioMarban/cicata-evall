import React from 'react';
import "../../styles/viewcompleteforms.css"
import { useState } from "react";

const Deliverables = ({Deliverables}) => {  
    const columns = [1, 2, 3];
    const columns2 = [4, 5];
    const columns3 = [6, 7];
    const categories3 = ["Piloto", "Laboratorio"];

    const categories = ["Nacional", "Internacional"];

    const categories2 = ["Medio", "Superior", "Posgrado"];
    return (
    <>
      {(Deliverables.deliverables1.length > 0 || Deliverables.extras1.length > 0) && (
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
                {Deliverables.deliverables1.map((deliverable) => (
                  <tr key={deliverable.deliveryId}>
                      <td data-label="Entregable" >{deliverable.name}</td>
                      {columns.map((col) => (
                        <td key={`${deliverable.deliveryId}-${col}`}>
                          {deliverable.values[col] ?? ''}
                        </td>
                      ))}
                  </tr>
                ))}
                {Deliverables.extras1.map((deliverable) => (
                  <tr key={deliverable.deliveryId}>
                      <td data-label="Entregable">{deliverable.name}</td>
                      {columns.map((col) => (
                        <td key={`${deliverable.deliveryId}-${col}`}>
                          {deliverable.values[col] ?? ''}
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
        </table>
        )}
        
        {(Deliverables.deliverables2.length > 0 || Deliverables.extras2.length > 0) && (
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
                  {Deliverables.deliverables2.map((deliverable) => (
                    <tr key={deliverable.deliveryId}>
                        <td data-label="Entregable">{deliverable.name}</td>
                        {columns2.map((col) => (
                          <td key={`${deliverable.deliveryId}-${col}`}>
                            {deliverable.values[col] ?? ''}
                          </td>
                        ))}
                    </tr>
                  ))}
                  {Deliverables.extras2.map((deliverable) => (
                  <tr key={deliverable.deliveryId}>
                      <td data-label="Entregable">{deliverable.name}</td>
                      {columns2.map((col) => (
                        <td key={`${deliverable.deliveryId}-${col}`}>
                          {deliverable.values[col] ?? ''}
                        </td>
                      ))}
                  </tr>
                  ))}
              </tbody>
          </table>
        )}

        {(Deliverables.deliverables3.length > 0 && Deliverables.extras3.length > 0) && (
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
                  {Deliverables.deliverables3.map((deliverable) => (
                    <tr key={deliverable.deliveryId}>
                        <td data-label="Entregable">{deliverable.name}</td>
                        {columns3.map((col) => (
                          <td key={`${deliverable.deliveryId}-${col}`}>
                            {deliverable.values[col] ?? ''}
                          </td>
                        ))}
                    </tr>
                  ))}
                  {Deliverables.extras3.map((deliverable) => (
                  <tr key={deliverable.deliveryId}>
                      <td data-label="Entregable">{deliverable.name}</td>
                      {columns3.map((col) => (
                        <td key={`${deliverable.deliveryId}-${col}`}>
                          {deliverable.values[col] ?? ''}
                        </td>
                      ))}
                  </tr>
                  ))}
              </tbody>
          </table>
        )}
    </>
  );
};

export default Deliverables;

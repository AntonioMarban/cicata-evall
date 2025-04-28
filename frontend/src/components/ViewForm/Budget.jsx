import React from 'react';
import "../../styles/viewcompleteforms.css"
const ConflictInterest = ({Budget}) => {  
    return (
    <>
        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th colSpan="2">Gasto de Inversión</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>1.	Equipo de laboratorio</td>
                    <td>$0.00</td>
                </tr>
                <tr>
                    <td>Subtotal Gasto de Inversion.</td>
                    <td>$0.00</td>
                </tr>
            </tbody>
        </table>

        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th colSpan="2">Gasto Corriente</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>1.	1.	Artículos, materiales y útiles diversos.</td>
                    <td>$0.00</td>
                </tr>
                <tr>
                    <td>Subtotal Gasto Corriente.</td>
                    <td>$0.00</td>
                </tr>
            </tbody>
            <thead className='table-form-header'>
                <tr>
                    <th>Total</th>
                    <th>$0.00</th>
                </tr>
            </thead>
        </table>

        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th colSpan="3">Posibles fuentes de obtención del presupuesto</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>INTERNAS</td>
                    <td>Monto aproximado a obtener</td>
                    <td>Mes y año de aprobación(Si aplica)</td>
                </tr>
                <tr>
                    <td>EXTERNAS</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
            <thead className='table-form-header'>
                <tr>
                    <th>Total</th>
                    <th>$0.00</th>
                </tr>
            </thead>
        </table>
    </>
  );
};

export default ConflictInterest;

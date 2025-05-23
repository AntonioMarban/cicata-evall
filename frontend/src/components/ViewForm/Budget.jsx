import React from 'react';
import "../../styles/viewcompleteforms.css"
const ConflictInterest = ({Budget}) => {  
    const sumInversion = Array.isArray(Budget.gastoInversion)
    ? Budget.gastoInversion.reduce((sum, Inversion) => sum + Inversion.expenditure, 0)
    : 0;

    const sumInternas = Array.isArray(Budget.gastoInversion)
    ? Budget.internas.reduce((sum, Inversion) => sum + Inversion.expenditure, 0)
    : 0;

    const sumExternas= Array.isArray(Budget.gastoInversion)
    ? Budget.externas.reduce((sum, Inversion) => sum + Inversion.expenditure, 0)
    : 0;

    const sumCorriente = Array.isArray(Budget.gastoInversion)
    ? Budget.gastoCorriente.reduce((sum, Inversion) => sum + Inversion.expenditure, 0)
    : 0;
    console.log(Budget)
    return (
    <>
        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th colSpan="2">Gasto de Inversión</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                {Array.isArray(Budget.gastoInversion) && Budget.gastoInversion.map((Inversion, index) => (
                <tr>
                    <td>{Inversion.name}</td>
                    <td>${Inversion.expenditure}</td>
                </tr>
                ))}
            </tbody>
            <thead className='table-form-body'>
                <tr>
                    <td>Subtotal</td>
                    <td>$ {sumInversion}</td>
                </tr>
            </thead>
            <thead className='table-form-header'>
                <tr>
                    <th colSpan="2">Gasto Corriente</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                {Array.isArray(Budget.gastoCorriente) && Budget.gastoCorriente.map((Inversion, index) => (
                <tr>
                    <td>{Inversion.name}</td>
                    <td>${Inversion.expenditure}</td>
                </tr>
                ))}
            </tbody>
            <thead className='table-form-body'>
                <tr>
                    <td>Subtotal</td>
                    <td>$ {sumCorriente}</td>
                </tr>
            </thead>
            <thead className='table-form-header'>
                <tr>
                    <th>Total</th>
                    <th>${sumCorriente+sumInversion}</th>
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
                    <td>Internas</td>
                    <td>Monto aproximado a obtener</td>
                    <td>Mes y año de aprobación</td>
                </tr>
                {Array.isArray(Budget.internas) && Budget.internas.map((Inversion, index) => (
                <tr>
                    <td>{Inversion.name}</td>
                    <td>${Inversion.expenditure}</td>
                    <td>{Inversion.budgetDate}</td>
                </tr>
                ))}
                <tr>
                    <td>Externas</td>
                    <td></td>
                    <td></td>
                </tr>
                 {Array.isArray(Budget.externas) && Budget.externas.map((Inversion, index) => (
                <tr>
                    <td>{Inversion.name}</td>
                    <td>${Inversion.expenditure}</td>
                    <td>{Inversion.budgetDate}</td>
                </tr>
                ))}
            </tbody>
            <thead className='table-form-header'>
                <tr>
                    <th>Total</th>
                    <th>${sumExternas+sumInternas}</th>
                </tr>
            </thead>
        </table>
    </>
  );
};

export default ConflictInterest;

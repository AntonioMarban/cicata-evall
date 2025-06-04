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
                <tr key={index}>
                    <td>{Inversion.nameType + (Inversion.otherName ? ` - ${Inversion.otherName}` : '')}</td>
                    <td>${Number(Inversion.expenditure).toLocaleString('es-MX', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 10 
                    })}
                    </td>
                </tr>
                ))}
            </tbody>
            <thead className='table-form-body'>
                <tr>
                    <td>Subtotal</td>
                    <td>${Number(sumInversion).toLocaleString('es-MX', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 10 
                    })}</td>
                </tr>
            </thead>
            <thead className='table-form-header'>
                <tr>
                    <th colSpan="2">Gasto Corriente</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                {Array.isArray(Budget.gastoCorriente) && Budget.gastoCorriente.map((Inversion, index) => (
                <tr key={index}>
                    <td>{Inversion.nameType + (Inversion.otherName ? ` - ${Inversion.otherName}` : '')}</td>
                    <td>${Number(Inversion.expenditure).toLocaleString('es-MX', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 10 
                    })}
                    </td>
                </tr>
                ))}
            </tbody>
            <thead className='table-form-body'>
                <tr>
                    <td>Subtotal</td>
                    <td>${Number(sumCorriente).toLocaleString('es-MX', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 10 
                    })}</td>
                </tr>
            </thead>
            <thead className='table-form-header'>
                <tr>
                    <th>Total</th>
                    <th>${Number(sumCorriente+sumInversion).toLocaleString('es-MX', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 10 
                    })}</th>
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
                <tr className='table-form-title-bold'>
                    <td>Internas</td>
                    <td>Monto aproximado a obtener</td>
                    <td>Mes y año de aprobación</td>
                </tr>
                {Array.isArray(Budget.internas) && Budget.internas.map((Inversion, index) => (
                <tr key={index}>
                    <td>{Inversion.nameType + (Inversion.otherName ? ` - ${Inversion.otherName}` : '')}</td>
                    <td>${Number(Inversion.expenditure).toLocaleString('es-MX', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 10 
                    })}</td>
                    <td>{Inversion.budgetDate}</td>
                </tr>
                ))}
                <tr className='table-form-title-bold'>
                    <td>Externas</td>
                    <td></td>
                    <td></td>
                </tr>
                 {Array.isArray(Budget.externas) && Budget.externas.map((Inversion, index) => (
                <tr key={index}>
                    <td>{Inversion.nameType + (Inversion.otherName ? ` - ${Inversion.otherName}` : '')}</td>
                    <td>${Number(Inversion.expenditure).toLocaleString('es-MX', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 10 
                    })}</td>
                    <td>{Inversion.budgetDate}</td>
                </tr>
                ))}
            </tbody>
            <thead className='table-form-header'>
                <tr>
                    <th>Total</th>
                    <th>${Number(sumExternas+sumInternas).toLocaleString('es-MX', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 10 
                    })}</th>
                </tr>
            </thead>
        </table>
    </>
  );
};

export default ConflictInterest;

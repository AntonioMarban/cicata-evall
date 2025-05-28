import "../../styles/viewcompleteforms.css"
const Annexes = ({Annexes}) => {  
    return (
    <>
        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Comentarios adicionales
                    <br/>
                    </th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{Annexes}</td>
                </tr>
            </tbody>
        </table>
    </>
  );
};

export default Annexes;

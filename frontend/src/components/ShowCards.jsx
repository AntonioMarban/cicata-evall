import DeletePopUp from './DeletePopUp';

const ShowCards = ({cards,handleDeleteFile,handleEditModal,nameArray,setData, fieldsToShow }) => {  

    const onClick = (index, card,setData) =>{
        handleEditModal(index, card,setData);
    }
    function formatValue(value) {
    if (value == null || value === '') return '-';

    const date = new Date(value);

    if (!isNaN(date.getTime())) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    return value || '-';
    }
    return (
    <div className="rounded-lg p-0 w-full">
        <div className="rounded-lg !p-0 w-full border-2 border-gray-300">
            {Array.isArray(cards) && cards.map((card, index) => (
                <div className="!p-2 m-5 flex justify-between items-center w-full" key={index}>
                    {fieldsToShow.map((field) => (
                        <p className="flex-1 justify-end overflow-auto" key={field}>
                            {formatValue(card[field])}
                        </p>
                    ))}
                    
                    <div className="flex-1 flex items-center justify-end gap-2">
                        <button 
                        className="cursor-pointer px-3 py-1 text-black rounded hover:bg-blue-200" 
                        type="button" 
                        onClick={() => onClick(index, card, setData)}
                        >
                        Editar
                        </button>
                        
                        <DeletePopUp handleDeleteFile={handleDeleteFile} index={index} nameArray={nameArray} />
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ShowCards;

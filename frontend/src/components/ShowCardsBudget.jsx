import DeletePopUp from './DeletePopUp';


const ShowCardsBudget = ({cards, slice,handleDeleteFile,handleEditModal,nameArray,setData}) => {  
    const onClick = (index, card,setData) =>{
        handleEditModal(index, card,setData);
    }
    console.log("cards",cards)
    return (
    <div className="rounded-lg !p-0 w-full">
        <div  className="rounded-lg !p-0 w-full border-2 border-gray-300">
        {Array.isArray(cards) && cards.map((card, index) => (
            <div className="!p-2 m-5 flex justify-between items-center w-full" key={index}>
                <p className="flex-1">{card.nameType}</p>

                <p className="flex-1 overflow-auto whitespace-nowrap px-2 rounded">
                    {card.name}
                </p>

                <p className="flex-1 flex justify-end">{card.expenditure}</p>

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

export default ShowCardsBudget;

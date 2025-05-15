import DeletePopUp from './DeletePopUp';


const CardAddBudget = ({cards, slice,handleDeleteFile,handleEditModal,nameArray,setData}) => {  
    const onClick = (index, card,setData) =>{
        handleEditModal(index, card,setData);
    }
    console.log("cards",cards)
    return (
    <div className="rounded-lg p-0 w-full">
        <div  className="rounded-lg p-0 w-full border-2 border-gray-300">
        {Array.isArray(cards) && cards.map((card, index) => (
            <div className="!p-2 m-5 flex justify-between w-full items-center" key={index}>
                <p>{card.nameType}</p>
                <p>{card.name}</p>
                <p>{card.expenditure}</p>
                <div className='flex'>
                <button 
                    className='cursor-pointer !mr-2' 
                    type="button" 
                    onClick={() => onClick(index, card,setData)}
                    >Editar
                </button>
                <DeletePopUp handleDeleteFile={handleDeleteFile} index={index} nameArray={nameArray}/>
                </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default CardAddBudget;

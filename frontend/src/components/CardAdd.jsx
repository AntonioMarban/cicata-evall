import React from 'react';
import Trash from '../assets/trash.svg'

const CardAdd = ({cards, slice,handleDeleteFile,handleEditModal}) => {  

    return (
    <div className="rounded-lg p-0 w-full">
        <div  className="rounded-lg p-0 w-full border-2 border-gray-300">
        {Array.isArray(cards) && cards.map((card, index) => (
            <div className="!p-2 m-5 flex justify-between w-full items-center" key={index}>
                {Object.entries(card).slice(0, slice).map(([key, value]) => (
                <p className="flex-1 flex" key={key}>{`${value}`}</p>
                ))}
                <button 
                    className='cursor-pointer !mr-2' 
                    type="button" 
                    onClick={() => handleEditModal(index, card)}
                    >Editar
                </button>
                <button className='cursor-pointer' type="button" onClick={()=>{handleDeleteFile(index)}}><img src={Trash}></img></button>
            </div>
        ))}
        </div>
    </div>
  );
};

export default CardAdd;

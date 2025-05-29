import "../styles/addprojects.css";
import { Dialog, DialogPanel } from '@headlessui/react';
import Trash from '../assets/trash.svg';
import { useState } from "react";

const DeletePopUp = ({ handleDeleteFile, index, nameArray, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <button 
                type="button" 
                className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
                onClick={() => setIsOpen(true)}
                aria-label="Eliminar"
            >
                <img src={Trash} alt="Icono de eliminar" />
            </button>
            
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">¿Seguro que deseas borrar?</p>
                        <div className="dialog-actions">
                            <button 
                                className="button-confirm hover:bg-gray-700 transition-colors duration-200"
                                onClick={() => {
                                    handleDeleteFile(index, nameArray); 
                                    setIsOpen(false);
                                }}
                            >
                                Si
                            </button>
                            <button 
                                type="button" 
                                className="button-cancel hover:bg-gray-300 transition-colors duration-200"
                                onClick={() => setIsOpen(false)}
                            >
                                No
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default DeletePopUp;
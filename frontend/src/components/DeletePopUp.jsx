import "../styles/addprojects.css"
import { Dialog, DialogPanel } from '@headlessui/react'
import Trash from '../assets/trash.svg'
import { useState } from "react"
const  DeletePopUp = ({handleDeleteFile, index, nameArray,value}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <button type="button" className="cursor-pointer" onClick={() => setIsOpen(true)}>
                    <img src={Trash}></img>
            </button>
            <Dialog open={isOpen} onClose={() => {}} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">¿Seguro que deseas borrar la tarjeta?"</p>
                        <div className="dialog-actions">
                                <button className="button-confirm"
                                onClick={()=>{handleDeleteFile(index,nameArray)}}>
                                   Borrar tarjeta
                                </button>
                                <button 
                                type="button" 
                                className="button-cancel"
                                onClick={()=>{setIsOpen(false)}}
                                >
                                Cancelar
                                </button>
                            </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default DeletePopUp;
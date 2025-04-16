import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Rubric from "../components/Rubric";

const EditRubric = () => {
    const committeeId = localStorage.getItem("committeeId")
    const memberId = localStorage.getItem("userId")

    const [open, setOpen] = useState(false)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const handleUpload = async () => {
        if (!image) {
            alert("Por favor, selecciona una imagen")
            return
        }
        const reader = new FileReader()
        reader.onloadend = async () => {
            const base64String = reader.result.split(",")[1]
            setLoading(true)
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/committees/${committeeId}/members/${memberId}/rubric`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ rubric: base64String }),
                })

                data = await response.json()


                if (response.ok) {
                    alert("Rúbrica actualizada correctamente");
                    setOpen(false);
                    setSelectedFile(null);
                } else {
                    console.error(data);
                    alert("Error al actualizar la rúbrica");
                }

            } catch (error) {
                alert(error.message)
            } finally {
                setLoading(false)
                setOpen(false)
            }
        }

        reader.readAsDataURL(image)
    }

    return (
        <>
            <div id="rubricContainer" className='flex flex-col overflow-y-auto h-screen max-h-screen' style={{ padding: '5%' }}>
                <h1 className="text-4xl font-semibold">Rúbrica</h1>
                <p className="text-xl text-gray-600" style={{ padding: "20px 0" }}>Esta es la rúbrica visible para todos los integrantes de tu comité</p>

                <Rubric committeeId={committeeId} memberId={memberId} />

                <div id="actionButtons" className="flex flex-wrap justify-end">
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-[#5CB7E6] text-white font-semibold rounded hover:bg-[#1591D1] cursor-pointer"
                        style={{ padding: '15px 20px', width: '100%', maxWidth: '300px', textAlign: 'center' }}
                    >
                        Cargar nueva rúbrica
                    </button>
                </div>

                <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" style={{ padding: '50px' }}>
                            <DialogTitle className="text-xl font-bold mb-4">Subir nueva rúbrica</DialogTitle>

                            <button className="flex flex-col items-center justify-center rounded-lg" style={{ padding: '20px', margin: '20px 0', border: '2px dashed #5CB7E6', backgroundColor: '#F9F9F9' }}>
                                <input type="file" accept=".pdf,.jpg,.jpeg,.webp,.png" onChange={handleImageChange} className="mb-4" />
                            </button>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="bg-[#FF4D4D] text-white font-semibold rounded hover:bg-[#FF0000] cursor-pointer"
                                    style={{ padding: '10px 20px', width: '100%', maxWidth: '110px', textAlign: 'center' }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleUpload}
                                    className="bg-[#5CB7E6] text-white font-semibold rounded hover:bg-[#1591D1] cursor-pointer"
                                    style={{ padding: '10px 20px', width: '100%', maxWidth: '150px', textAlign: 'center' }}
                                >
                                    {loading ? "Cargando..." : "Subir archivo"}
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

            </div>
        </>
    )
}

export default EditRubric;
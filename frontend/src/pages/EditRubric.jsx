import { useState } from "react"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { Upload } from 'lucide-react'
import Rubric from "../components/Rubric"

const EditRubric = () => {
    const committeeId = localStorage.getItem("committeeId")
    const memberId = localStorage.getItem("userId")

    const [open, setOpen] = useState(false)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleImageChange = (event) => {
        const file = event.target.files[0]

        const validTypes = ["image/jpeg", "image/png", "image/webp"]
        if (file && validTypes.includes(file.type)) {
            setImage(file)
        } else {
            alert("Por favor, selecciona un archivo de imagen válido (JPG, PNG, WEBP)")
            setImage(null)
        }
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
                const response = await fetch(`${import.meta.env.VITE_API_URL}/committees/${committeeId}/secretaries/${memberId}/rubric`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ rubric: base64String }),
                })

                console.log("response", response.ok)

                const data = await response.json()


                if (response.ok) {
                    alert("Rúbrica actualizada correctamente");
                    setOpen(false);
                    setImage(null);
                    window.location.reload()
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

                <Dialog open={open} onClose={() => setOpen(false) & setImage(null)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <DialogPanel className="max-w-md w-full rounded-xl bg-white p-6 shadow-xl" style={{ padding: '50px' }}>
                            <DialogTitle className="text-xl font-bold mb-4">Subir nueva rúbrica</DialogTitle>

                            <div className="mb-4">
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.webp,.png"
                                    id="file-upload"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#5CB7E6] bg-[#F9F9F9] text-gray-600 hover:bg-[#e0f3fb] transition-all"
                                    style={{
                                        padding: '20px',
                                        margin: '20px 0',
                                        width: '100%',
                                        textAlign: 'center',
                                    }}
                                >
                                    {image ? (
                                        <span className="font-medium">{image.name}</span>
                                    ) : (
                                        <>
                                            <Upload />
                                            <span>Haz clic aquí para seleccionar un archivo</span>
                                            <span className="text-sm text-gray-400 mt-1">(JPG, PNG, WEBP...)</span>
                                        </>
                                    )}
                                </label>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setOpen(false) & setImage(null)}
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
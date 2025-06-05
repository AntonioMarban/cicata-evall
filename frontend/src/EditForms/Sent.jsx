import { deleteFormsInRange,getFormsInRange } from "../db/index";
import { useNavigate  } from 'react-router-dom'
import { toast } from "sonner";

const  ModalSent = ({option,setOption}) => {
    
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    function base64ToFile(base64, fileName, mimeType = 'application/pdf') {

    if (!base64.startsWith('data:')) {
        base64 = `data:${mimeType};base64,${base64}`;
    }

    const arr = base64.split(',');
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mimeType });
    }


    const handleOnSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const formData = await getFormsInRange(20, 33);
            if (!formData) {
                throw new Error("No se encontraron datos del formulario.");
            }
            const { afilesSend, efilesSend, projectId, idF, ...cleanFormData } = formData;
            const userId = localStorage.getItem('userId');
            cleanFormData.userId = userId;
    
            const response = await fetch(`${apiUrl}/researchers/projects/${projectId}/update`, {
                method: 'PATCH',
                body: JSON.stringify(cleanFormData),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (data.projectId) {
                
                if ((afilesSend && afilesSend.length > 0) || (efilesSend && efilesSend.length > 0)) {
                    try {
                        const formDataFiles = new FormData();
                        
                        const appendFiles = (filesArray) => {
                            filesArray.forEach(file => {
                                if (file.content && file.name) {
                                    // Caso: file tiene content y name
                                    const realFile = base64ToFile(file.content, file.name, 'application/pdf');
                                    formDataFiles.append('documents', realFile);
                                } else if (file.document && file.filename) {
                                    // Caso alternativo: file tiene document y filename
                                    const realFile = base64ToFile(file.document, file.filename, 'application/pdf');
                                    formDataFiles.append('documents', realFile);
                                } else if (file.document && file.name) {
                                    // Nuevo caso: file tiene document y name
                                    const realFile = base64ToFile(file.document, file.name, 'application/pdf');
                                    formDataFiles.append('documents', realFile);
                                } else {
                                    console.warn('Archivo con formato no reconocido:', file);
                                }
                            });
                        };
                        
                        if (afilesSend && afilesSend.length > 0) {
                            appendFiles(afilesSend);
                            formDataFiles.append('projectId', data.projectId);
                            formDataFiles.append('tag', 'anexos');
                            
                            // Subir archivos 'eticos'
                            const uploadResponse = await fetch(`${apiUrl}/researchers/projects/upload`, {
                                method: 'POST',                    
                                body: formDataFiles,
                            });
                            if (uploadResponse.status === 200) {
                                console.warn("Upload succeeded but no confirmation message:");
                            }
                            else if (uploadResponse.status != 200) {
                                throw new Error(`File upload failed: ${uploadResponse.status}`);
                            }

                            const uploadData = await uploadResponse.json();
                        }

                        const formDataEFiles = new FormData();
                        const appendFiles2 = (filesArray) => {
                            filesArray.forEach(file => {
                                if (file.content && file.name) {
                                    // Caso: file tiene content y name
                                    const realFile = base64ToFile(file.content, file.name, 'application/pdf');
                                    formDataEFiles.append('documents', realFile);
                                } else if (file.document && file.filename) {
                                    // Caso alternativo: file tiene document y filename
                                    const realFile = base64ToFile(file.document, file.filename, 'application/pdf');
                                    formDataEFiles.append('documents', realFile);
                                } else if (file.document && file.name) {
                                    // Nuevo caso: file tiene document y name
                                    const realFile = base64ToFile(file.document, file.name, 'application/pdf');
                                    formDataEFiles.append('documents', realFile);
                                } else {
                                    console.warn('Archivo con formato no reconocido:', file);
                                }
                            });
                        };
                        if (efilesSend  && efilesSend .length > 0) {
                            appendFiles2(efilesSend);
                            formDataEFiles.append('projectId', data.projectId);
                            formDataEFiles.append('tag', 'eticos');
                            
                            // Subir archivos 'anexos'
                            const uploadResponse = await fetch(`${apiUrl}/researchers/projects/upload`, {
                                method: 'POST',                    
                                body: formDataEFiles,
                            });
                            if (uploadResponse.status === 200) {
                                console.warn("Upload succeeded but no confirmation message:");
                            }
                            else if (uploadResponse.status != 200) {
                                throw new Error(`File upload failed: ${uploadResponse.status}`);
                            }

                            const uploadData = await uploadResponse.json();
                            if (uploadData.message !== 'Documents uploaded successfully') {
                                console.warn("Upload succeeded but no confirmation message:", uploadData);
                            }
                        }
                        toast.promise(
                        new Promise(resolve => setTimeout(resolve, 1000)),
                        {
                            loading: 'Actualizando formulario...',
                            success: <b>¡Formulario actualizado!</b>,
                        }
                        );
                        navigate(`/Proyecto?projectId=${data.projectId}`);
                        deleteFormsInRange(20, 33)
                    } catch (uploadError) {
                        console.error("Error uploading file:", uploadError);
                        toast.error("El proyecto se creó, pero hubo un error al subir el archivo.");
                    }
                } else {
                    toast.promise(
                    new Promise(resolve => setTimeout(resolve, 1000)),
                    {
                        loading: 'Actualizando formulario...',
                        success: <b>¡Formulario actualizado!</b>,
                    }
                    );
                    navigate(`/Proyecto?projectId=${data.projectId}`);
                    deleteFormsInRange(20, 33)
                }
            } else {
                throw new Error("Missing projectId in server response.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="h-[70vh] flex items-center justify-center gap-4">
            <div className="text-center gap-4">
                <p className="!mt-5 pb-4!">¿Seguro que desea enviar el proyecto?</p>
                <div className="!mt-6 flex justify-center gap-4">
                    <button 
                        type="button" 
                        className="!mt-6 button-cancel hover:bg-gray-300 transition-colors duration-200"
                        onClick={() => setOption(prev => prev - 1)}
                    >
                        Regresar
                    </button>
                    <button 
                        className="button-confirm hover:bg-gray-700 transition-colors duration-200"
                        onClick={(e) => {handleOnSubmit(e); }}
                    >
                        Sí
                    </button>
                </div>
                <p className="!mt-6 text-gray-500">Una vez enviado, solo podrá modificarse si se requieren una correcciones</p>
            </div>
        </div>
        );
}

export default ModalSent;
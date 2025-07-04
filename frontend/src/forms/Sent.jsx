import { useState } from "react";
import { deleteFormsInRange,getFormsInRange } from "../db/index";
import { useNavigate  } from 'react-router-dom'
import { toast } from "sonner";

const  ModalSent = ({option,setOption}) => {
    
    const apiUrl = import.meta.env.VITE_API_URL;
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();
    const [edit,setEdit] = useState(false);
    function base64ToFile(base64, fileName, mimeType) {
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
        setEdit(true);
        try {
            const formData = await getFormsInRange(1, 14);
            if (!formData) {
                throw new Error("No se encontraron datos del formulario.");
            }
    
            const { afilesSend, efilesSend, idF, ...cleanFormData } = formData;
            const userId = localStorage.getItem('userId');
            cleanFormData.userId = userId;
    
            const response = await fetch(`${apiUrl}/researchers/projects`, {
                method: 'POST',
                body: JSON.stringify(cleanFormData),
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json' },
            });

            if (response.status === 401 || response.status === 403) {
                console.warn(
                "Unauthorized or Forbidden: Clearing session and redirecting."
                );
                localStorage.clear();
                window.location.href = "/";
                return;
            }
            
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
                                const realFile = base64ToFile(file.content, file.name, file.type);
                                formDataFiles.append('documents', realFile);
                            });
                        };
                        
                        if (afilesSend && afilesSend.length > 0) {
                            appendFiles(afilesSend);
                            formDataFiles.append('projectId', data.projectId);
                            formDataFiles.append('tag', 'anexos');
                            
                            // Subir archivos 'eticos'
                            const uploadAResponse = await fetch(`${apiUrl}/researchers/projects/upload`, {
                                method: 'POST',                    
                                body: formDataFiles,
                                headers: { 
                                    Authorization: `Bearer ${token}`,
                                }
                            });
                            if (uploadAResponse.status === 401 || uploadAResponse.status === 403) {
                                console.warn(
                                "Unauthorized or Forbidden: Clearing session and redirecting."
                                );
                                localStorage.clear();
                                window.location.href = "/";
                                return;
                            }

                            if (uploadAResponse.status === 200) {
                                console.warn("Upload succeeded but no confirmation message:");
                            }
                            else if (uploadAResponse.status != 200) {
                                throw new Error(`File upload failed: ${uploadAResponse.status}`);
                            }

                            const uploadData = await uploadAResponse.json();
                            if (uploadData.message !== 'Documents uploaded successfully') {
                                console.warn("Upload succeeded but no confirmation message:", uploadData);
                            }
                        }

                        const formDataEFiles = new FormData();
                        const appendFiles2 = (filesArray) => {
                        filesArray.forEach(file => {
                            const realFile = base64ToFile(file.content, file.name, file.type);
                            formDataEFiles.append('documents', realFile);
                        });
                        };
                        if (efilesSend  && efilesSend .length > 0) {
                            appendFiles2(efilesSend);
                            formDataEFiles.append('projectId', data.projectId);
                            formDataEFiles.append('tag', 'eticos');
                            
                            // Subir archivos 'anexos'
                            const uploadEResponse = await fetch(`${apiUrl}/researchers/projects/upload`, {
                                method: 'POST',                    
                                body: formDataEFiles,
                                headers: { 
                                    Authorization: `Bearer ${token}`,
                                }
                            });
                            if (uploadEResponse.status === 401 || uploadEResponse.status === 403) {
                                console.warn(
                                "Unauthorized or Forbidden: Clearing session and redirecting."
                                );
                                localStorage.clear();
                                window.location.href = "/";
                                return;
                            }

                            if (uploadEResponse.status === 200) {
                                console.warn("Upload succeeded but no confirmation message:");
                            }
                            else if (uploadEResponse.status != 200) {
                                throw new Error(`File upload failed: ${uploadEResponse.status}`);
                            }

                            const uploadData = await uploadEResponse.json();
                            if (uploadData.message !== 'Documents uploaded successfully') {
                                console.warn("Upload succeeded but no confirmation message:", uploadData);
                            }
                        }
                        toast.promise(
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            navigate('/VerFormulario', { state: { projectId: data.projectId } });
                            deleteFormsInRange(1, 14)
                            }, 1000);
                        }),
                        {
                            loading: 'Guardando datos de proyecto...',
                            success: <b>¡Proyecto guardado correctamente!</b>,
                            error: <b>Error al guardar los datos ingresados.</b>
                        }
                        );
                    } catch (uploadError) {
                        console.error("Error uploading file:", uploadError);
                        toast.error("El proyecto se creó, pero hubo un error al subir el archivo.");
                    }
                } else {
                    toast.promise(
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            navigate('/VerFormulario', { state: { projectId: data.projectId } });
                            deleteFormsInRange(1, 14)
                            }, 1000);
                        }),
                        {
                            loading: 'Creando formulario...',
                            success: <b>¡Proyecto guardado correctamente!</b>,
                            error: <b>Error al guardar los datos ingresados.</b>
                        }
                    );
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
        <div className="h-[70vh] flex items-center justify-center">
            <div className="text-center">
                <p className="!mt-6 !mb-4">¿Seguro que desea enviar el proyecto?</p>
                <div className="!mt-6 flex justify-center gap-4">
                    <button 
                        type="button" 
                        className="button-cancel hover:bg-gray-300 transition-colors duration-200"
                        onClick={() => setOption(prev => prev - 1)}
                    >
                        Regresar
                    </button>
                    <button 
                        className="button-confirm hover:bg-gray-700 transition-colors duration-200"
                        onClick={(e) => {handleOnSubmit(e); }}
                        disabled={edit}
                    >
                        Sí
                    </button>
                </div>
                <p className="!mt-6 text-gray-500">Una vez enviado, solo podrá modificarse si se requiere una corrección.</p>
            </div>
        </div>
        );
}

export default ModalSent;
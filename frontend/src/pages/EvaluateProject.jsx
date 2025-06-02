import EvaluateProjectForm from "./EvaluateProjectForm";
import ViewCompleteForms from "../components/ViewCompleteForm";
import "../styles/evaluateProject.css";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const EvaluateProject = () => {
    const { state } = useLocation();

    const projectId = state?.projectId;
    
    const [currentView, setCurrentView] = useState("information");
    const infoRef = useRef(null);
    const evalRef = useRef(null);
    const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
    
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const userType = Number(localStorage.getItem("userType"));

        if (!userId || userId === "undefined" || userId === "null") {
            console.error("userId no válido. Redirigiendo a /Inicio.");
            window.location.href = "/Inicio";
            return;
        }

        if (userType === 1 || userType === 2) {
            console.error("Tipo de usuario no autorizado. Redirigiendo a /Inicio.");
            window.location.href = "/Inicio";
            return;
        }
    }, []);

    useEffect(() => {
        const activeRef = currentView === "information" ? infoRef : evalRef;
        if (activeRef.current) {
            setSliderStyle({
                left: activeRef.current.offsetLeft,
                width: activeRef.current.offsetWidth
            });
        }
    }, [currentView]);

    return (
        <>
            <div id="evaluate-container" className="flex flex-col h-screen p-10!">

                <div id="header-evaluation">
                    <h1 className="text-4xl font-bold mb-6!">Evaluar proyecto</h1>
                
                    <div className="w-full flex justify-center mb-6">
                        <div className="relative flex mb-6! bg-[#E9EFF6] rounded-full p-1! w-max">
                            <div
                                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-300"
                                style={sliderStyle}
                            ></div>

                            <button
                                ref={infoRef}
                                onClick={() => setCurrentView("information")}
                                className={`relative z-10 px-6! py-2! rounded-full font-semibold transition-all duration-300 ${
                                    currentView === "information" ? "text-white" : "text-gray-800"
                                }`}
                            >
                                Información
                            </button>
                            <button
                                ref={evalRef}
                                onClick={() => setCurrentView("evaluation")}
                                className={`relative z-10 px-6! py-2! rounded-full font-semibold transition-all duration-300 ${
                                    currentView === "evaluation" ? "text-white" : "text-gray-800"
                                }`}
                            >
                                Evaluación
                            </button>
                        </div>
                    </div>
                </div>

                {currentView === "information" ? (
                    <ViewCompleteForms />
                ) : (
                    <EvaluateProjectForm projectId={projectId}/>
                )}
            </div>
        </>
    )
}

export default EvaluateProject;
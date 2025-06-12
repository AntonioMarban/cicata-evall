import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import CreateProject from "../pages/CreateProject";
import EditProject from "../pages/EditProject";
import NDA from "../pages/NDA";
import ManageAccounts from "../pages/ManageAccounts";
import ManageIndividualUserForm from "../pages/ManageIndividualUserForm";
import EditRubric from "../pages/EditRubric";
import EvaluateProject from "../pages/EvaluateProject";
import ViewCompleteForm from "./ViewCompleteForm";
import Project from "../pages/Project";
import FinishedProjects from "../pages/FinishedProjects";
import ProjectDictum from "../pages/ProjectDictum";
import ProtectedRoute from "./ProtectedRoute";
const Views = () => {
  return (
  <Routes>
    <Route path = "/" element={<Login/>}></Route>
    <Route path = "/Inicio" element={<ProtectedRoute><HomePage/></ProtectedRoute>}></Route>
    <Route path = "/CrearProyecto" element={<ProtectedRoute><CreateProject/></ProtectedRoute>}></Route>
    <Route path = "/Acuerdo" element={<ProtectedRoute><NDA/></ProtectedRoute>}></Route>
    <Route path = "/Cuentas" element={<ProtectedRoute><ManageAccounts/></ProtectedRoute>}></Route>
    <Route path = "/FormularioDeUsuario" element={<ManageIndividualUserForm/>}></Route>
    <Route path = "/EditarRubrica" element={<ProtectedRoute><EditRubric/></ProtectedRoute>}></Route>
    <Route path = "/EditarProyecto" element={<ProtectedRoute><EditProject/></ProtectedRoute>}></Route>
    <Route path = "/EvaluarProyecto" element={<ProtectedRoute><EvaluateProject/></ProtectedRoute>}></Route>
    <Route path = "/VerFormulario" element={<ProtectedRoute><ViewCompleteForm/></ProtectedRoute>}></Route>
    <Route path = "/Proyecto" element={<ProtectedRoute><Project/></ProtectedRoute>}></Route>
    <Route path = "/ProyectosFinalizados" element={<ProtectedRoute><FinishedProjects/></ProtectedRoute>}></Route>
    <Route path = "/Dictamen" element={<ProtectedRoute><ProjectDictum/></ProtectedRoute>}></Route>
    <Route
        path = "*"
        element={<Navigate to="/Inicio" replace/>} ></Route>
    </Routes>
  )
}

export default Views;
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
const Views = () => {
  return (
  <Routes>
    <Route path = "/" element={<Login/>}></Route>
    <Route path = "/Inicio" element={<HomePage/>}></Route>
    <Route path = "/CrearProyecto" element={<CreateProject/>}></Route>
    <Route path = "/Acuerdo" element={<NDA/>}></Route>
    <Route path = "/Cuentas" element={<ManageAccounts/>}></Route>
    <Route path = "/FormularioDeUsuario" element={<ManageIndividualUserForm/>}></Route>
    <Route path = "/EditarRubrica" element={<EditRubric/>}></Route>
    <Route path = "/editar-proyecto" element={<EditProject/>}></Route>
    <Route path = "/EvaluarProyecto" element={<EvaluateProject/>}></Route>
    <Route path = "/VerFormulario" element={<ViewCompleteForm/>}></Route>
    <Route path = "/Proyecto" element={<Project/>}></Route>
    <Route path = "/ProyectosFinalizados" element={<FinishedProjects/>}></Route>
    <Route path = "/Dictamen" element= {<ProjectDictum/>}></Route>
    <Route
        path = "*"
        element={<Navigate to="/Inicio" replace/>} ></Route>
    </Routes>
  )
}

export default Views;
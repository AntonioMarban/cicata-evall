import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import CreateProject from "../pages/CreateProject";
import NDA from "../pages/NDA";
import ManageAccounts from "../pages/ManageAccounts";
import ManageIndividualUserForm from "../pages/ManageIndividualUserForm";
import EditRubric from "../pages/EditRubric";
import EvaluateProject from "../pages/EvaluateProject";
import CommitteeDictumForm from "./CommitteeDictumForm";
import ViewCompleteForms from "./ViewCompleteForms";
import Project from "../pages/Project";
import CommentsCommittee from "../pages/CommentsCommittee";
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
    <Route path = "/EvaluarProyecto" element={<EvaluateProject/>}></Route>
    <Route path = "/VerFormulario/:id" element={<ViewCompleteForms/>}></Route>
    <Route path = "/Proyecto" element={<Project/>}></Route>
    <Route path = "/Forms" element={<CommitteeDictumForm/>}></Route>
    <Route path = "/comentarios" element={<CommentsCommittee/>}></Route>
    <Route
        path = "*"
        element={<Navigate to="/Inicio" replace/>} ></Route>
    </Routes>
  )
}

export default Views;
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import CreateProject from "../pages/CreateProject";
import NDA from "../pages/NDA";
import ManageAccounts from "./manageAccounts/ManageAccounts";
const Views = () => {
  return (
  <Routes>
    <Route path = "/" element={<Login/>}></Route>
    <Route path = "/Inicio" element={<HomePage/>}></Route>
    <Route path = "/CrearProyecto" element={<CreateProject/>}></Route>
    <Route path = "/Acuerdo" element={<NDA/>}></Route>
    <Route path = "/Cuentas" element={<ManageAccounts/>}></Route>
  </Routes>
  )
}

export default Views;
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import CreateProject from "../pages/CreateProject";
import NDA from "../pages/NDA";
const Views = () => {
  return (
  <Routes>
    <Route path = "/" element={<Login/>}></Route>
    <Route path = "/Inicio" element={<HomePage/>}></Route>
    <Route path = "/DatosGenerales" element={<CreateProject/>}></Route>
    <Route path = "/Acuerdo" element={<NDA/>}></Route>
  </Routes>
  )
}

export default Views;
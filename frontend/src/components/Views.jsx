import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
const Views = () => {
  return (
  <Routes>
    <Route path = "/" element={<Login/>}></Route>
    <Route path = "/Inicio" element={<HomePage/>}></Route>
  </Routes>
  )
}

export default Views;
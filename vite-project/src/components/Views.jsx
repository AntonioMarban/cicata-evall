import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
const Views = () => {
  return (
  <Routes>
    <Route path = "/" element={<Login/>}></Route>
  </Routes>
  )
}

export default Views;
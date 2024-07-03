import { Routes, Route } from "react-router-dom";
import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import Form from "./pages/FormPage.jsx";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState([])

  const getFormData = async (item) => {
    await axios
      .post('https://mentoringtoolserver.onrender.com/form-id', { item })
      .then((response) => {
        console.log(response)
        setFormData(response)
      })
  }

  return (
    <Routes>
      <Route path="https://mentoringtoolclient.onrender.com/" element={<Login />}></Route>
      <Route path="https://mentoringtoolclient.onrender.com/home" element={<Home getFormData={getFormData} />}></Route>
      <Route path="https://mentoringtoolclient.onrender.com/form" element={<Form formData={formData} />}></Route>
    </Routes>)

}

export default App;

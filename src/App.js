import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Page/Login";
import Dashboard from "./Page/Admin/Dashboard";
import LoginAdmin from "./Page/Admin/LoginAdmin";
import Navbar from "./Page/Admin/Navbar";
import AddItem from "./Page/Admin/AddItem";

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<LoginAdmin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/navbar" element={<Navbar />} />
          <Route path="/admin/AddItem" element={<AddItem />} />

          
        </Routes>
    </BrowserRouter>

      </>
  );
}

export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FoundItem from "./Page/Admin/FoundItem";
import LoginAdmin from "./Page/Admin/LoginAdmin";
import Navbar from "./Page/Admin/Navbar";
import AddItem from "./Page/Admin/AddItem";
import Dashboard from "./Page/Admin/Dashboard";
import CustomReport from "./Page/Admin/CustomReport";
import CreateAdmin from "./Page/Admin/CreateAdmin";


// user
import HomePage from "./Page/User/HomePage";
import ListBarang from "./Page/User/List-Barang";

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/admin" element={<LoginAdmin />} />
          <Route path="/admin/FoundItem" element={<FoundItem />} />
          <Route path="/admin/navbar" element={<Navbar />} />
          <Route path="/admin/AddItem" element={<AddItem />} />
          <Route path="/admin/Dashboard" element={<Dashboard />} />
          <Route path="/admin/CustomReport" element={<CustomReport />} />
          <Route path="/admin/CreateAdmin" element={<CreateAdmin />} />

{/* user */}
          <Route path="/" element={<HomePage />} />
          <Route path="/ListBarang" element={<ListBarang />} />

        </Routes>
    </BrowserRouter>

      </>
  );
}

export default App;
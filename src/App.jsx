
import FoundItem from "./Page/Admin/ItemFound/ItemFoundList";
import LoginAdmin from "./Page/Admin/LoginAdmin";
import Navbar from "./Page/Admin/Navbar";
import AddItem from "./Page/Admin/ItemFound/ItemFoundAdd";
import Dashboard from "./Page/Admin/Dashboard";
import CustomReport from "./Page/Admin/CustomReport";
import ListClaim from "./Page/Admin/ListClaim";
import DetailClaim from "./Page/Admin/DetailClaim";
import CreateAdmin from "./Page/Admin/CreateAdmin";
import ListAdmin from "./Page/Admin/ListAdmin";
// user
import HomePage from "./Page/User/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'


function App() {

  return (
    <section className="vh-100 vw-100">
        <BrowserRouter>
            <Routes>
              {/* <Route path="/" element={<Login />} /> */}
              <Route path="/admin" element={<LoginAdmin />} />
              <Route path="/admin/FoundItem" element={<FoundItem />} />
              <Route path="/admin/navbar" element={<Navbar />} />
              <Route path="/admin/AddItem" element={<AddItem />} />
              <Route path="/admin/Dashboard" element={<Dashboard />} />
              <Route path="/admin/CustomReport" element={<CustomReport />} />
              <Route path="/admin/ListClaim" element={<ListClaim />} />
              <Route path="/admin/DetailClaim" element={<DetailClaim />} />
              <Route path="/admin/CreateAdmin" element={<CreateAdmin />} />
              <Route path="/admin/ListAdmin" element={<ListAdmin />} />


    {/* user */}
              <Route path="/" element={<HomePage />} />


            </Routes>
        </BrowserRouter>
      </section>
  );
}

export default App;
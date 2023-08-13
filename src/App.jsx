
import FoundItem from "./Page/Admin/ItemFound/ItemFoundList";
import LoginAdmin from "./Page/Admin/LoginAdmin";
import AddItem from "./Page/Admin/ItemFound/ItemFoundAdd";
import Dashboard from "./Page/Admin/Dashboard";
import CustomReport from "./Page/Admin/CustomReport";
import ListClaim from "./Page/Admin/ListClaim/ListClaim";
import DetailClaim from "./Page/Admin/ListClaim/DetailClaim";
import CreateAdmin from "./Page/Admin/ListAdmin/CreateAdmin";
import ListAdmin from "./Page/Admin/ListAdmin/ListAdmin";
import ViewData from "./Page/Admin/ItemFound/ViewData";
// user
import HomePage from "./Page/User/HomePage";
import ListBarang from "./Page/User/List-Barang";
import DetailBarang from "./Page/User/Detail_Barang";
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
              <Route path="/admin/AddItem" element={<AddItem />} />
              <Route path="/admin/Dashboard" element={<Dashboard />} />
              <Route path="/admin/CustomReport" element={<CustomReport />} />
              <Route path="/admin/ListClaim" element={<ListClaim />} />
              <Route path="/admin/DetailClaim/:id" element={<DetailClaim />} />
              <Route path="/admin/CreateAdmin" element={<CreateAdmin />} />
              <Route path="/admin/ListAdmin" element={<ListAdmin />} />
              <Route path="/admin/ViewData/:id" element={<ViewData />} />
    {/* user */}
              <Route path="/" element={<HomePage />} />
              <Route path="/ListBarang" element={<ListBarang />} />
              <Route path="/DetailBarang" element={<DetailBarang />} />

            </Routes>
        </BrowserRouter>
      </section>
  );
}

export default App;
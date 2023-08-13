
import FoundItem from "./Page/Admin/ItemFound/ItemFoundList";
import LoginAdmin from "./Page/Admin/LoginAdmin";
import AddItem from "./Page/Admin/ItemFound/ItemFoundAdd";
import Dashboard from "./Page/Admin/Dashboard";
import CustomReport from "./Page/Admin/CustomReport";
import ListClaim from "./Page/Admin/ListClaim/ListClaim";
import DetailClaim from "./Page/Admin/ListClaim/DetailClaim";
import CreateAdmin from "./Page/Admin/ListAdmin/CreateAdmin";
import ListAdmin from "./Page/Admin/ListAdmin/ListAdmin";
import ItemFoundDetail from "./Page/Admin/ItemFound/ItemFoundDetail";
// user
import HomePage from "./Page/User/HomePage";
import ListBarang from "./Page/User/ListBarang";
import DetailBarang from "./Page/User/DetailBarang";
import ClaimBarang from "./Page/User/ClaimBarang";
import ListClaimUser from "./Page/User/ListClaim";
import Report from "./Page/User/Report";
import NotFound from "./Page/User/NotFound";
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
              <Route path="/admin/FoundItem/:id" element={<ItemFoundDetail />} />
              <Route path="/admin/AddItem" element={<AddItem />} />
              <Route path="/admin/Dashboard" element={<Dashboard />} />
              <Route path="/admin/CustomReport" element={<CustomReport />} />
              <Route path="/admin/ItemClaim" element={<ListClaim />} />
              <Route path="/admin/ItemClaim/:id" element={<DetailClaim />} />
              <Route path="/admin/CreateAdmin" element={<CreateAdmin />} />
              <Route path="/admin/ListAdmin" element={<ListAdmin />} />
    {/* user */}
              <Route path="/" element={<HomePage />} />
              <Route path="/Barang" element={<ListBarang />} />
              <Route path="/Barang/:id" element={<DetailBarang />} />
              <Route path="/report" element={<Report/>}/>
              <Route path="/not-found" element = {<NotFound/>}/>
              <Route path="/Barang/:id/Claim" element={<ClaimBarang/>}/>
              <Route path="/Claim" element={<ListClaimUser/>}/>
            </Routes>
        </BrowserRouter>
      </section>
  );
}

export default App;
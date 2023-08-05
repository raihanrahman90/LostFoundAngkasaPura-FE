import { BrowserRouter, Route, Routes } from "react-router-dom";
import FoundItem from "./Page/Admin/FoundItem";
import LoginAdmin from "./Page/Admin/LoginAdmin";
import Navbar from "./Page/Admin/Navbar";
import AddItem from "./Page/Admin/AddItem";
import Dashboard from "./Page/Admin/Dashboard";
import CustomReport from "./Page/Admin/CustomReport";
import ListClaim from "./Page/Admin/ListClaim";
import DetailClaim from "./Page/Admin/DetailClaim";


// user
import HomePage from "./Page/User/HomePage";

function App() {

  return (
    <div className="hv-100 wv-100">
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


  {/* user */}
            <Route path="/" element={<HomePage />} />


          </Routes>
      </BrowserRouter>

      </div>
  );
}

export default App;
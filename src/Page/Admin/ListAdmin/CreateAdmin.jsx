import React, { useState } from "react";
import axios from "axios";
import { AdminDefault } from "../AdminDefault";
import Cookies from "js-cookie";
import Loading from "../../Componen/Loading";


export default function CreateAdmin() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [unit, setUnit] = useState("");
  const [access, setAccess] = useState("admin");
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const data = {
            name: nama,
            email: email,
            unit: unit,
            access: access,
        }
        console.log(data);
        const token = Cookies.get("token");
        const response = await axios.post(`${BASE_URL}/admin/admin`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                },
        });
      // alert("Berhasil membuat admin");
        console.log(response);
        setLoading(false);
      setNama("");
      setEmail("");
      setPassword("");
      setUnit("");
      setAccess("");
    } catch (error) {
      console.error("Error creating admin:", error);
      alert("Gagal membuat admin");
    }
  };

  return (

    <AdminDefault
      title={"Create Admin"}
      body={
        <>
        {loading ? (<Loading />) : (

        <form onSubmit={handleCreateAdmin}>
          <div
            className="col-md-10 pt-5"
            style={{ backgroundColor: "white", borderRadius: "30px" }}
          >
            <div className="row mt-3">
              <div className="col-3">
                <p>
                  <strong>Nama:</strong>
                </p>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  className="w-100 form-control"
                  placeholder="Nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-3">
                <p>
                  <strong>Email:</strong>
                </p>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  className="w-100 form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-3">
                <p>
                  <strong>Access</strong>
                </p>
              </div>
              <div className="col-9">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setAccess(e.target.value)}
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-3">
                <p>
                  <strong>Unit:</strong>
                </p>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  className="w-100 form-control"
                  placeholder="Unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <button
                  className="btn btn-primary text-white"
                >
                  Create Admin
                </button>
              
              </div>
            </div>
          </div>
        </form>
        )}

        </>

      }
    />
  );
}

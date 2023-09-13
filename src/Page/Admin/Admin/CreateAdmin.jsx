import React, { useState } from "react";
import { AdminDefault } from "../AdminDefault";
import { createAdmin } from "../../../Hooks/Admin/Admin";
import { useNavigate } from "react-router-dom";
import { LoadingModal } from "../../Loading";

export default function CreateAdmin() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [unit, setUnit] = useState("");
  const [access, setAccess] = useState("admin");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
        const response = await createAdmin({body:data});
        if(response.statusCode ==200){
          navigate("/admin/ListAdmin")
        }
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
        <LoadingModal isLoading={loading}/>
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

        </>

      }
    />
  );
}

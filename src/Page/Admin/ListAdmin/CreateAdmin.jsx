import React, { useState } from "react";
import axios from "axios";
import { AdminDefault } from "../AdminDefault";
import Cookies from "js-cookie";

export default function CreateAdmin() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [unit, setUnit] = useState("");
  const [access, setAccess] = useState("");

  const handleCreateAdmin = async () => {
    try {
        const data = {
            name: nama,
            email: email,
            unit: unit,
            access: access,
        }
        // console.log(data);
        const token = Cookies.get("token");
        const response = await axios.post("http://103.150.92.47:8081/admin/admin", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                },
        });
        // console.log(response);
      setNama("");
      setEmail("");
      setPassword("");
      setUnit("");
      setAccess("");
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  return (
    <AdminDefault
      title={"Create Admin"}
      body={
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
                  value={access}
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
      }
    />
  );
}

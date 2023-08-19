import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import "../../Asset/style.css";

export default function CustomReport() {


  const [data, setData] = useState([]);

  const [noHp, setNoHp] = useState("");
  const [email, setEmail] = useState("");

  const handleNoHp = (e) => {
    setNoHp(e.target.value);

  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
   }

   const handleFilter = () => { 
      // if (noHp == "" && email == "") {
      //   setData(datatable);
      //   return;
      // }
      // const newData = datatable.filter((item) => {
      //   if (item.Nohp == noHp || item.Email == email) {
      //     return item;
      //   }
      // });
      // setData(newData);
   }

   useEffect(() => {
    const token = Cookies.get("token");
    axios.get("http://103.150.92.47:8081/Admin/Item-Found", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setData(res.data.data.data);
      // console.log(res.data.data.data);
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  return (
    <div className="bgDashboard">
      <div className="row  pt-5 pb-5">
        <div className="col-2 ">
          <Navbar />
        </div>

        <div
          className="col-10 pt-5  "
          style={{ backgroundColor: "white", borderRadius: "30px" }}
        >
          <h1 className="pb-5 ">Customer Report</h1>
          <div className="d-flex justify-content-end pb-4">
          <button type="button" className="btn bg-primary fw-bold text-white px-3 me-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Filter
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div>

                      <label className="pb-3 fw-bold" htmlFor="kategori">NoHp</label>
                      <input type="text" onChange={handleNoHp}/>

                    </div>

                    <div className="mt-3">
                    <label className="pb-3 fw-bold" htmlFor="kategori">Email</label>
                      <input type="email" onChange={handleEmail}/>
                    </div>

                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleFilter}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-">
            <table className="table table-bordered pt-5  ">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Nama Barang</th>
                  <th>Nohp</th>
                  <th>identityType</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.identityNumber}</td>
                      <td>{item.identityType}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Await, Link } from "react-router-dom";
import "../../Asset/style.css";
import axios from "axios";
import Cookies from 'js-cookie';
export default function FoundItem() {
  const [data, setData] = useState([]);
  const [kategori, setKategori] = useState("");
  const [tgl, setTgl] = useState("");

  const handleKategori = (e) => {
    setKategori(e.target.value);
  }


  const handleTgl = (e) => {
    setTgl(e.target.value);
    console.log(e.target.value);
   }

useEffect(() => {
  const token = Cookies.get("token");
  axios.get("http://103.150.92.47:8081/Admin/Item-Found?foundDate=2023-07-30&name=Tas&category=Tas&status=Found", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    console.log(res.data);
    setData(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

}, []);



   const handleFilter = () => { 
    // if (kategori === "" && tgl === "") return setData(datatable);
    // let hasilFilter = data.filter((item) => {
    //   return item.kategori.toLowerCase().includes(kategori.toLowerCase()) && item.tanggalDitemukan.includes(tgl);
    // });
    // setData(hasilFilter);
   }

  return (
    <div className="bgDashboard">
      <div className="row  pt-5 pb-5">
        <div className="col-lg-2 col-md-3 col-sm-4 ">
          <Navbar />
        </div>

        <div
          className="col-md-10 pt-5  "
          style={{ backgroundColor: "white", borderRadius: "30px" }}
        >
          <h1 className="pb-5 ">Found Item</h1>
          <div className="d-flex justify-content-end pb-4">
           {/* pop UP */}
                      {/* <!-- Button trigger modal --> */}
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

                      <label className="pb-3 fw-bold" htmlFor="kategori">Kategori</label>
                      <select
                        onChange={handleKategori}
                        className="form-select"
                        id="kategori"
                      >
                        <option value="Kategori 5">Perhiasan</option>
                        <option value="Kategori 5">Tas</option>
                        <option value="Kategori 5">Dompet</option>
                        <option value="Kategori 5">Koper</option>
                      </select>
                    </div>

                    <div className="mt-3">
                      <input type="date" onChange={handleTgl}/>
                    </div>

                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleFilter}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>

           {/*  */}
            <Link
              className="border border-0 bg-primary text-white px-3 border-dark text-dark me-3 fw-bold pt-2 rounded  text-decoration-none"
              to="/admin/AddItem"
            >
              ADD NEW ITEM
            </Link>
          </div>
          <div className="table container">
            <table className="table table-bordered pt-5  ">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Nama Barang</th>
                  <th>Kategori</th>
                  <th>Tanggal Ditemukan</th>
                  <th>Status</th>
                  <th>Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.namaBarang}</td>
                      <td>{item.kategori}</td>
                      <td>{item.tanggalDitemukan}</td>
                      <td>{item.status}</td>
                      <td>{item.tindakan}</td>
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

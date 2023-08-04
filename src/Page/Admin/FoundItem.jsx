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
  const [valueKategori, setValueKategori] = useState([]);

  const handleKategori = (e) => {
    setKategori(e.target.value);
  }

  const handleTgl = (e) => {
    setTgl(e.target.value);
    console.log("tgl", tgl)
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
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    axios.get("http://103.150.92.47:8081/Admin/Item-Found/Category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setValueKategori(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  const handleFilter = () => {
    let filteredData = data;

    if(kategori === "" && tgl === "")return setData(data);
  
    if (kategori !== "") {
      filteredData = filteredData.filter(item =>
        item.category.toLowerCase().includes(kategori.toLowerCase())
      );
    }
  
    if (tgl !== "") {
      filteredData = filteredData.filter(item =>
        item.tanggalDitemukan && item.tanggalDitemukan.includes(tgl)
      );
    }
  
    setData(filteredData);
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
                        {valueKategori.map((item, index) => {
                          return (
                            <option value={item.category}>{item.category}</option>
                          );
                        })}
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
          <div className="table">
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
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.foundDate}</td>
                      <td>{item.status}</td>
                      <td>{item.description}</td>
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

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "../../Asset/style.css";

export default function FoundItem() {
  const datatable = [
    {
      id: 1,
      namaBarang: "Barang 1",
      kategori: "Kategori 1",
      tanggalDitemukan: "2023-07-23",
      status: "Active",
      tindakan: "proces",
    },
    {
      id: 2,
      namaBarang: "Barang 2",
      kategori: "Kategori 2",
      tanggalDitemukan: "2023-07-21",
      status: "Inactive",
      tindakan: "done",
    },
    {
      id: 3,
      namaBarang: "Barang 3",
      kategori: "Kategori 3",
      tanggalDitemukan: "2023-07-29",
      status: "Inactive",
      tindakan: "done",
    },
    {
      id: 4,
      namaBarang: "Barang 4",
      kategori: "Kategori 4",
      tanggalDitemukan: "2023-07-24",
      status: "Inactive",
      tindakan: "done",
    },
    {
      id: 5,
      namaBarang: "Barang 5",
      kategori: "Kategori 5",
      tanggalDitemukan: "2023-07-24",
      status: "Inactive",
      tindakan: "done",
    },
    {
      id: 4,
      namaBarang: "Barang 4",
      kategori: "Kategori 4",
      tanggalDitemukan: "2023-07-24",
      status: "Inactive",
      tindakan: "done",
    },
    {
      id: 5,
      namaBarang: "Barang 5",
      kategori: "Kategori 5",
      tanggalDitemukan: "2023-07-24",
      status: "Inactive",
      tindakan: "done",
    },
    
  ];

  const [data, setData] = useState(datatable);
  const [kategori, setKategori] = useState("");
  const [tgl, setTgl] = useState("");

  const handleKategori = (e) => {
    setKategori(e.target.value);

  }

  const handleTgl = (e) => {
    setTgl(e.target.value);
    console.log(e.target.value);
   }

   const handleFilter = () => { 
    if (kategori === "" && tgl === "") return setData(datatable);
    let hasilFilter = data.filter((item) => {
      return item.kategori.toLowerCase().includes(kategori.toLowerCase()) && item.tanggalDitemukan.includes(tgl);
    });
    setData(hasilFilter);
   }

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
          <h1 className="pb-5 ">Found Item</h1>
          <div className="d-flex justify-content-end pb-4">
           {/* pop UP */}
                      {/* <!-- Button trigger modal --> */}
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Filter
            </button>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
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
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onClick={handleFilter}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>

           {/*  */}
            <Link
              className="border border-3 border-dark text-dark me-1  text-decoration-none"
              to="/admin/AddItem"
            >
              ADD NEW ITEM
            </Link>
          </div>
          <div className="table-">
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

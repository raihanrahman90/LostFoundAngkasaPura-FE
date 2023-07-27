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
      tanggalDitemukan: "2023-07-24",
      status: "Inactive",
      tindakan: "done",
    },
    {
      id: 3,
      namaBarang: "Barang 3",
      kategori: "Kategori 3",
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

  const handleSeracr = (e) => {
    if (e.target.value === "") return setData(datatable);
    let katacari = e.target.value;
    let hasilcari = data.filter((item) => {
      return item.namaBarang.toLowerCase().includes(katacari.toLowerCase());
    });
    setData(hasilcari);
  };

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
            <input
              className="border border-3 border-dark text-dark me-1  me-3"
              type="text"
              onChange={handleSeracr}
              placeholder="Search"
            />
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

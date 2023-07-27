import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "../../Asset/style.css";

export default function CustomReport() {
  const datatable = [
    {
        id: 0,
        namaCustomer: "Barang 4",
        Nohp: "Kategori 4",
        Email: "2023-07-24",
    },
    {
        id: 1,
        namaCustomer: "Barang 4",
        Nohp: "Kategori 4",
        Email: "2023-07-24",
    },
    {
        id: 2,
        namaCustomer: "Barang 4",
        Nohp: "Kategori 4",
        Email: "2023-07-24",
    },
    {
        id: 3,
        namaCustomer: "Barang 4",
        Nohp: "Kategori 4",
        Email: "2023-07-24",
    },
    {
        id: 5,
        namaCustomer: "Barang 4",
        Nohp: "Kategori 4",
        Email: "2023-07-24",
    },
    {
      id: 4,
      namaCustomer: "Barang 4",
      Nohp: "Kategori 4",
      Email: "2023-07-24",
    }
  ];

  const [data, setData] = useState(datatable);

  const handleSeracr = (e) => {
    if (e.target.value === "") return setData(datatable);
    let katacari = e.target.value;
    let hasilcari = data.filter((item) => {
      return item.namaCustomer.toLowerCase().includes(katacari.toLowerCase());
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
          <h1 className="pb-5 ">Customer Report</h1>
          <div className="d-flex justify-content-end pb-4">
            <input
              className="border border-3 border-dark text-dark me-1  me-3"
              type="text"
              onChange={handleSeracr}
              placeholder="Search"
            />
          </div>
          <div className="table-">
            <table className="table table-bordered pt-5  ">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Nama Customer</th>
                  <th>Nohp</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.namaCustomer}</td>
                      <td>{item.Nohp}</td>
                      <td>{item.Email}</td>
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

import React from "react";
import { AdminDefault } from "../AdminDefault";
import { useLocation } from "react-router-dom";

export default function ViewData() {
  const location = useLocation();
  const { from } = location.state;
  console.log(from);
  return (
    <AdminDefault
      title="View Data"
      body={
        <>
          <div className="row ">

            <div className="container rounded border mt-3 col-6">
              <h1 className="text-center mb-5">Data Barang</h1>
              <div className="row">
                <div className="col-5">
                <p className="ms-5 fw-bold">id </p>
                <p className="ms-5 fw-bold">Nama Barang </p>
                <p className="ms-5 fw-bold">Kategori </p>
                <p className="ms-5 fw-bold">Tanggal Ditemukan </p>
                <p className="ms-5 fw-bold">Status </p>
                <p className="ms-5 fw-bold">Deskripsi </p>
                </div>

                <div className="col-7">
                <p className="ms-5">: {from.id} </p>
                <p className="ms-5">: {from.name} </p>
                <p className="ms-5">: {from.category} </p>
                <p className="ms-5">: {from.foundDate} </p>
                <p className="ms-5">: {from.status} </p>
                <p className="ms-5">: {from.description} </p>

                </div>

              </div>

            </div>
            <div className="col-6">
              <img className="mx-auto d-block rounded" src={from.image} alt="" />
            </div>
          </div>
        </>
      }
    />
  );
}

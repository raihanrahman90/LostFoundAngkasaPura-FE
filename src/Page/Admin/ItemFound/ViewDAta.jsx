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
              <div className="row pb-2">
                <div className="col-3 fw-bold">id </div>
                <div className="col-9 fw-bold">: {from.id} </div>
              </div>
              <div className="row pb-2 fw-bold">
                <div className="col-3">Nama Barang </div>
                <div className="col-9">: {from.name} </div>
              </div>
              <div className="row pb-2 fw-bold">
                <div className="col-3">Kategori </div>
                <div className="col-9">: {from.category} </div>
              </div>
              <div className="row pb-2 fw-bold">
                <div className="col-3">Tanggal Ditemukan </div>
                <div className="col-9">: {from.foundDate} </div>
              </div>
              <div className="row pb-2 fw-bold">
                <div className="col-3">Status </div>
                <div className="col-9">: {from.status} </div>
              </div>
              <div className="row pb-2 fw-bold">
                <div className="col-3">Deskripsi </div>
                <div className="col-9">: {from.description} </div>
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

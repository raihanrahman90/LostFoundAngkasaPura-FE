import React, { useEffect, useState } from "react";
import { AdminDefault } from "../AdminDefault";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

export default function ViewData() {
  // const location = useLocation();
  const routeParams = useParams();
  const itemFoundId = routeParams["id"];
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [data, setData] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    const res = axios.get(`${BASE_URL}/Admin/Item-Found/${itemFoundId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  // console.log(from);
  return (
    <AdminDefault
      title="View Data"
      body={
        <>
        <div className="row"> 

          <div className="container rounded border mt-3 col-6">
            <div className="row pb-2">
              <div className="col-3 fw-bold">id </div>
              <div className="col-9 fw-bold">: {data.id} </div>
            </div>
            <div className="row pb-2 fw-bold">
              <div className="col-3">Nama Barang </div>
              <div className="col-9">: {data.name} </div>
            </div>
            <div className="row pb-2 fw-bold">
              <div className="col-3">Kategori </div>
              <div className="col-9">: {data.category} </div>
            </div>
            <div className="row pb-2 fw-bold">
              <div className="col-3">Tanggal Ditemukan </div>
              <div className="col-9">: {data.foundDate} </div>
            </div>
            <div className="row pb-2 fw-bold">
              <div className="col-3">Status </div>
              <div className="col-9">: {data.status} </div>
              </div>
            <div className="row pb-2 fw-bold">
              <div className="col-3">Deskripsi </div>
              <div className="col-9">: {data.description} </div>
            </div>

            </div>

            <div className="col-6">
            <img className="mx-auto d-block rounded" src={data.image} alt="" />

            </div>

        </div>

        </>
      }
    />
  );
}
{/* <div className="container rounded border mt-3 col-6">
              <div className="row pb-2">
                <div className="col-3 fw-bold">id </div>
                <div className="col-9 fw-bold">: {list.id} </div>
              </div>
              <div className="row pb-2 fw-bold">
                <div className="col-3">Nama Barang </div>
                <div className="col-9">: {list.name} </div>
              </div>
              <div className="row pb-2 fw-bold">
                <div className="col-3">Kategori </div>
                <div className="col-9">: {list.category} </div>
              </div>
              <div className="row pb-2 fw-bold">
                <div className="col-3">Tanggal Ditemukan </div>
                <div className="col-9">: {list.foundDate} </div>
              </div>
              <div className="row pb-2 fw-bold">
                <div className="col-3">Status </div>
                <div className="col-9">: {list.status} </div>
              </div>
              <div className="row pb-2 fw-bold">
                <div className="col-3">Deskripsi </div>
                <div className="col-9">: {list.description} </div>
              </div>
                
            </div>

            <div className="col-6">
            </div> */}
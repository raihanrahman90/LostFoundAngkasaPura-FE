import React, { useEffect, useState } from "react";
import { AdminDefault } from "../AdminDefault";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

export default function ItemFoundDetail() {
  // const location = useLocation();
  const routeParams = useParams();
  const itemFoundId = routeParams["id"];
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [data, setData] = useState("");
  const navigate = useNavigate();
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
      if(err.response.status==401){
        navigate("/admin");
      };
    });
  }, []);

  // console.log(from);
  return (
    <AdminDefault
      title="View Data"
      body={
        <>
        <div className="row"> 
          <div className="container rounded border mt-3 col-12 col-md-6">
            <div className="pb-2 fw-bold form__group w-100">
              <input
                value={data.name}
                type="text"
                className="form__field"
                id="name"
                disabled
              />
              <label className="form__label" htmlFor="name">Nama Barang</label>
            </div>
            <div className="pb-2 fw-bold form__group w-100">
              <input
                value={data.category}
                type="text"
                className="form__field"
                id="category"
                disabled
              />
              <label className="form__label" htmlFor="category">Kategori</label>
            </div>
            <div className="pb-2 fw-bold form__group w-100">
              <input
                value={data.foundDate}
                type="date"
                className="form__field"
                id="foundDate"
                disabled
              />
              <label className="form__label" htmlFor="foundDate">Tanggal ditemukan</label>
            </div>
            <div className="pb-2 fw-bold form__group w-100">
              <input
                value={data.status}
                type="text"
                className="form__field"
                id="status"
                disabled
              />
              <label className="form__label" htmlFor="status">Status</label>
            </div>
            
            <div className="pb-2 fw-bold form__group w-100">
              <textarea
                value={data.status}
                className="form__field"
                id="description"
                disabled
              >{data.description}</textarea>
              <label className="form__label" htmlFor="description">Description</label>
            </div>
          </div>
          <div className="col-md-6 col-12">
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
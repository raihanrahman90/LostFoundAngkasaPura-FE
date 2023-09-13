import React, { useEffect, useState } from "react";
import { AdminDefault } from "../AdminDefault";
import { useNavigate, useParams } from "react-router-dom";
import { sendCloseItem } from "../../../Hooks/Admin/Item";
import { Status } from "../../../Constants/Status";

import axios from "axios";
import Cookies from 'js-cookie';
import { LoadingModal } from "../../Loading";

export default function ItemFoundDetail() {
  // const location = useLocation();
  const routeParams = useParams();
  const itemFoundId = routeParams["id"];
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [data, setData] = useState("");
  const [imageClosing, setImageClosing] = useState();
  const [imageClosing64, setImageClosing64] = useState();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageClosing = (event) => {
    const file = event.target.files[0];
    setImageClosing(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageClosing64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const res = axios.get(`${BASE_URL}/Admin/Item-Found/${itemFoundId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setData(res.data.data);
    }).catch((err) => {
      if(err.response.status==401){
        navigate("/admin");
      };
    });
  }, []);

  const closeHandle = async()=>{
    setLoading(true);
    sendCloseItem({id:itemFoundId, image:imageClosing64})
    .then((e)=>{
      setLoading(false);
      alert("Berhasil meng-closed item");
      window.location.reload();
    })
    .catch((e)=>{
      setLoading(false);
      console.log(e);
      alert(e.data.data);
    })
  }
  // console.log(from);
  return (
    <AdminDefault
      title="View Data"
      body={
        <>
        <LoadingModal isLoading={isLoading}/>
        <div className="row"> 
          <div className="col-md-6 col-12 row">
            <h6>Gambar Barang</h6>
            <img className="mx-auto d-block rounded" src={data.image} alt="" />
            {
              data.imageClosing===null?<></>:<>
                <h6>Gambar Closing</h6>
                <img className="mx-auto d-block rounded" src={data.imageClosing} alt="" />
                </>
            }
          </div>
          <div className="container mt-3 col-12 col-md-6">
            <div className="rounded border px-2">
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
                  value={data.description}
                  className="form__field"
                  id="description"
                  disabled
                >{data.description}</textarea>
                <label className="form__label" htmlFor="description">Description</label>
              </div>
                  {data.status===Status.Confirmed || data.status===Status.Found?
                  <>
                <div className="col-12 d-flex justify-content-end">
                  <button type="button" class="btn btn-success me-1 text-white me-3 px-5 mb-2" data-bs-toggle="modal" data-bs-target="#Terima">
                    Close Item
                  </button>
                  <div class="modal fade" id="Terima" tabindex="-1" aria-labelledby="TerimaLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="TerimaLabel">Close Item</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          {/* Form filter */}
                          <div>
                            Item Found akan diclosed
                          </div>
                          <div className="d-flex">
                            <input type="file" 
                            className="form-control"
                            onChange={handleImageClosing} 
                            accept="image/png, image/gif, image/jpeg"/>
                          </div>
                          <div className="row">
                            {imageClosing && (
                              <img
                                src={imageClosing64}
                                alt="Selected Image"
                                className=""
                              />
                            )}
                          </div>
                          {/* End of Form filter */}
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onClick={closeHandle}>Terima</button>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
                  </>:<></>}
                  
            </div>
          </div>
        </div>

        </>
      }
    />
  );
}
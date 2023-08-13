import React, {useEffect, useState} from "react";
import Headers from "./Headers";
import "../../Asset/style.css";
import Logo from "../../Asset/logo.png";
import Footer from "./Footer";
import { getListFoundItem } from "../../Hooks/User/ListFoundItem";

export default function HomePage() {
  const [barang, setBarang] = useState([]);
  useEffect(()=>{
    getListFoundItem(1, 4, null,null,null)
    .then((e)=>{
      setBarang(e.data.data);
    })
  })
  return (
    <div>
      <Headers />

      <div className="bgdasboard text-center hv-75">
        <div className="">
          <h1 className="title text-white pb-5 fw-bold display-4 display-md-3">
            Temukan <span className="text-warning">Barangmu</span>
          </h1>
          <h5 className="text-white fs-5 fs-md-4">
            Cari barangmu yang hilang, Kami akan membantumu mencari barangmu
            yang <br />
            hilang dan mengabarikannya ke kamu
          </h5>
          <button className="buttonTitle bg-warning text-white px-3 rounded border-0 py-2 mt-4 fw-bold">
            Cari Barangmu
          </button>
        </div>
      </div>
      <div className="row my-2 mx-5 justify-content-center hv-45 px-sm-5 px-md-0">
        <div className="col-md-6 text-center d-flex py-5 row rounded shadow landingpage-card bg-white h-fit-content">
          <div className="col-md-6">
            <p className=" fw-bold fs-3">Laporkan Barang hilang</p>
              <p className=" fs-6 text-center">
                Anda kehilangan barang? Laporkan segera ke petugas kami, kami akan
                berupaya mencari barang anda. Note: Jika Barang Tidak ditemukan
                pada list barang setelah 1x24 jam, silahkan klik{" "}
                <a href="#">disini</a>.
              </p>
          </div>
          <div className="col-md-6">
            <p className=" fw-bold fs-3">Cari Barang Hilang</p>
            <p className="fs-6">
              Semua informasi barang yang hilang yang telah ditemukan tersedia
              di dalam web ini. Cari barang anda yang hilang di website ini dan
              klaim kepemilikan barang anda.
            </p>
          </div>
        </div>
      </div>

      <div className="listBarang  ">
        <div className="bgdasboard   ">
          <h1 className=" text-center text-white pb-5 fw-bold pt-3">
            Penemuan <span className="text-warning">Barang Hilang</span> Terbaru
          </h1>
          <div className="container">
            <div className="row g-5">
              {barang.map((item) => {
                return (
                  <div
                    className="col-md-3 mb-3"
                  >
                    <div className="card rounded px-0 overflow-hidden">
                      <div className="card-image-container">
                        <img src={item.image} className="card-image" alt="" />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.description}</p>
                        <a
                          href="#"
                          className="btn btn-primary w-100 text-white fw-bold"
                        >
                          Klaim Barang
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pb-5">
            <button className="bg-warning text-white border-0 d-flex justify-content-center mt-3 rounded py-2 px-4 mx-auto">
              lihat semua
            </button>
          </div>
        </div>
      </div>

      <div className="bg-dark">
        <Footer />
      </div>
    </div>
  );
}

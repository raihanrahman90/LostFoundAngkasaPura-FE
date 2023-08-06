import React from "react";
import Headers from "./Headers";
import "../../Asset/style.css";
import Logo from "../../Asset/logo.png";
import Footer from "./Footer";

export default function HomePage() {
  const barang = [
    {
      id: 1,
      img: Logo,
      kategoti: "Elektronik",
      keterangan: "ditemukan tempat duduk bording pesawat",
    },
    {
      id: 2,
      img: Logo,
      kategoti: "Elektronik",
      keterangan: "ditemukan tempat duduk bording pesawat",
    },
    {
      id: 3,
      img: Logo,
      kategoti: "Elektronik",
      keterangan: "ditemukan tempat duduk bording pesawat",
    },
    {
      id: 4,
      img: Logo,
      kategoti: "Elektronik",
      keterangan: "ditemukan tempat duduk bording pesawat",
    },
  ];
  return (
    <div>
      <Headers />

      <div className="bgdasboard text-center">
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
      <div className="row my-2 mx-5  ">
        <div className="col-md-6 text-center d-flex justify-content-center py-5">
          <div className="shadow-lg  mb-5 bg-body rounded py-5 w-75 ">
            <p className=" fw-bold fs-3">Laporkan Barang hilang jamal</p>
            <p className=" fs-6 text-center">
              Anda kehilangan barang? Laporkan segera ke petugas kami, kami akan
              berupaya mencari barang anda. Note: Jika Barang Tidak ditemukan
              pada list barang setelah 1x24 jam, silahkan klik{" "}
              <a href="#">disini</a>.
            </p>
          </div>
        </div>

        <div className="col-md-6 text-center py-5 d-flex justify-content-center">
          <div className="shadow-lg  mb-5 bg-body rounded py-5 w-75">
            <p className=" fw-bold fs-3">Cari Barang Hilang</p>
            <p className="fs-6">
              Semua informasi barang yang hilang yang telah ditemukan tersedia
              di dalam web ini. Cari barang anda yang hilang di website ini dan
              klaim kepemilikan barang anda.
            </p>
          </div>
        </div>
        {/* <div className="cardTitle">
            <div className="cardSection">
              <div className="card">
                <div className="">
                  <div className="row ">
                    <div className="col-md-6 card-body ">
                      <p className="card-title fw-bold fs-3">Laporkan Barang hilang</p>
                      <p className="card-text fs-6">
                        Anda kehilangan barang? Laporkan segera ke petugas kami,
                        kami akan berupaya mencari barang anda. Note: Jika
                        Barang Tidak ditemukan pada list barang setelah 1x24
                        jam, silahkan klik <a href="#">disini</a>.
                      </p>
                    </div>
                    <div className="col-md-6 card-body">
                      <p className="card-title fs-3 fw-bold">Cari Barang Hilang</p>
                      <p className="card-text fs-6">
                        Semua informasi barang yang hilang yang telah ditemukan
                        tersedia di dalam web ini. Cari barang anda yang hilang
                        di website ini dan klaim kepemilikan barang anda.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
      </div>

      <div className="listBarang  ">
        <div className="bgdasboard   ">
          <h1 className=" text-center text-white pb-5 fw-bold pt-3">
            Penemuan <span className="text-warning">Barang Hilang</span> Terbaru
          </h1>
          <div className="d-flex justify-content-center row">
            {barang.map((item) => {
              return (
                <div
                  className="col-md-6 mb-3 card mx-3 rounded"
                  style={{ width: "18rem" }}
                >
                  <img src={item.img} className="p-5" alt="" />
                  <div className="card-body">
                    <h5 className="card-title">{item.kategoti}</h5>
                    <p className="card-text">{item.keterangan}</p>
                    <a
                      href="#"
                      className="btn btn-primary w-100 text-white fw-bold"
                    >
                      Klaim Barang
                    </a>
                  </div>
                </div>
              );
            })}
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

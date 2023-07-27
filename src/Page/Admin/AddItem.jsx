import React, { useState } from "react";
import Navbar from "./Navbar";
import "../../Asset/style.css";

export default function AddItem() {
  const [namaBarang, setNamaBarang] = useState("");
  const [ciriBarang, setCiriBarang] = useState("");
  const [tanggalDitemukan, setTanggalDitemukan] = useState("");
  const [fotoBarang, setFotoBarang] = useState("");
  const [kategori, setKategori] = useState("");

  const data = {
    namaBarang: namaBarang,
    ciriBarang: ciriBarang,
    tanggalDitemukan: tanggalDitemukan,
    fotoBarang: fotoBarang,
    kategori: kategori,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoBarang(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bgDashboard">
      <form className="row  pt-5 pb-5" onSubmit={handleSubmit}>
        <div className="col-2 ">
          <Navbar />
        </div>

        <div
          className="col-10 pt-5  "
          style={{ backgroundColor: "white", borderRadius: "30px" }}
        >
          <h1>ADD ITEM</h1>

          <div className="form-group pb-4">
            <label className="pb-3 fw-bold" htmlFor="namaBarang">Nama Barang</label>
            <input
              onChange={(e) => setNamaBarang(e.target.value)}
              type="text"
              className="form-control "
              id="namaBarang"
              placeholder="Nama Barang"
            />
          </div>

          <div className="form-group pb-4">
            <label className="pb-3 fw-bold" htmlFor="ciriBarang">Ciri Ciri Barang</label>
            <input
              onChange={(e) => setCiriBarang(e.target.value)}
              type="text"
              className="form-control"
              id="ciriBarang"
              placeholder="Ciri Ciri Barang"
            />
          </div>

          <div className="form-group pb-4">
            <label className="pb-3 fw-bold" htmlFor="kategori">Kategori</label>
            <select
              onChange={(e) => setKategori(e.target.value)}
              className="form-select"
              id="kategori"
            >
              <option value="Perhiasan">Perhiasan</option>
              <option value="Tas">Tas</option>
              <option value="Dompet">Dompet</option>
              <option value="Koper">Koper</option>
            </select>
          </div>

          <div className="form-group pb-4">
            <label className="pb-3 fw-bold" htmlFor="tanggalDitemukan">Tanggal Ditemukan</label>
            <input
              onChange={(e) => setTanggalDitemukan(e.target.value)}
              type="date"
              className="form-control"
              id="tanggalDitemukan"
            />
          </div>

          <div className="form-group pb-4">
            <label className="pb-3 fw-bold" htmlFor="fotoBarang">Foto Barang</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="form-control"
              id="fotoBarang"
            />
            {fotoBarang && (
              <img
                src={fotoBarang}
                alt="Uploaded"
                style={{ maxWidth: "50px", marginTop: "30px" }}
              />
            )}
          </div>

          <input type="submit" value="Submit" className="btn btn-primary float-end  me-5 " />
        </div>
      </form>
    </div>
  );
}

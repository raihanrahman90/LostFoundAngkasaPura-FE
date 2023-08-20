import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "../../Asset/style.css";
import { addItem } from "../../Hooks/Admin/AddItem";

export default function AddItem() {
  const [namaBarang, setNamaBarang] = useState("");
  const [ciriBarang, setCiriBarang] = useState("");
  const [tanggalDitemukan, setTanggalDitemukan] = useState("");
  const [kategori, setKategori] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Image, setBase64Image] = useState("");


  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };



  const handleSubmit = async () => {

    const result = await addItem(
      {
        name: namaBarang,
        description: ciriBarang,
        category: kategori,
        foundDate: tanggalDitemukan,
        imageBase64: base64Image,
      }
    );
    if(result){
      console.log(result);
    }
};


  return (
    <div className="bgDashboard">
      <form className="row  pt-5 pb-5" >
        <div className="col-md-2 ">
          <Navbar />
        </div>

        <div
          className="col-md-10 pt-5 "
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
              onChange={handleFileInputChange}
              className="form-control"
              id="fotoBarang"
            />
            {selectedFile && (
        <img
          src={base64Image}
          alt="Selected Image"
          style={{ maxWidth: "300px", marginTop: "10px" }}
        />
      )}
          </div>

          <input value="Submit" onClick={handleSubmit} className="btn btn-primary float-end me-md-5 " />
        </div>
      </form >
    </div>
  );
}

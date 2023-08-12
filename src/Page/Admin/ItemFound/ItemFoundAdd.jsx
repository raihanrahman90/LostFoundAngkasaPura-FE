import React, { useState } from "react";
import "../../../Asset/style.css";
import { addItem } from "../../../Hooks/Admin/Item";
import { AdminDefault } from "../AdminDefault";
import Loading from "../../Componen/Loading";
import { useNavigate } from "react-router-dom";

export default function ItemFoundAdd() {
  const [namaBarang, setNamaBarang] = useState("");
  const [ciriBarang, setCiriBarang] = useState("");
  const [tanggalDitemukan, setTanggalDitemukan] = useState("");
  const [kategori, setKategori] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [loading, setLoading] = useState(false);
  var navigate = useNavigate();

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
    if(namaBarang === "" || ciriBarang === "" || tanggalDitemukan === "" || kategori === "" || base64Image === ""){
      alert("Data tidak boleh kosong");
      return;
    }else{
    setLoading(true);
    const result = await addItem(
      {
        name: namaBarang,
        description: ciriBarang,
        category: kategori,
        foundDate: tanggalDitemukan,
        imageBase64: base64Image,
      }
    );
    console.log(result);
    setLoading(false);
    if(result){
      navigate("/admin/FoundItem")
    }
  }

};


  return (
    <>
    {loading ? (<Loading />) : (
    <AdminDefault
      title={"Add Item Found"}
      body={
        <>
        {loading ? (<Loading />) : (
        <form className="row pt-5 pb-5" onSubmit={handleSubmit}>
        <div className="form__group">
          <input
            onChange={(e) => setNamaBarang(e.target.value)}
            type="text"
            className="form__field"
            id="namaBarang"
            placeholder="Nama Barang"
            required
          />
          <label className="form__label" htmlFor="namaBarang">Nama Barang</label>
        </div>

        <div className="form__group">
          <input
            onChange={(e) => setCiriBarang(e.target.value)}
            type="text"
            className="form__field"
            id="ciriBarang"
            placeholder="Ciri Ciri Barang"
            required
          />
          <label className="form__label" htmlFor="ciriBarang">Ciri Ciri Barang</label>
        </div>

        <div className="form__group col-6">
          <select
          required
            onChange={(e) => setKategori(e.target.value)}
            className="form__field"
            id="kategori"
          >
            <option value="Perhiasan">Perhiasan</option>
            <option value="Tas">Tas</option>
            <option value="Dompet">Dompet</option>
            <option value="Koper">Koper</option>
          </select>
          <label className="form__label" htmlFor="kategori">Kategori</label>
        </div>

        <div className="form__group col-6">
          <input
            onChange={(e) => setTanggalDitemukan(e.target.value)}
            type="date"
            className="form__field"
            id="tanggalDitemukan"
            required
          />
          <label className="form__label" htmlFor="tanggalDitemukan">Tanggal Ditemukan</label>
        </div>

        <div className="form__group">
          <input
            type="file"
            onChange={handleFileInputChange}
            className="form__field"
            id="fotoBarang"
            required
          />
          <label className="form__label" htmlFor="fotoBarang">Foto Barang</label>
          {selectedFile && (
      <img
        src={base64Image}
        alt="Selected Image"
        style={{ maxWidth: "300px", marginTop: "10px" }}
      />
    )}
        </div>

        <input value="Submit" className="btn btn-primary float-end me-md-5 text-white" />
        </form> )}
        </>

}/>
)}
    </>


          
  );
}

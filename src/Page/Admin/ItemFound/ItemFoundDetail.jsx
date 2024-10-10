import { useEffect, useState } from "react";
import { AdminDefault } from "../AdminDefault";
import { useParams } from "react-router-dom";
import { getItemFoundById, sendCloseItem } from "../../../Hooks/Admin/Item";
import { Status } from "../../../Constants/Status";

import { LoadingModal } from "../../Loading";

export default function ItemFoundDetail() {
  // const location = useLocation();
  const routeParams = useParams();
  const itemFoundId = routeParams["id"];
  const [data, setData] = useState("");
  const [imageClosing64, setImageClosing64] = useState();
  const [documentClosing64, setDocumentClosing64] = useState();
  const [agentName, setAgentName] = useState();
  const [isLoading, setLoading] = useState(false);

  const handleImageClosing = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageClosing64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentClosing = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentClosing64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    getData();
  });

  const getData =  async () => {
    try{
      let response = await getItemFoundById(itemFoundId)
      setData(response.data);
    }catch(e){
      console.log(e)
    }
    
  }

  const closeHandle = async(e)=>{
    e.preventDefault();
    setLoading(true);
    sendCloseItem({id:itemFoundId, image:imageClosing64, news:documentClosing64, agent:agentName})
    .then((e)=>{
      setLoading(false);
      alert("Berhasil meng-closed item");
      console.log(e)
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
            <div>
              <h6>Gambar Barang</h6>
              <img className="mx-auto d-block rounded" src={data.image} alt="" />
            </div>
            {
              data.closingImage===null?<></>:<>
                <h6>Gambar Closing</h6>
                <p>
                  Closing oleh: {data.closingAgent} <br/>
                  <a href={data.closingDocumentation}>Berita Acara</a>
                </p>
                <img className="mx-auto d-block rounded" src={data.closingImage} alt="" />
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
                  <button type="button" className="btn btn-success me-1 text-white me-3 px-5 mb-2" data-bs-toggle="modal" data-bs-target="#Terima">
                    Close Item
                  </button>
                  <div className="modal fade" id="Terima" tabIndex="-1" aria-labelledby="TerimaLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <form className="modal-content" onSubmit={closeHandle}>
                        <div className="modal-header">
                          <h5 className="modal-title" id="TerimaLabel">Close Item</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          {/* Form filter */}
                          <div>
                            Foto Documentasi
                          </div>
                          <div className="d-flex">
                            <input type="file" 
                            className="form-control"
                            onChange={handleImageClosing} 
                            accept="image/png, image/gif, image/jpeg"/>
                          </div>
                          <div>
                            Berita Acara
                          </div>
                          <div className="d-flex">
                            <input type="file" 
                            className="form-control"
                            onChange={handleDocumentClosing} 
                            accept=".doc, .docx, .pdf"/>
                          </div>
                          <div>
                            Nama Petugas
                          </div>
                          <div className="d-flex">
                            <input type="text" 
                            className="form-control"
                            onChange={(e)=>setAgentName(e.target.value)} />
                          </div>
                          {/* End of Form filter */}
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="submit" className="btn btn-primary text-white" data-bs-dismiss="modal">Terima</button>
                        </div>
                      </form>
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
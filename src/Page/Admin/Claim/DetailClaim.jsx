import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { AdminDefault } from "../AdminDefault";
import { getDetailClaim } from "../../../Hooks/Admin/ItemClaim";
import { sendCloseItem } from "../../../Hooks/Admin/Item";
import Loading from "../../Componen/Loading"
import { Link } from "react-router-dom";
import { Status } from "../../../Constants/Status";

const Detail = () => {
  const location = useLocation();
  const [comment, setComment] = useState("")
  const [showComment, setShowComment] = useState([]);
  const [image64, setImage64] = useState("")
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [itemClaimId, setItemClaimId] = useState();
  const routeParams = useParams();
  const [namaTempat, setNamaTempat] = useState("");
  const [tgl, setTgl] = useState("");
  const [tolak, setTolak] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(()=>{
    setItemClaimId(routeParams["id"]);
    fetchData();
    getComment();
  },[routeParams]);
  const fetchData = async()=>{
    getDetailClaim({id:routeParams["id"]})
    .then((e)=>{
      setItem(e.data);
    })
    .catch((err)=>{
      if(err.response.status ==401){
        navigate("/admin");
      }
    });
  }
  const getComment = async ()=>{
    const token = Cookies.get("token");
    axios
      .get(`${BASE_URL}/Admin/Item-Comment?itemClaimId=${routeParams["id"]}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "image/jpeg",
        },
      })
      .then((res) => {
        setShowComment(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitComment = async (e) => {
    setLoading(true);
    e.preventDefault();
    const token = Cookies.get("token");
    const data = {
      itemClaimId: itemClaimId,
      value : comment,
      imageBase64 : image64 
  };
  console.log(data)
  const res = axios.post(`${BASE_URL}/Admin/Item-Comment`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((e)=>{
    setLoading(false);
    window.location.reload();
  }).catch((e)=>{
    setLoading(false);
    alert("Terjadi kesalahan");
  });
}

const tolakHandle = async () => {
  if(tolak === ""){
    alert("Data tidak boleh kosong")
    return
  }
  console.log(tolak)
  setLoading(true)
  try {
    const token = Cookies.get('token');
    const response = await axios.post(
      `${BASE_URL}/Admin/Item-Claim/${itemClaimId}/reject`,
      {
        rejectReason: tolak,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Tolak response:', response.data);
    setLoading(false);
    fetchData();
  } catch (error) {
    console.error('Tolak error:', error);
    setLoading(false);
  }
};

const closeHandle = async()=>{
  console.log(",asuk sini gak sih")
  sendCloseItem({id:item.itemFoundId})
  .then((e)=>{
    alert("Berhasil meng-closed item");
    window.location.reload();
  })
  .catch((e)=>{
    console.log(e);
    alert(e.data.data);
  })
}
const terimaHandle = async () => {
  if(namaTempat === "" || tgl === ""){
    alert("Data tidak boleh kosong")
    return
  }
  setLoading(true)
  try {
    const token = Cookies.get('token');
    const response = await axios.post(
      `${BASE_URL}/Admin/Item-Claim/${itemClaimId}/approve`,
      {
        claimLocation: namaTempat,
        claimDate: tgl
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Claim Di teirma', response.data);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    alert(error);

  }
};

  return (
    <>
    {loading ? (<Loading />) : (
    <AdminDefault 
    title={"Detail Claim"}
    body={
      <>
          {item==null?<></>:<>
          
          <div className={"row table overflow-auto min-h-80 h-80 pb-2 mx-0"}> 
            <div className="col-md-4 card me-2 h-100 overflow-auto">
              <div className="row">
                <div className="col-12">
                  <h6>Detail Barang</h6>
                </div>
              </div>
              <div className="row">
                <div className="form__group col-12">
                  <input type="text" disabled className="form__field" value={item.name}/>
                  <label className="form__label">Nama Barang</label>
                </div>
              </div>
              <div className="row">
                <div className="form__group col-12">
                  <input type="text" disabled className="form__field" value={item.itemFoundStatus}/>
                  <label className="form__label">Status</label>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-12"><img src={item.image} alt="image item" /></div>
              </div>
              <h6>Keterangan Klaim</h6>
              <div className="row">
                <div className="row">
                  <div className="form__group col-12">
                    <input type="text" disabled className="form__field" value={item.identityNumber}/>
                    <label className="form__label">Nomor Identitas</label>
                  </div>
                </div>
                <div className="row">
                  <div className="form__group col-12">
                    <input type="text" disabled className="form__field" value={item.userName}/>
                    <label className="form__label">Nama</label>
                  </div>
                </div>
                <div className="row">
                  <div className="form__group col-12">
                    <input type="text" disabled className="form__field" value={item.userPhoneNumber}/>
                    <label className="form__label">No. HP</label>
                  </div>
                </div>
                <div className="row">
                  <div className="form__group col-12">
                    <input type="text" disabled className="form__field" value={item.userEmail}/>
                    <label className="form__label">Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="form__group col-12">
                    <input type="text" disabled className="form__field" value={item.status}/>
                    <label className="form__label">Status</label>
                  </div>
                </div>
                {
                  item.status===Status.Rejected?<>
                    <div className="row">
                      <div className="form__group col-12">
                        <input type="text" disabled className="form__field" value={item.rejectReason}/>
                        <label className="form__label">Alasan</label>
                      </div>
                    </div>
                  </>:<></>
                }
                
                {
                  item.status===Status.Approved?<>
                    <div className="row">
                      <div className="form__group col-12">
                        <input type="text" disabled className="form__field" value={item.claimLocation}/>
                        <label className="form__label">Tanggal Pengambilan</label>
                      </div>
                    </div>
                      <div className="row">
                        <div className="form__group col-12">
                          <input type="text" disabled className="form__field" value={item.claimDate}/>
                          <label className="form__label">Lokasi Pengambilan</label>
                        </div>
                      </div>
                  </>:<></>
                }
                <div className="row">
                  <div className="form__group col-12">
                    <input type="text" disabled className="form__field" value={item.proofDescription}/>
                    <label className="form__label">Deskripsi</label>
                  </div>
                </div>
                <div className="col-12">
                  <img src={item.proofImage}/>
                </div>
              </div>
            </div>
            <div className="col-md-7 card px-2 h-100 overflow-auto">
              {showComment.length > 0?
              <div>
                <h6>Keterangan Tambahan</h6>  
              </div>:<></>}
                  {showComment.map((comment, index) => {
                    return (
                      <div className={"row "+(comment.userStatus==="Admin"?"justify-content-start":"justify-content-end")}>
                        <div key={index} className="border mb-2 col-10 col-md-8">
                          <div className=" ">
                          <span className="fw-bold text-dark">From: {comment.userName} ({comment.userStatus})</span>
                          <p className="ps-5">{comment.value}</p>
                          </div>
                          <div className="float-end   me-2 rounded">
                          {comment.image ? (
                            <>
                        <Link
                          className="col-12  text-dark bg-secondary border p-1 rounded text-decoration-none"
                          to={"/admin/ShowImage"}
                          state={{ from: comment.image  }}>
                          Show image
                        </Link>
                            </>
                          ) : (null)}</div>
                        </div>
                      
                      </div>
                    );
                  })}
                <form onSubmit={handleSubmitComment}>
                  <div className="mb-3">
                    <label htmlFor="comment" className="form-label fw-bold text-dark">
                      Keterangan Tambahan
                    </label>
                    <textarea
                      className="form-control"
                      id="comment"
                      rows="3"
                      onChange={(e) => setComment(e.target.value)} required
                    ></textarea>
                  </div>

                  <div className="d-flex">
                    <input type="file" 
                    className="form-control"
                    onChange={handleFileInputChange} />
                  </div>
                  <div className="row">
                    {selectedFile && (
                      <img
                        src={image64}
                        alt="Selected Image"
                        className=""
                      />
                    )}
                  </div>
                  <button 
                  className="bg-primary text-white float-start ms-2 px-4"
                  type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
            
            <div className="row">
              <div className="col-11">
                <div className="float-end top"> 
          {item.status === Status.Confirmation ? (
            <>
                <button type="button" class="btn btn-success me-1 text-white me-3 px-5" data-bs-toggle="modal" data-bs-target="#Terima">
                  Terima
                </button>
                <div class="modal fade" id="Terima" tabindex="-1" aria-labelledby="TerimaLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="TerimaLabel">Terima Claim User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        {/* Form filter */}
                        <div className="mb-3">
                          <label htmlFor="namaBarang" className="form-label">Nama Tempat</label>
                          <input required type="text" className="form-control" id="namaBarang" onChange={(e)=>{setNamaTempat(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="tgl" className="form-label">Tanggal Ditemukan</label>
                          <input required type="date" className="form-control" id="tgl"  onChange={(e)=>{setTgl(e.target.value)}} />
                        </div>
                        {/* End of Form filter */}
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onClick={terimaHandle}>Terima</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end tombol terima */}
                {/* start tombol tolak */}

                <button type="button" class="btn btn-danger px-5  me-1 text-white" data-bs-toggle="modal" data-bs-target="#Tolak">
                  Tolak
                </button>
                <div class="modal fade" id="Tolak" tabindex="-1" aria-labelledby="TolakLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="TolakLabel">Tolak Item</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        {/* Form filter */}
                        <div className="mb-3">
                          <label htmlFor="namaBarang" className="form-label">Alasan</label>
                          <input required type="text" className="form-control" id="namaBarang" onChange={(e)=>{setTolak(e.target.value)}} />
                        </div>
                        {/* End of Form filter */}
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onClick={tolakHandle}>Tolak</button>
                      </div>
                    </div>
                  </div>
                </div>
                </>
              ):(null)}

            {item.itemFoundStatus==Status.Confirmed?<>
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
                    {/* End of Form filter */}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onClick={closeHandle}>Terima</button>
                  </div>
                </div>
              </div>
            </div></>:<></>}
            
            </div>
              {/* end tombol tolak */}
              </div>
              
            </div>
          </>}
          
            
        </>
      }
    />

  )}
  </>
  );
}
export default Detail;
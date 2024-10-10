import { useEffect, useState } from "react";
import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import "../../Asset/style.css";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailFoundClaim, getComment, sendComment, sendRating } from "../../Hooks/User/ItemClaim";
import {AiOutlineUser} from 'react-icons/ai'
import { Status } from "../../Constants/Status";
import { statusBadge } from "../../Util/Utils";
import { BsFillStarFill } from "react-icons/bs"
import { LoadingModal } from "../Loading";
import { RatingStar } from "../Componen/Rating";

export default function DetailClaimBarang() {

    const [barang, setBarang] = useState([]);
    const [comment, setComment] = useState([]);
    const [informasiTambahan, setInformasiTambahan] = useState("");
    const [base64Image, setBase64Image] = useState("");
    const [file, setFile] = useState();
    const [isLoading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const [ratingCommentar, setRatingCommentar] = useState();
    var routeParams = useParams();
    var itemClaimId = routeParams["id"];
    var navigate = useNavigate();

    useEffect(()=>{
        setLoading(true);
        fetchDetailBarang();
        fetchComment();
    },[routeParams]);

    const fetchComment = async ()=>{
        getComment(itemClaimId)
        .then(e=>{
            setComment(e.data);
        })
    }

    const fetchDetailBarang = () =>{
        getDetailFoundClaim(itemClaimId)
        .then((e)=>{
            setBarang(e.data);
        })
        .catch((e)=>{
            if(e.status===401) alert("Mohon login terlebih dahulu")
            if(e.data.statusCode===403) {
                alert("Anda tidak dapat mengakses halaman ini");
                navigate("/Claim");
            }
            if(e.data.statusCode === 404) {
                alert("Data tidak ditemukan")
                navigate("/Claim");
            }
        })
        .finally((e)=>{
            setLoading(false);
            console.log(e)
        })
    }

    const handleFileInputChange = (event) => {
        console.log(file);
        const fileSelected = event.target.files[0];
        setFile(fileSelected);
    
        if (fileSelected) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setBase64Image(reader.result);
          };
          reader.readAsDataURL(fileSelected);
        }
        console.log(file);
    };
    
    const handleInformasiTambahan = (e)=>{
        setInformasiTambahan(e.target.value);
    }
    const submitComment = (e)=>{
        e.preventDefault();
        setLoading(true);
        sendComment({itemClaimId:itemClaimId,comment:informasiTambahan,image:base64Image})
        .then(()=>{
            setInformasiTambahan("");
            setFile("")
            setBase64Image("");
            fetchComment();
            setLoading(false);
            window.location.reload();
        })
        .catch((e)=>{
            console.log(e)
            setLoading(false);
        })
    }

    const submitRating = (e) =>{
        e.preventDefault();
        setLoading(true);
        sendRating({itemClaimId:itemClaimId,rating:rating, ratingComentar:ratingCommentar})
        .then(()=>{
            fetchDetailBarang();
            window.location.reload();
        })
        .catch((e)=>{
            console.log(e)
            alert("Terjadi kesalahan");
        })
        .finally(e=>{
            console.log(e)
            setLoading(false);
        })
    }

    return (
        <div className="bg-white">
            <Headers />
            <LoadingModal isLoading={isLoading}/>
            <div className="container py-5" id="title">
                <h2 className="fw-bold">
                    Detail Klaim Barang
                </h2>
            </div>

            {barang?
                    <>
                        <div className="container pb-5">
                            <div className="row justify-content-center">
                                <div className="col-sm-12 col-lg-10">
                                    <div className="card">
                                    <div className="row card-body">
                                            <img className="col-sm-2" src={barang.image} alt="sans"/>
                                            <div className="col-sm-9">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <p className="card-title text-dark fw-bold">Nama barang </p>
                                                    </div>
                                                    <div className="col-8">
                                                        <p className="text-dark ">: {barang.name}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <p className="card-title fw-bold text-dark ">Waktu pengajuan </p>
                                                    </div>
                                                    <div className="col-8">
                                                        <p className="text-dark ">: {barang.createdDate==null?"":barang.createdDate.split("T")[0]}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <p className="card-title fw-bold text-dark ">Status  </p>
                                                        
                                                    </div>
                                                    <div className="col-8">
                                                        <p className="text-dark ">: 
                                                            {statusBadge(barang.status)}
                                                            <button type="button" className="text-white bg-dark badge ms-2" data-bs-toggle="modal" data-bs-target="#Tolak">
                                                            !
                                                            </button>
                                                            <div className="modal fade" id="Tolak" tabIndex="-1" aria-labelledby="TolakLabel" aria-hidden="true">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id="TolakLabel">Keterangan Status</h5>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <div className="row">
                                                                            <div className="col-3"><span className="bg-warning badge"> Confirmation</span></div>
                                                                            <div className="col-1">:</div>
                                                                            <div className="col-8">
                                                                                Menunggu data yang Anda kirimkan untuk dikonfirmasi oleh Admin.
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-3"><span className="bg-success badge"> Approved</span></div>
                                                                            <div className="col-1">:</div>
                                                                            <div className="col-8">
                                                                                Data Anda telah dikonfirmasi oleh Admin, Anda dapat mengambil pada lokasi dan waktu yang ditentukan atau dapat menghubungi Admin melalui bagian keterangan tambahan.  
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-3"><span className="bg-danger badge"> Reject</span></div>
                                                                            <div className="col-1">:</div>
                                                                            <div className="col-8">
                                                                                Data Anda ditolak oleh Admin karena suatu alasan.                                                                        
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </p>
                                                    </div>
                                                </div>
                                                {
                                                    barang.status===Status.Rejected?<>
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <p className="card-title fw-bold text-dark ">Alasan Penolakan </p>
                                                            </div>
                                                            <div className="col-8">
                                                                <p className="card-title text-dark ">: {barang.rejectReason}</p>
                                                            </div>
                                                        </div>
                                                    </>:<></>
                                                }
                                                {
                                                    barang.status === Status.Approved ?<>
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <p className="card-title fw-bold text-dark ">Tempat pengambilan </p>
                                                            </div>
                                                            <div className="col-8">
                                                                <p className="card-title text-dark ">: {barang.claimLocation}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <p className="card-title fw-bold text-dark ">Waktu pengambilan </p>
                                                            </div>
                                                            <div className="col-8">
                                                                <p className="card-title text-dark ">: {barang.claimDate}</p>
                                                            </div>
                                                        </div>
                                                    </>:<></>
                                                }<>{
                                                    barang.status === Status.Rejected || barang.status === Status.Approved?
                                                    <>
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <p className="card-title fw-bold text-dark ">Rating </p>
                                                        </div>
                                                        <div className="col-8">: 
                                                        {barang.rating===null?<>
                                                            <button className="badge bg-primary" data-bs-toggle="modal" data-bs-target="#rating">
                                                                Berikan rating
                                                            </button>
                                                            <div className="modal fade" id="rating" tabIndex="-1" aria-labelledby="RatingLabel" aria-hidden="true">
                                                                <div className="modal-dialog">
                                                                    <form className="modal-content" onSubmit={submitRating}>
                                                                        <div className="modal-header">
                                                                            <div className="modal-title">
                                                                                berikan Rating pada Pelayanan
                                                                            </div>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <BsFillStarFill onClick={()=>setRating(1)} className={rating>0?"text-warning":""}/>
                                                                            <BsFillStarFill onClick={()=>setRating(2)} className={rating>1?"text-warning":""}/>
                                                                            <BsFillStarFill onClick={()=>setRating(3)} className={rating>2?"text-warning":""}/>
                                                                            <BsFillStarFill onClick={()=>setRating(4)} className={rating>3?"text-warning":""}/>
                                                                            <BsFillStarFill onClick={()=>setRating(5)} className={rating>4?"text-warning":""}/>
                                                                            <div>
                                                                                <label>Komentar</label> <br/>
                                                                                <input type="text" required="true" onChange={(e)=>setRatingCommentar(e.target.value)} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                            <button type="submit" className="btn btn-primary text-white">Kirim</button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </>:<>
                                                            <RatingStar rating={barang.rating}/>
                                                            <div className="row">
                                                                <p className="card-title text-dark ">: {barang.ratingComentar}</p>
                                                            </div>
                                                        </>}
                                                        </div>
                                                    </div>
                                                    </>:<></>
                                                }</>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                :<></>}
            <div className="container">
                <div className="row pb-5">
                    <div className="container col-lg-6 col-sm-12">
                        <form className="">
                            <h2 className="">
                                Data Diri
                            </h2>
                            <div className="data-diri col-md-12 my-2">
                                <p>{barang.userName}</p>
                            </div>
                            <div className="data-diri col-md-12 my-2">
                                <p>{barang.identityNumber}</p>
                            </div>
                            <div className="data-diri col-md-12 py-2">
                                <p>{barang.userPhoneNumber}</p>
                            </div>
                            <h2 className="pt-4 pb-2">
                                Bukti Kepemilikan
                            </h2>
                            <div className="data-diri col-md-12 py-2">
                                <p>{barang.proofDescription}</p>
                            </div>
                            <div className="col-12 py-2 row">
                                <img src={barang.proofImage} alt="sans" className="col-md-4"/>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
            
            {barang === null || barang.imageClosing===null?
                <></>:<>
                <div className="container mb-5">
                    <div className="row">
                        <div className="container col-sm-6">
                            <h5>Bukti Pengambilan</h5>
                            <img src={barang.imageClosing} className="w-100"/>
                        </div>
                    </div>
                </div>
                </>
            }
            <div className="container">
                <div className="row pb-5">
                    <div className="container col-sm-6">
                        <h5>
                            Keterangan tambahan
                        </h5>
                        {
                            comment.map(e=>{
                                return <div className={"row "+(e.userStatus=="User"?"justify-content-end":"")} key={e.id}> 
                                    {e.userStatus!="User"?<div className="col-1 d-flex justify-content-end pt-2">
                                        <AiOutlineUser/>
                                    </div>:<></>}
                                    <div className="col-8 data-diri mb-3">
                                        <div className="block fw-bold text-dark">{e.userName} - {e.userStatus}</div>
                                        <p className="text-dark">{e.value}</p>
                                        {e.image?<a href={e.image}>Gambar</a>:<></>}
                                    </div>
                                    {e.userStatus=="User"?<div className="col-1">
                                        <AiOutlineUser/>
                                    </div>:<></>}
                                    
                                </div>
                            })
                        }
                        <form className="col-12 d-flex justify-content-end row" onSubmit={submitComment}>
                            <div className="col-12">
                                <input type="text" className="form-control" id="" placeholder="Informasi Tambahan" required onChange={handleInformasiTambahan} value={informasiTambahan}/>
                            </div>
                            <div className="col-12 py-2">
                                <input className="form-control" type="file" id="formFile" onChange={handleFileInputChange}/>
                            </div>
                            <div className="col-12 d-flex justify-content-end">
                                <button className="bg-primary text-white btn px-5 d-block" type="submit">
                                    Kirim
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <div className="bg-dark mt-5">
                <Footer />
            </div>
        </div>
    );
}
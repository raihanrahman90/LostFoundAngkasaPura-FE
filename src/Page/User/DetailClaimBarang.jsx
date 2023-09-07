import { useEffect, useState } from "react";
import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import "../../Asset/style.css";
import { Link, useParams } from "react-router-dom";
import { getDetailFoundClaim, getComment, sendComment } from "../../Hooks/User/ItemClaim";
import {AiOutlineUser} from 'react-icons/ai'

export default function DetailClaimBarang() {

    const [barang, setBarang] = useState([]);
    const [comment, setComment] = useState([]);
    const [informasiTambahan, setInformasiTambahan] = useState("");
    const [base64Image, setBase64Image] = useState("");
    const [file, setFile] = useState();
    var routeParams = useParams();
    var foundClaimId = routeParams["id"];


    useEffect(()=>{
        console.log(foundClaimId);
        getDetailFoundClaim(foundClaimId)
        .then((e)=>{
            setBarang(e.data);
        })
        fetchComment();
    },[]);
    const fetchComment = async ()=>{
        getComment(foundClaimId)
        .then(e=>{
            setComment(e.data);
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
        sendComment({itemClaimId:foundClaimId,comment:informasiTambahan,image:base64Image})
        .then((e)=>{
            setInformasiTambahan("");
            setFile("")
            setBase64Image("");
            fetchComment();
            window.location.reload();
        })
    }
    const handleStatus = (status) => {
        switch (status) {
            case "Confirmed":
                return "confirmedStyle";
            case "Confirmation":
                return "confirmationStyle";
            case "Reject":
                return "rejectStyle";
            case "Approved":
                return "confirmedStyle";
            default:
                return "";
        }
    };

    return (
        <div style={{backgroundColor:"white"}}>
            <Headers />

            <div className="container py-5" id="title">
                <h2 className="fw-bold">
                    Detail Klaim Barang
                </h2>
            </div>

            {barang?
                    <>
                        <div className="container pb-5">
                            <div className="col-sm-12">
                                <div className="card">
                                <div className="row card-body">
                                        <img className="col-sm-2" src={barang.image} alt="sans"/>
                                        <div className="col-sm-9">
                                            <div className="row">
                                                <div className="col-4">
                                                    <p className="card-title text-dark fw-bold">Nama barang </p>
                                                </div>
                                                <div className="col-8">
                                                    <p className="card-title text-dark ">: {barang.name}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <p className="card-title fw-bold text-dark ">Waktu pengajuan </p>
                                                </div>
                                                <div className="col-8">
                                                    <p className="card-title text-dark ">: {barang.createdDate.split("T")[0]}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <p className="card-title fw-bold text-dark ">Status  </p>
                                                    
                                                </div>
                                                <div className="col-8">
                                                    <p className="card-title text-dark ">: 
                                                        <span className={`px-2 py-1 ms-2 text-white rounded ${handleStatus(barang.status)}`}>
                                                            {barang.status}
                                                            
                                                        </span>
                                                        <button type="button" class="text-white bg-dark badge ms-2" data-bs-toggle="modal" data-bs-target="#Tolak">
                                                        !
                                                        </button>
                                                        <div class="modal fade" id="Tolak" tabindex="-1" aria-labelledby="TolakLabel" aria-hidden="true">
                                                            <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 class="modal-title" id="TolakLabel">Keterangan Status</h5>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div class="modal-body">
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
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </p>
                                                </div>
                                            </div>
                                            
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                :<></>}

            <div className="row pb-5">
                <div className="container col-sm-6">
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

            <div className="row pb-5">
                <div className="container col-sm-6">
                    <h5>
                        Keterangan tambahan
                    </h5>
                    {
                        comment.map(e=>{
                            return <div className={"row "+(e.userStatus=="User"?"justify-content-end":"")}> 
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
                        <button className="bg-primary text-white btn px-5" type="submit">
                            Kirim
                        </button>
                    </form>
                </div>
            </div>

            <div className="bg-dark mt-5">
                <Footer />
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import "../../Asset/style.css";
import { Link, useNavigate } from "react-router-dom";
import { listItemClaim } from "../../Hooks/User/ItemClaim";
import { Status } from "../../Constants/Status";
import { statusBadge } from "../../Util/Utils";

export default function ListClaimUser() {
    const navigate = useNavigate();
    const [barang, setBarang] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    useEffect(()=>{
        listItemClaim(page)
        .then((e)=>{
            setBarang(e.data.data);
            setTotalPage(e.data.totalPage);
        })
        .catch((e)=>{
            navigate("/Login?message=Mohon login terlebih dahulu")
        })
    },[page])

    return (
        <div style={{backgroundColor:"white"}}>
            <Headers />

            <div className="container py-5">
                <h2 className="fw-bold">
                    Daftar Pengajuan Klaim Barang
                </h2>
            </div>

            {barang.map ((item) => {
                return (
                    <>
                        <div className="container pb-5">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="row card-body">
                                        <img className="col-sm-3" src={item.image} alt="sans"/>
                                        <div className="col-sm-9">
                                            <div className="row">
                                                <div className="col-4">
                                                    <p className="card-title claim-text">Nama barang </p>
                                                </div>
                                                <div className="col-8">
                                                    <p className="card-title">: {item.name}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <p className="card-title">Waktu pengajuan </p>
                                                </div>
                                                <div className="col-8">
                                                    <p className="card-title">: {item.createdDate==null?"":item.createdDate.split("T")[0]}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <p className="card-title">Status  </p>
                                                </div>
                                                <div className="col-8">
                                                    <p className="card-title">: 
                                                        {statusBadge(item.status)}
                                                    </p>
                                                </div>
                                            </div>
                                            {
                                                item.status === Status.Approved?
                                                <>
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <p className="card-title">Tempat pengambilan </p>
                                                        </div>
                                                        <div className="col-8">
                                                            <p className="card-title">: {item.claimLocation}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <p className="card-title">Waktu pengambilan </p>
                                                        </div>
                                                        <div className="col-8">
                                                            <p className="card-title">: {item.claimDate}</p>
                                                        </div>
                                                    </div>
                                                </>:<></>
                                            }
                                            {
                                                item.status === Status.Rejected ?
                                                <>
                                                   <div className="row">
                                                        <div className="col-4">
                                                            <p className="card-title">Alasan Penolakan </p>
                                                        </div>
                                                        <div className="col-8">
                                                            <p className="card-title">: {item.rejectReason}</p>
                                                        </div>
                                                    </div>
                                                </>:<></>
                                            }
                                            <div className="row">
                                                <div className="col-12 justify-content-end d-flex">
                                                    <Link className="btn bg-primary text-white" to={"/Claim/"+item.id+"#title"}>Detail Claim</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}

            <div className="bg-dark mt-5">
                <Footer />
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import "../../Asset/style.css";
import Logo from "../../Asset/logo.png";
import {
    Form,
    FormControl,
    InputGroup,
    Container,
    Row,
    Col
  } from "react-bootstrap";
import { Card } from "../Componen/Card";
import { Link, useParams } from "react-router-dom";
import { getDetailFoundClaim } from "../../Hooks/User/ItemClaim";

export default function DetailClaimBarang() {

    const [barang, setBarang] = useState([]);
    var routeParams = useParams();
    var foundClaimId = routeParams["id"];
    useEffect(()=>{
        console.log(foundClaimId);
        getDetailFoundClaim(foundClaimId)
        .then((e)=>{
            setBarang(e.data);
        })
    },[]);
    const handleStatus = (status) => {
        switch (status) {
            case "Confirmed":
                return "confirmedStyle";
            case "Confirmation":
                return "confirmationStyle";
            case "Reject":
                return "rejectStyle";
            default:
                return "";
        }
    };

    return (
        <div style={{backgroundColor:"white"}}>
            <Headers />

            <div className="container py-5" id="title">
                <h2 className="fw-bold">
                    Daftar Pengajuan Klaim Barang
                </h2>
            </div>

            {barang?
                    <>
                        <div className="container pb-5">
                            <div className="col-sm-12">
                                <div className="card">
                                <div className="row card-body">
                                        <img className="col-sm-3" src={barang.image} alt="sans"/>
                                        <div className="col-sm-9">
                                            <div className="row">
                                                <div className="col-4">
                                                    <p className="card-title claim-text">Nama barang </p>
                                                </div>
                                                <div className="col-8">
                                                    <p className="card-title">: {barang.name}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <p className="card-title">Waktu pengajuan </p>
                                                </div>
                                                <div className="col-8">
                                                    <p className="card-title">: {barang.createdDate}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <p className="card-title">Status  </p>
                                                </div>
                                                <div className="col-8">
                                                    <p className="card-title">: 
                                                        <span className={`px-2 py-1 ms-2 text-white rounded ${handleStatus(barang.status)}`}>
                                                            {barang.status}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-4">
                                                    <p className="card-title">Tempat pengambilan </p>
                                                </div>
                                                <div className="col-8">
                                                    <p className="card-title">: {barang.claimLocation}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <p className="card-title">Waktu pengambilan </p>
                                                </div>
                                                <div className="col-8">
                                                    <p className="card-title">: {barang.claimDate}</p>
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
                    <h2 className="">
                        Tanya Jawab
                    </h2>
                    <form className="row">
                    <div className="col-12">
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                        <button className="bg-primary text-white btn px-5">
                            Kirim
                        </button>
                    </div>
                    </form> 
                </div>
            </div>

            <div className="bg-dark mt-5">
                <Footer />
            </div>
        </div>
    );
}
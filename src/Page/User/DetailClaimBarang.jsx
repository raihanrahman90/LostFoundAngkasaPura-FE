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

export default function DetailClaimBarang() {

    const barang = [
        {
            nama_barang : "Jam Tangan Rolex KW",
            waktu_pengajuan : "23 Juli 2023",
            status : "Confirmed",
            tempat_pengambilan : "Gerbang 6",
            waktu_pengambilan : "30 Juli 2023, 14.00 WITA"
        },
    ]

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

            {barang.map ((item) => {
                return (
                    <>
                        <div className="container pb-5">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="row card-body">
                                        <img className="col-sm-3" src={Logo} alt="sans"/>
                                        <div className="col-sm-3">
                                            <p className="card-title claim-text">Nama barang </p>
                                            <p className="card-title">Waktu pengajuan </p>
                                            <p className="card-title">Status  </p>
                                            <p className="card-title">Tempat pengambilan </p>
                                            <p className="card-title">Waktu pengambilan </p>
                                        </div>
                                        <div className="col-sm-1 p-0">
                                            <p className="card-title">: </p>
                                            <p className="card-title">: </p>
                                            <p className="card-title">: </p>
                                            <p className="card-title">: </p>
                                            <p className="card-title">: </p>
                                        </div>
                                        <div className="col-sm-5">
                                            <p className="card-title">{item.nama_barang}</p>
                                            <p className="card-title">{item.waktu_pengajuan}</p>
                                            <p className={`${handleStatus(item.status)}`}>{item.status}</p>
                                            <p className="card-title">{item.tempat_pengambilan}</p>
                                            <p className="card-title">{item.waktu_pengambilan}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}

            <div className="row pb-5">
                <div className="container col-sm-6">
                    <form className="">
                        <h2 className="">
                            Data Diri
                        </h2>
                        <div className="data-diri col-md-12 my-2">
                            <p>Raihan</p>
                        </div>
                        <div className="data-diri col-md-12 my-2">
                            <p>123569875123645</p>
                        </div>
                        <div className="data-diri col-md-12 py-2">
                            <p>08789899878988</p>
                        </div>
                        <h2 className="pt-4 pb-2">
                            Bukti Kepemilikan
                        </h2>
                        <div className="data-diri col-md-12 py-2">
                            <p>Jam tersebut pemberian ayah saya, di bagian jarum terdapat inisial WWE yang merupakan inisial dari ayah saya</p>
                        </div>
                        <div className="col-md-12 py-2">
                            <img src={Logo} alt="sans"/>
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
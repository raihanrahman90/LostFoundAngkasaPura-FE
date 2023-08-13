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

export default function ListBarangUser() {

    const barang = [
        {
            nama_barang : "Jam Tangan Rolex KW",
            waktu_pengajuan : "23 Juli 2023",
            status : "Confirmed",
            tempat_pengambilan : "Gerbang 6",
            waktu_pengambilan : "30 Juli 2023, 14.00 WITA"
        },
        {
            nama_barang : "Jam Tangan Rolex KW",
            waktu_pengajuan : "23 Juli 2023",
            status : "Confirmation",
            tempat_pengambilan : "-",
            waktu_pengambilan : "-"
        },
        {
            nama_barang : "Jam Tangan Rolex KW",
            waktu_pengajuan : "23 Juli 2023",
            status : "Reject",
            tempat_pengambilan : "-",
            waktu_pengambilan : "-"
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

            <div className="bg-dark">
                <Footer />
            </div>
        </div>
    );
}
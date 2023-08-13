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

export default function ClaimBarang() {

    return (
        <div style={{backgroundColor:"white"}}>
            <Headers />

            <div className="container py-5">
                <h2 className="fw-bold">
                    Pengajuan Konfirmasi Barang
                </h2>
            </div>

            <div className="container pb-5">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="row card-body">
                            <img className="col-sm-3" src={Logo} alt="sans"/>
                            <div className="col-sm-9">
                                <h4 className="card-title fw-bold">Jam Tangan Rolex KW</h4>
                                <p className="card-text detail py-4" style={{color:"#808080"}}>Merek: Rolex, Nomor Model: 0104, Warna : abu-abu, ditemukan di gerbang 6 dai tempat tunggu boarding pass. terdapat goresan inisial ALWA di bawah jam tangan. barang tersebut ditemukan oleh cleaning service.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row pb-5">
                <div className="container col-sm-6">
                    <form className="">
                        <h2 >
                            Data Diri
                        </h2>
                        <div className="col-md-12 py-2">
                            <input type="text" className="form-control" id="" placeholder="Nama (Sesuai KTP)"/>
                        </div>
                        <div className="col-md-12 py-2">
                            <input type="text" className="form-control" id="" placeholder="No. KTP"/>
                        </div>
                        <div className="col-md-12 py-2">
                            <input type="text" className="form-control" id="" placeholder="No. Telepon"/>
                        </div>
                        <h2 className="pt-4 pb-2">
                            Bukti Kepemilikan
                        </h2>
                        <div className="col-md-12 py-2">
                            <input type="text" className="form-control" id="" placeholder="Informasi Tambahan"/>
                        </div>
                        <div className="col-md-12 py-2">
                            <input className="form-control" type="file" id="formFile" />
                        </div>
                        <a href="#" className="btn btn-primary w-100 text-white p-3 mt-2">Konfirmasi Barang</a>
                    </form> 
                </div>
            </div>


            <div className="bg-dark">
                <Footer />
            </div>
        </div>
    );
}
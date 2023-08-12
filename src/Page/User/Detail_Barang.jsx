import { useState } from "react";
import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import Logo from '../../Asset/logo.png';
import "../../Asset/style.css";
import {AiOutlineClockCircle} from 'react-icons/ai';
import {IoLocationOutline} from 'react-icons/io5';
import {
    Form,
    FormControl,
    InputGroup,
    Container,
    Row,
    Col,
    Button
  } from "react-bootstrap";

export default function DetailBarang() {
    return (
        <div className="" style={{backgroundColor:"white"}}>
            <Headers />

            <div className="container pb-3 mt-3 py-5">
                <h2 className="fw-bold">Informasi Barang Hilang</h2>
            </div>

            <div className="container my-5 pb-5">
                <div className="row">
                    <div className="col-md-4 p-5">
                        <img src={Logo} alt="" className="img-fluid" />
                    </div>
                    <div className="col-md-8">
                        <h2 className="fw-bold">Jam Tangan Rolex KW</h2>  
                        <p className="card-category my-5" style={{width:"10%"}}>Aksesoris</p>
                        <p className="detail">Deskripsi :</p>
                        <p className="detail my-2" >Merek: Rolex, Nomor Model: 0104, Warna : abu-abu, ditemukan di gerbang 6 dari tempat tunggu boarding pass. terdapat goresan inisial ALWA di bawah jam tangan. barang tersebut ditemukan oleh cleaning service. </p>
                        <p className="detail mt-5" >Informasi Penemuan :</p>
                        <div className="my-2">
                            <span>
                                <i className="mx-2">
                                    <AiOutlineClockCircle className="" style={{color: "#E71414"}}/>
                                </i>
                                23 Juni 2023, 12.05 WITA
                            </span>
                        </div>
                        <div className="mb-3">
                            <span>
                                <i className="mx-2">
                                    <IoLocationOutline className="" style={{color: "#2ECC71"}}/>
                                </i>
                                Gerbang 6
                            </span>
                        </div>
                        <a href="#" className="btn btn-primary w-100 text-white p-3">Konfirmasi Barang</a>
                    </div>
                </div>
            </div>

            <footer className="bg-dark mt-5">
                <Footer />
            </footer>
        </div>
    );
}
import { useEffect, useState } from "react";
import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import "../../Asset/style.css";
import Logo from "../../Asset/logo.png";
import { Link, useParams } from "react-router-dom";
import { getDetailFoundItem } from "../../Hooks/User/ListFoundItem";

export default function ClaimBarang() {
    var routeParams = useParams();
    const itemFoundId = routeParams["id"];
    const [data, setData] = useState([]);
    useEffect(()=>{
        getDetailFoundItem(itemFoundId)
        .then((e)=>{
            setData(e);
        });
    },[])
    return (
        <div style={{backgroundColor:"white"}}>
            <Headers />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <h2 className="fw-bold col-md-10 ">
                        Pengajuan Konfirmasi Barang
                    </h2>
                </div>
            </div>

            <div className="container pb-5">
                <div className="row justify-content-center">
                    <div className="col-sm-10">
                        <div className="card">
                            <div className="row card-body">
                                <div className="col-sm-3">
                                    <img className="w-100" src={data.image} alt="sans"/>
                                </div>
                                <div className="col-sm-9">
                                    <h4 className="card-title fw-bold">{data.name}</h4>
                                    <p className="card-text detail py-4" style={{color:"#808080"}}>
                                        {data.description}
                                    </p>
                                </div>
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
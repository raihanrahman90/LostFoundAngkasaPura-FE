import { useEffect, useState } from "react";
import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import Logo from '../../Asset/logo.png';
import "../../Asset/style.css";
import {AiOutlineClockCircle} from 'react-icons/ai';
import {IoLocationOutline} from 'react-icons/io5';
import { getDetailFoundItem } from "../../Hooks/User/ListFoundItem";
import { Link, useParams } from "react-router-dom";

export default function DetailBarang() {
    const routeParams = useParams();
    const itemFoundId = routeParams["id"];
    const [data, setData] = useState([]);
    useEffect(()=>{
        getDetailFoundItem(itemFoundId)
        .then((e)=>{
            setData(e.data);
        });
    },[])

    return (
        <div className="" style={{backgroundColor:"white"}}>
            <Headers />

            <div className="container pb-3 mt-3 py-5" id="title">
                <h2 className="fw-bold">Informasi Barang Hilang</h2>
            </div>

            <div className="container my-5 pb-5">
                <div className="row">
                    <div className="col-md-4 p-5">
                        <img src={data.image} alt="" className="img-fluid" />
                    </div>
                    <div className="col-md-8">
                        <h2 className="fw-bold">{data.name}</h2>  
                        <p className="card-category my-5" style={{width:"10%"}}>{data.category}</p>
                        <p className="detail">Deskripsi :</p>
                        <p className="detail my-2" >{data.description}</p>
                        <p className="detail mt-5" >Informasi Penemuan :</p>
                        <div className="my-2">
                            <span>
                                <i className="mx-2">
                                    <AiOutlineClockCircle className="" style={{color: "#E71414"}}/>
                                </i>
                                {data.foundDate}
                            </span>
                        </div>
                        {/*<div className="mb-3">
                            <span>
                                <i className="mx-2">
                                    <IoLocationOutline className="" style={{color: "#2ECC71"}}/>
                                </i>
                                Gerbang 6
                            </span>
    </div>*/}
                        <Link to={"/Barang/"+itemFoundId+"/Claim"} className="btn btn-primary w-100 text-white p-3">
                            Konfirmasi Barang
                        </Link>
                    </div>
                </div>
            </div>

            <footer className="bg-dark mt-5">
                <Footer />
            </footer>
        </div>
    );
}
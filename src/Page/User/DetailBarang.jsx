import { useEffect, useState } from "react";
import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import "../../Asset/style.css";
import { AiOutlineClockCircle } from 'react-icons/ai';
import { getDetailFoundItem } from "../../Hooks/User/ListFoundItem";
import { useNavigate, useParams } from "react-router-dom";
import { checkAccessToken } from "../../Hooks/User/Default";
export default function DetailBarang() {
    const routeParams = useParams();
    const itemFoundId = routeParams["id"];
    const [data, setData] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        getDetailFoundItem(itemFoundId)
        .then((e)=>{
            console.log(e);
            setData(e.data);
        });
        checkAccessToken()
        .then((e)=>{
            setIsLogin(true);
            console.log(e);
        });
    },[])
    const goToConfirmation = ()=>{
        if(isLogin){
            navigate("/Barang/"+itemFoundId+"/Claim")
        }else{
            alert("Mohon login terlebih dahulu")
        }
    }
    return (
        <div className="" style={{backgroundColor:"white"}}>
            <Headers />

            <div className="container pb-3 mt-3 py-5" id="title">
                <h2 className="fw-bold">Informasi Barang Hilang</h2>
            </div>

            <div className="container my-5 pb-5 text-dark">
                <div className="row">
                    <div className="col-md-4 p-5">
                        <img src={data.image} alt="" className="img-fluid" />
                    </div>
                    <div className="col-md-8">
                        <h2 className="fw-bold">{data.name}</h2>  
                        <p className="badge bg-success my-3" style={{width:"10%"}}>{data.category}</p>
                        <p className="detail text-third">Deskripsi :</p>
                        <p className="detail mt-1" >{data.description}</p>
                        <p className="detail mt-5 text-third" >Informasi Penemuan :</p>
                        <div className="my-2">
                            <span>
                                <i className="mx-2">
                                    <AiOutlineClockCircle className="" style={{color: "#E71414"}}/>
                                </i>
                                {data.foundDate}
                            </span>
                        </div>
                        <button className="btn btn-primary w-100 text-white p-3 mt-5" onClick={goToConfirmation}>
                            Konfirmasi Barang
                        </button>
                    </div>
                </div>
            </div>

            <footer className="bg-dark mt-5">
                <Footer />
            </footer>
        </div>
    );
}
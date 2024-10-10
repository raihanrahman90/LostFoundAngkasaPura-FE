import { useEffect, useState } from "react";
import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import "../../Asset/style.css";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailFoundItem } from "../../Hooks/User/ListFoundItem";
import { checkAccessToken } from "../../Hooks/User/Default";
import { createClaim } from "../../Hooks/User/ItemClaim";
import { LoadingPage } from "../Loading";
export default function ClaimBarang() {
    var routeParams = useParams();
    var navigate = useNavigate();
    const itemFoundId = routeParams["id"];
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [informasiTambahan, setInformasiTambahan] = useState();
    const [identityNumber, setIdentityNumber] = useState();
    const [base64Image, setBase64Image] = useState("");
    
    useEffect(()=>{
        getDetailFoundItem(itemFoundId)
        .then((e)=>{
            setData(e.data);
        });
        checkAccessToken()
        .catch((e)=>{
            console.log(e)
            navigate("/Login");
        })
    },[])

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
    
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setBase64Image(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
    
    const handleInformasiTambahan = (e)=>{
        setInformasiTambahan(e.target.value);
    }
    const handleIdentityNumber = (e)=>{
        setIdentityNumber(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createClaim(
        {
            itemFoundId: itemFoundId,
            identityNumber: identityNumber,
            identityType: "NIK",
            proofDescription:informasiTambahan,
            proofImageBase64: base64Image,
        }
        ).then((e)=>{
            setLoading(false);
            navigate("/Claim/"+e.data.id);
        })
        .catch((err)=>{
            alert("Terjadi kesalahan pada server");
            setLoading(false);
            console.log(err)
        });
    };

    return (
        <div style={{backgroundColor:"white"}}>
            {isLoading?<LoadingPage/>:<></>}
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
                    <div className="col-md-10 col-12">
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
                <div className="container col-md-6">
                    <form onSubmit={handleSubmit} className="px-2">
                        <h2 >
                            Data Diri
                        </h2>
                        <div className="col-md-12 py-2">
                            <input type="text" className="form-control" id="" placeholder="No. KTP" required onChange={handleIdentityNumber}/>
                        </div>
                        <h2 className="pt-4 pb-2">
                            Bukti Kepemilikan
                        </h2>
                        <div className="col-md-12 py-2">
                            <input type="text" className="form-control" id="" placeholder="Informasi Tambahan" required onChange={handleInformasiTambahan}/>
                        </div>
                        <div className="col-md-12 py-2">
                            <input className="form-control" type="file" id="formFile" required onChange={handleFileInputChange} accept="image/png, image/gif, image/jpeg"/>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary w-100 text-white px-3 mt-2">Konfirmasi Barang</button>
                        </div>
                    </form> 
                </div>
            </div>


            <div className="bg-dark">
                <Footer />
            </div>
        </div>
    );
}
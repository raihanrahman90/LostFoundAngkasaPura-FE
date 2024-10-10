import { useState } from "react";
import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import "../../Asset/style.css";
import { requestCodeForgotPassword, requestPasswordReset } from "../../Hooks/User/Default";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const requestCode = async(e)=>{
        e.preventDefault();
        requestCodeForgotPassword({email:email})
        .then((e)=>{
            alert("Kode reset password telah terkirim ke email Anda")
            setPage(2);
            console.log(e)
        })
    }
    const resetPassword = async(e)=>{
        e.preventDefault();
        requestPasswordReset({email:email, code:code,password:password})
        .then(()=>{
            alert("Password Anda berhasil diubah, silahkan login kembali");
            navigate("/");
        })
        .catch((e)=>{
            setMessage(e.data.data);
        })
    }
    return (
        <div className="" style={{backgroundColor:"white"}}>
        <Headers />

        <div className="container my-5 pb-5 content">
            <div className="row justify-content-center">
                <div className="col-md-6 bg-secondary rounded p-3">
                    <h6 className="">Lupa Password</h6>
                    
                    {page==1?
                    <>
                    <p className="mb-5">
                        Masukkan email Anda pada halaman ini untuk menerima code verifikasi reset password
                    </p>
                    <form className="row justify-content-center" onSubmit={requestCode}>
                        <div className='col-12 justify-content-center d-none d-md-flex row'>
                            <input type="text" className="form-control col-8 mb-2" placeholder="Masukkan email Anda" onChange={(e)=>setEmail(e.target.value)}/>
                            <button type="submit" className="btn bg-primary text-white col-12">Kirim</button>
                        </div>
                    </form>
                    </>:<></>}
                    {page==2?
                    <>
                        <p className="mb-5">
                            Masukkan code yang Anda terima pada email untuk melakukan reset password
                        </p>
                        {message?<div className="alert bg-warning text-white">
                            {message}
                        </div>:(null)}
                        <form className="" onSubmit={resetPassword}>
                            <div className='col-12 justify-content-center d-none d-md-flex row'>
                                <input type="text" className="form-control col-8 mb-2" placeholder="Kode verifikasi" onChange={(e)=>setCode(e.target.value)}/>
                                <input type="password" className="form-control col-8 mb-2" placeholder="Password baru" onChange={(e)=>setPassword(e.target.value)}/>
                                <button type="submit" className="btn bg-primary text-white col-12 mb-2">Kirim</button>
                                <button type="reset" onClick={()=>setPage(1)}>Ubah Email</button>
                            </div>
                        </form>
                    </>:<></>}
                </div>
            </div>
            
        </div>

        <footer className="bg-dark mt-5">
            <Footer />
        </footer>
    </div>
    );
}
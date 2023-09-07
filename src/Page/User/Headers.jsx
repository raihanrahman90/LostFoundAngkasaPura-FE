import React,{useState, useEffect} from "react";
import Logo from "../../Asset/logo.png";
import '../../Asset/user.css'
import '../../Asset/style.css';
import { Link, useNavigate } from 'react-router-dom';
import {login, register} from '../../Hooks/User/Default';
import Cookies from "js-cookie";
import { checkAccessToken } from "../../Hooks/User/Default";
import {IoMdNotifications} from 'react-icons/io';
import {  fetchCountNotification, getListNotification } from "../../Hooks/User/Notification";
import { LoadingPage } from "../Loading";

export default function Headers() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone , setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [countNotification, setCountNotification] = useState(0);
  const [listNotification, setListNotification] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const clickNotif=()=>{
    if(showNotif){
      setShowNotif(false);
    }
    if(!showNotif){
      setShowNotif(true);
    }
  }

  let navigate = useNavigate()
  useEffect(()=>{
    checkAccessToken()
    .then((e)=>{
      setIsLogin(true);
      fetchCountNotification()
      .then((e)=>{
        setCountNotification(e.data);
      })
      getListNotification()
      .then((e)=>{
        setListNotification(e.data)
      })
    })
    .catch((e)=>{
      setIsLogin(false);
    })
    
  },[isLogin])
  const handleLogout = async()=>{
    setIsLogin(false);
    Cookies.remove("token");
    Cookies.remove("refrehToken");
    navigate("/")
  }

 const handleLogin = async (e) => { 
  e.preventDefault();
  setLoading(true);
  login({email:email, password:password})
  .then((e)=>{
    setLoading(false);
    if(e.status == 200){
      setErrorLogin(null);
      Cookies.set("token", e.data.data.accessToken);
      Cookies.set("refreshToken", e.data.data.refreshToken);
      setEmail("");
      setPassword("");
      window.location.reload();
    }else{
      setErrorLogin(e.message);
    }
  })
  .catch((err)=>{
    console.log(err);
    setErrorLogin(err.response.data.data);
  });
}

const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);
  register({email:email, password:password, name:name, phone:phone})
  .then((e)=>{
    setLoading(false);
    if(e.status == 200){
      setErrorLogin(null);
      Cookies.set("token", e.data.data.accessToken);
      Cookies.set("refreshToken", e.data.data.refreshToken);
      setIsLogin(true);
      setEmail("");
      setPassword("");
      window.location.reload();
    }else{
      setErrorLogin(e.message);
    }
  })
  .catch((e)=>{
    setLoading(false);
    setErrorLogin(e.response.data.data);
  });
}

useEffect(()=>{
  const data = {
    email:email,
    password:password,
    phone:phone,
    name:name
  }
},[])


  return (
    <>
    {isLoading?<LoadingPage/>:<></>}
    <div id="header">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid py-3">
          <a class="navbar-brand ms-5 d-none d-md-inline" href="#">
            <img src={Logo} height={70} />
          </a>
          <button
            className="navbar-toggler ms-5"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          {isLogin?
          <>
          <button className="item align-self-end ms-auto me-1 notif me-3 d-inline d-md-none" onClick={clickNotif}>
            <IoMdNotifications />
            <span className="notif-count">{countNotification}</span>
          </button></>
          :<></>}
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item ms-5">
                <Link class="nav-link active fw-bold text-primary" aria-current="page" to="/">
                  Beranda
                </Link>
              </li>
              <li class="nav-item ms-5">
                <Link class="nav-link fw-bold text-primary" to="/Barang">
                  List Barang
                </Link>
              </li>
              {isLogin?<li class="nav-item ms-5">
                <Link class="nav-link fw-bold text-primary" to="/Claim">
                  List Claim
                </Link>
              </li>:<></>}
              
            </ul>
            <div class="">
              
              {isLogin?
              <>
                <button className="item align-self-end ms-auto me-1 notif me-3 d-none d-md-inline" onClick={clickNotif}>
                  <IoMdNotifications />
                  <span className="notif-count">{countNotification}</span>
                </button>
                <button className="btn bg-danger text-white pe-5 ps-5 me-5 ms-5" onClick={handleLogout}> Logout </button>
              </>:
              <button type="button" class="btn bg-danger text-white pe-5 ps-5 me-5 ms-5"  data-bs-toggle="modal" data-bs-target="#exampleModalLogin">
                Login
              </button>}
              
              

            {/* <!-- Modal --> */}
            <div class="modal modalLogin fade" id="exampleModalLogin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form class="modal-body" onSubmit={handleLogin}>

                    <div>
                      <img src={Logo} className="mx-auto d-flex my-3" height={50} alt="" />
                    </div>

                    <h5 className="mb-3">Login</h5>
                    {errorLogin?<div className="alert bg-danger text-white">
                      {errorLogin}
                    </div>:<></>}
                    
                    <div>
                    <input className="mx-1 px-4 py-2 w-100 form-control" onChange={(e)=>{setEmail(e.target.value)}}  type="email" placeholder="Alamat Email" required/>
                    </div>

                    <div className="mt-3">
                      <input className="mx-1 px-4 py-2 w-100 form-control" onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" required/>
                    </div>

                      <p className="mt-3"><Link to="/forgot-password"> Lupa password </Link></p>

                      <div className="mx-auto d-block">

                    <button className="w-100 mt-3 btn bg-primary text-white" type="submit">Login</button>
                    </div>

                  </form>
                    <p className="text-center mt-2">Belum punya akun? <span><button className="bg-transparent border-0 text-black" data-bs-target="#exampleModalRegis" data-bs-dismiss="modalLogin"  data-bs-toggle="modal" >Daftar</button></span></p>
                </div>
              </div>
            </div>

            {/* modalRegis */}

            <div class="modal modalRegis fade" id="exampleModalRegis" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form class="modal-body" onSubmit={handleRegister}>

                    <div>
                      <img src={Logo} className="mx-auto d-flex my-3" height={50} alt="" />
                    </div>

                    <h5 className="mb-3">Daftar</h5>
                    {errorLogin?<div className="alert bg-danger text-white">
                      {errorLogin}
                    </div>:<></>}
                    
                    <div className="mt-3">
                    <input className="mx-1 px-4 py-2 w-100 form-control" onChange={(e)=>{setName(e.target.value)}}  type="text" placeholder="Name" required/>
                    </div>

                    <div className="mt-3">
                    <input className="mx-1 px-4 py-2 w-100 form-control" onChange={(e)=>{setEmail(e.target.value)}}  type="email" placeholder="Email" required/>
                    </div>

                    <div className="mt-3">
                    <input className="mx-1 px-4 py-2 w-100 form-control" onChange={(e)=>{setPhone(e.target.value)}}  type="number" placeholder="Phone" required/>
                    </div>

                    <div className="mt-3">
                      <input className="mx-1 px-4 py-2 w-100 form-control" onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" required/>
                    </div>

                    <div className="mx-auto d-block">

                    <button className="w-100 mt-3 btn bg-primary text-white" type="submit">Daftar</button> 
                    </div>

                  </form>
                    <p className="text-center mt-2">Sudah punya akun? <span><button className="bg-transparent border-0 text-black"   data-bs-dismiss="modal" >Login</button></span></p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </nav>
    </div>
    {isLogin?
          <>
          <div className={"notif-dropdown "+(showNotif?"":"d-none")}>
            {
              listNotification.length<1?
              <div className="notif-list">
              <p className="notif-title">
                Tidak ada notifikasi untuk saat ini
              </p>
            </div>:
              listNotification.map(t=><>
                <div className="notif-list" onClick={()=>navigate(t.url)}>
                  <div className="notif-title">{t.title}</div>
                  <div className="notif-subtitle">{t.subtitle}</div>
                </div>
              </>)
            }
            
          </div></>
          :<></>}
    </>
  );
}

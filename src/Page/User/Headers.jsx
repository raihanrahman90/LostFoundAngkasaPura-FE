import React,{useState, useEffect} from "react";
import Logo from "../../Asset/logo.png";
import { BsBell } from "react-icons/bs";
import '../../Asset/user.css'
import { Link, useNavigate } from 'react-router-dom';
import {login} from '../../Hooks/User/Default';
import Cookies from "js-cookie";

export default function Headers() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState();
  let navigate = useNavigate()
  

 const handleLogin = async (e) => { 
  console.log("sampai sini");
  console.log("sampai sini");
  login({email:email, password:password})
  .then((e)=>{
    console.log(e);
    if(e.statusCode == 200){
      setErrorLogin(null);
      Cookies.set("token", e.data);
      navigate("/");
      console.log("sampai sini");
    }else{
      setErrorLogin(e.message);
    }
  })
  .catch((e)=>{
    setErrorLogin(e.response.data.data);
  });
}

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid py-3">
          <a class="navbar-brand ms-5" href="#">
            <img src={Logo} height={70} />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item ms-5">
                <Link class="nav-link active fw-bold" aria-current="page" to="/">
                  Beranda
                </Link>
              </li>
              <li class="nav-item ms-5">
                <Link class="nav-link fw-bold" href="#">
                  List Claim
                </Link>
              </li>
              <li class="nav-item ms-5">
                <Link class="nav-link fw-bold" to="/Barang">
                  List Barang
                </Link>
              </li>
            </ul>
            <div class="d-flex">
              <BsBell size={30} className="me-5 mt-1"  />
              <button type="button" class="btn bg-danger text-white pe-5 ps-5 me-5"  data-bs-toggle="modal" data-bs-target="#exampleModal">
              Login
            </button>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <input className="mx-1 px-4 py-2 w-100 " onChange={(e)=>{setEmail(e.target.value)}}  type="email" placeholder="Alamat Email" required/>
                    </div>

                    <div className="mt-3">
                      <input className="mx-1 px-4 py-2 w-100" onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" required/>
                    </div>

                    <p className="mt-3"><a href="#"> Lupa password </a></p>

                    <div className="mx-auto d-block">

                    <button className="w-100 mt-3 btn bg-primary text-light" type="submit">Login</button>
                    <p className="text-center mt-2">Belum punya akun? <span><a href="#">Daftar</a></span></p>
                    </div>

                  </form>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

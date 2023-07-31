import React,{useState, useEffect} from "react";
import Logo from "../../Asset/logo.png";
import { BsBell } from "react-icons/bs";
import '../../Asset/user.css'
import { useNavigate } from 'react-router-dom';


export default function Headers() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate()
  

 const handleLogin = (e) => { 
  e.preventDefault();
  if(email === "user" && password === "user"){
    navigate("/")
 }



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
                <a class="nav-link active fw-bold" aria-current="page" href="#">
                  Beranda
                </a>
              </li>
              <li class="nav-item ms-5">
                <a class="nav-link fw-bold" href="#">
                  List Claim
                </a>
              </li>
            </ul>
            <form class="d-flex">
              <BsBell size={30} className="me-5 mt-1"  />
              <button type="button" class="btn bg-danger text-light pe-5 ps-5 me-5"  data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                  <div class="modal-body">

                    <div>
                      <img src={Logo} className="mx-auto d-flex my-3" height={50} alt="" />
                    </div>

                    <h5 className="mb-3">Login</h5>
                    <div>
                    <input className="px-4 py-2 w-100 " onChange={(e)=>{setEmail(e.target.value)}}  type="email" placeholder="Alamat Email" />
                    </div>

                    <div className="mt-3">
                      <input className="px-4 py-2 w-100" onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" />
                    </div>

                    <p className="mt-3"><a href="#"> Lupa password </a></p>

                    <div className="mx-auto d-block">

                    <button className="w-100 mt-3 btn bg-primary text-light" data-bs-dismiss="modal" type="button"  onClick={handleLogin}>Login</button>
                    <p className="text-center mt-2">Belum punya akun? <span><a href="#">Daftar</a></span></p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

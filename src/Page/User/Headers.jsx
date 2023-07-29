import React from "react";
import Logo from "../../Asset/logo.png";
import { BsBell } from "react-icons/bs";
import '../../Asset/user.css'

export default function Headers() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
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
              <button class="btn bg-danger text-light pe-5 ps-5 me-5" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

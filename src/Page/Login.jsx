import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../Asset/logo.png";
import "../Asset/style.css";

export default function Login() {
  return (
    <>
      <div className="bgHome">
        {/* kasih ketengah */}
        <div
          className="d-flex justify-content-center align-items-center   "
          style={{ height: "100vh" }}
        >
          <div className="flex-column bg-light py-5 px-3 rounded">
            {/* img center */}

            <img
              src={logo}
              width={70}
              height={70}
              className="mx-auto d-block "
            />
            <p className="fw-bold">Login</p>
            <input
              className="inputs border border-secondary mb-2"
              type="text"
              placeholder="Username"
            />
            <br />
            <input
              className="inputs border border-secondary mb-2 "
              type="password"
              placeholder="Password"
            />
            <br />
            <a className="pb-5" href="#">
              Lupa Password
            </a>
            <br />
            <br />
            <button
              style={{ paddingLeft: "5%", paddingRight: "5%" }}
              className="mx-auto d-block text-white rounded py-2 border-0 fw-bold"
            >
              Login
            </button>
            <a href="">
              <p className="regis text-center pt-3 " style={{ color: "grey" }}>
                Belum Punya Akun ?{" "}
                <span style={{ color: "#138FC7" }}>Daftar</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

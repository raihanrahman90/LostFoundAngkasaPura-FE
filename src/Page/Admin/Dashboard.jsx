import React from "react";
import Navbar from "./Navbar";
import { Chart } from "./Chart";
import add_alert from "../../Asset/add_alert.png";
import lab_profile from "../../Asset/lab_profile.png";
import check_circle from "../../Asset/check_circle.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  return (
    <div className="bgDashboard">
      <div className="row  pt-5 pb-5">
        <div className="col-lg-2 col-md-3 col-sm-4">
          <Navbar />
        </div>

        <div
          className="col-lg-10 col-md-9 col-sm-8 pt-5"
          style={{ backgroundColor: "white", borderRadius: "30px" }}
        >
          <div className="d-flex justify-content-between">
            <h1>Dashboard</h1>
          </div>
          <div className="row pt-4">
          <div className="col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center  mb-2">
              <div className="bg-primary px-5 rounded d-flex justify-content-center "  >
                <img src={add_alert} alt="" />
                <div>
                  <h3>Customer Report</h3>
                  <h3></h3>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center  mb-2">
              <div className="bg-danger px-5 rounded d-flex justify-content-center "  >
                <img src={lab_profile} alt="" />
                <div>
                  <h3>Customer Report</h3>
                  <h3></h3>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center  mb-2">
              <div className="bg-success px-5 rounded d-flex justify-content-center " >
                <img src={check_circle} alt="" />
                <div>
                  <h3>Complete Case</h3>
                  <h3>30</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button className="border border-0 bg-primary text-white px-3 border-dark text-dark me-3 fw-bold  rounded py-2">
              Download Report
            </button>
          </div>
          <div
            className="
            d-flex
            justify-content-center
            align-items-center
            mb-5
            "
            style={{ width: "100%", height: "400px" }}
          >
            <Chart />
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
}

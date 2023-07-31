import React from "react";
import Navbar from "./Navbar";
import { Chart } from "./Chart";
import add_alert from "../../Asset/add_alert.png";
import lab_profile from "../../Asset/lab_profile.png";
import check_circle from "../../Asset/check_circle.png";
import 'bootstrap/dist/css/bootstrap.min.css';


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
          <button className="border border-0 bg-primary text-white px-3 border-dark text-dark me-3 fw-bold mb-2 rounded">Download Report</button>

          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center bg-primary mb-4">
              <img src={add_alert} alt="" />
              <div>
                <h3>Found Item</h3>
                <h3>30</h3>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center bg-danger mb-4">
              <img src={lab_profile} alt="" />
              <div>
                <h3>Customer Report</h3>
                <h3>30</h3>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center bg-success mb-4">
              <img src={check_circle} alt="" />
              <div>
                <h3>Complete Case</h3>
                <h3>30</h3>
              </div>
            </div>
          </div>

          <div className="mx-auto d-block" style={{ width: "70%", height: "70%" }}>
            <Chart />
          </div>

          <div>
            {/* create button download exel dengan posisi tengah */}
          </div>
        </div>
      </div>
    </div>
  );
}

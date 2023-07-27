import React from "react";
import Navbar from "./Navbar";
import { Chart } from "./Chart";
import add_alert from "../../Asset/add_alert.png";
import lab_profile from "../../Asset/lab_profile.png";
import check_circle from "../../Asset/check_circle.png";

export default function Dashboard() {
  return (
    <div className="bgDashboard">
      <div className="row  pt-5 pb-5">
        <div className="col-2 ">
          <Navbar />
        </div>

        <div
          className="col-10 pt-5  "
          style={{ backgroundColor: "white", borderRadius: "30px" }}
        >
          <h1>Dashboard</h1>
          <div className="row">
            <div className="col-4 d-flex justify-content-center bg-primary ">
              <img src={add_alert} alt="" />
              <div>
                <h3>Found Item</h3>
                <h3>30</h3>
              </div>
            </div>

            <div className="col-4 d-flex justify-content-center bg-danger">
              <img src={lab_profile} alt="" />
              <div>
                <h3>Customer Report</h3>
                <h3>30</h3>
              </div>
            </div>

            <div className="col-4 d-flex justify-content-center bg-success  ">
              <img src={check_circle} alt="" />
              <div>
                <h3>Complate Case</h3>
                <h3>30</h3>
              </div>
            </div>
          </div>

          <div
            className=" mx-auto d-block"
            style={{ width: "70%", height: "70%" }}
          >
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
}

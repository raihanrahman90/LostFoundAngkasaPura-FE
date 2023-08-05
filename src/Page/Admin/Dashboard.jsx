import React from "react";
import Navbar from "./Navbar";
import { Chart } from "./Chart";
import add_alert from "../../Asset/add_alert.png";
import lab_profile from "../../Asset/lab_profile.png";
import check_circle from "../../Asset/check_circle.png";

export default function Dashboard() {
  return (
    <div className="bgDashboard">
      <div className="row pt-5 pb-5 mx-2">
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
          <div className="row pt-4 text-white mb-2 h-200px">
            <div className="col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center py-3 px-3 h-100">
              <div className="bg-primary row">
                <img src={add_alert} alt="" class="col-6"/>
                <div className="col-6">
                    <h3>Found Item</h3>
                    <h3>23</h3>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center py-3 px-2 h-100">
              <div className="bg-danger row w-100">
                <div className="col-6 justify-content-end">
                  <img src={lab_profile} alt="" class="h-100 w-36 h-auto my-auto"/>
                </div>
                <div className="col-3">
                  <h5>Customer Report</h5>
                  <h5>23</h5>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center py-3 px-3 h-100">
              <div className="bg-success row">
                <img src={check_circle} alt="" class="col-6"/>
                <div className="col-6">
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

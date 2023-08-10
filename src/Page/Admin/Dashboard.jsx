import React, {useState, useEffect} from "react";
import { Chart } from "./Chart";
import add_alert from "../../Asset/add_alert.png";
import lab_profile from "../../Asset/lab_profile.png";
import check_circle from "../../Asset/check_circle.png";
import {AdminDefault} from './AdminDefault';
import axios from "axios";
import Cookies from "js-cookie";

export default function Dashboard() {

  const [datas, setDatas] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [labels , setLabels] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get("http://103.150.92.47:8081/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setDatas(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = [
    {text:"Found Item", count:datas.foundCount, color:"bg-primary", icon:add_alert},
    {text:"Customer Report", count:datas.closedCount, color:"bg-danger", icon:lab_profile},
    {text:"Complete Case", count:datas.claimCount, color:"bg-success", icon:check_circle}
  ]
  return (
    <AdminDefault 
     title={"Dashboard"}
     body={
      <>
        <div className="row pt-4 text-white">
        {
            data.map((data,index)=>{
              return <div key={index} className="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-center mb-2 col-12">
                <div className={"px-5 py-3 rounded d-flex justify-content-center align-middle w-100 row "+data.color} >
                  <div className="col-4 justify-content-center align-middle inline-block d-flex">
                    <img src={data.icon} alt="" width={72} className="align-self-center"/>
                  </div>
                  <div className="col-8 py-2 d-flex">
                    <div className="align-self-center">
                      <h6>{data.text}</h6>
                      <h4>{data.count}</h4>
                    </div>
                  </div>
                </div>
              </div>
            })
          }
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
              style={{ width: "100%", height: "600px" }}
            >
              <Chart  />
            </div>
        </>
     }
    />
  );
}

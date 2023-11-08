import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import axios from "axios";
import Cookies from "js-cookie";
import { downloadExcel } from "../../Hooks/Admin/Admin";
import fileDownload from "js-file-download";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Chart() {
  const [datasets, setDatasets] = useState([]);
  const [labels, setLabels] = useState([]);
  var year = new Date().getFullYear();
  const [startDate, setStartDate] = useState(year+"-01");
  const [endDate, setEndDate] = useState(year+"-12");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        //   text: 'Chart.js Line Chart',
      },
    },
  };

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const handleTanggal = (e) => {
    e.preventDefault();
    fetchData();
  };
  const fetchData = (e)=>{
    const token = Cookies.get("token");
    axios
      .get(
        `${BASE_URL}/admin/dashboard/grafik?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("ini jalankok")
        setDatasets(res.data.data.datasets);
        setLabels(res.data.data.labels);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(()=>{
    fetchData();
  },[])
  // const clickDownload = ()=>{
  //   downloadExcel({startDate:startDate,endDate:endDate})
  //   .then((e)=>{
  //     fileDownload(e, 'Lost found.xlsx');
  //   });
  // }

  const clickDownload = () => {
    const token = Cookies.get("token");
    axios
      .get(`${BASE_URL}/admin/dashboard/download?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob"
      })
      .then(response => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.xlsx'; // Nama file yang akan diunduh
        a.click();
      });

      
  }
  

  return (
    <>
      <div className="row">
        <div className="col-md-2 col-12">
          <form onSubmit={handleTanggal} className="mt-5">
            <div className="w-100">
              <label htmlFor="" className="w-100 text-dark">
                Start Date
              </label>
                <input
                  type="month"
                  className="w-100 px-5 py-2 rounded mb-3"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />

              <label htmlFor="" className="w-100 text-dark">End Date</label>
              <input
                type="month"
                className="w-100 px-5 py-2 rounded mb-3"
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="border border-0 bg-primary text-white px-3 border-dark text-dark me-3 fw-bold  rounded py-2 w-100"
            >
              Set Tanggal
            </button>
            <button className="btn btn-primary text-white w-100 mt-1 fw-bold" onClick={clickDownload}>
              Download CSV
            </button>
          </form>
        </div>

        <div className="w-md-75 h-100 col-12 col-md-10 d-flex justify-content-center">
          <div className="w-100">
            <Line options={options} data={data}/>
          </div>
        </div>
      </div>
    </>
  );
}

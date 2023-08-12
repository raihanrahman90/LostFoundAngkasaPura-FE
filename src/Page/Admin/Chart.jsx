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
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-12-31");

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

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get(
        "http://103.150.92.47:8081/admin/dashboard/grafik?startDate=2023-01-01&endDate=2023-12-31",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDatasets(res.data.data.datasets);
        setLabels(res.data.data.labels);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTanggal = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    axios
      .get(
        `http://103.150.92.47:8081/admin/dashboard/grafik?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDatasets(res.data.data.datasets);
        setLabels(res.data.data.labels);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-2 col-12">
          <form onSubmit={handleTanggal} className="mt-5">
            <div className="w-100">
              <label htmlFor="" className="w-100">
                Start
                <input
                  type="month"
                  className="w-100 px-5 py-2 rounded mb-3"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </label>

              <label htmlFor="" className="w-100">
                End
                <input
                  type="month"
                  className="w-100 px-5 py-2 rounded mb-3"
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </label>
            </div>
            <button
              type="submit"
              className="border border-0 bg-primary text-white px-3 border-dark text-dark me-3 fw-bold  rounded py-2 w-100"
            >
              Set Tanggal
            </button>
            <button className="btn btn-primary text-white w-100 mt-1 fw-bold">
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

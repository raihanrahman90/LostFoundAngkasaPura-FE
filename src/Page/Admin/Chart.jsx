import { useState, useEffect } from "react";
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
import { getDataChart,downloadChart } from "../../Hooks/Admin/Chart";

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

  const fetchData = ()=>{
    getDataChart(startDate,endDate).then((res)=>{
      setDatasets(res.data.datasets);
      setLabels(res.data.labels);
    })
  }

  useEffect(()=>{
    fetchData();
  },[])

  const clickDownload = () => {
    downloadChart(startDate, endDate)
      .then(response => {
        alert(response)
        const blob = new Blob([response], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'LostFound.xlsx'; // Nama file yang akan diunduh
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

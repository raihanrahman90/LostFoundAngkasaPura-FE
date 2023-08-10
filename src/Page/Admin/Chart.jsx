import React,{useState, useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
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
  const [labels , setLabels] = useState([]);
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

  // console.log(datasets)

  const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    //   text: 'Chart.js Line Chart',
    },
  },
};
 
const data = {
  labels : labels,
  datasets: datasets,
};


  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get("http://103.150.92.47:8081/admin/dashboard/grafik?startDate=2023-01-01&endDate=2023-12-31", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDatasets(res.data.data.datasets);
        setLabels(res.data.data.labels);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <Line options={options} data={data} />;
}

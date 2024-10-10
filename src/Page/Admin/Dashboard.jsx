import {useState, useEffect} from "react";
import { Chart } from "./Chart";
import {AdminDefault} from './AdminDefault';
import {GoReport} from 'react-icons/go';
import {AiOutlineCheckCircle,AiOutlineMail,AiOutlineSearch} from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import {getDataDashboard} from "../../Hooks/Admin/Dashboard"; 
export default function Dashboard() {

  const [datas, setDatas] = useState([]);
  var navigate = useNavigate();

  useEffect(() => {
    getDataDashboard()
    .then((e)=>{
      setDatas(e.data);
    })
    .catch((err) => {
      if(err.response.status==401){
        navigate("/admin");
      }
    });
  });

  console.log(datas);

  const data = [
    {text:"Found Item", count:datas.foundCount, color:"bg-primary", icon:<AiOutlineSearch size={'5em'}/>},
    {text:"Waiting Claim", count:datas.waitingCount, color:"bg-warning", icon:<GoReport size={'5em'}/>},
    {text:"Claim Count", count:datas.claimCount, color:"bg-success", icon:<AiOutlineMail size={'5em'}/>},
    {text:"Complete Report", count:datas.closedCount, color:"bg-danger", icon:<AiOutlineCheckCircle size={'5em'}/>},
  ]
  return (
    <AdminDefault 
     title={"Dashboard"}
     body={
      <>
        <div className="row pt-4 text-white">
          <div className="col-12 row">
        {
            data.map((data,index)=>{
              return <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-12 d-flex justify-content-center mb-2 ">
                <div className={"px-lg-2 px-md-2 py-3 rounded d-flex justify-content-center align-middle w-100 row "+data.color} >
                  <div className="col-4 justify-content-center align-middle inline-block d-flex align-item-center">
                    {data.icon}
                  </div>
                  <div className="col-8 d-flex">
                    <div className="align-self-center">
                      <h6>{data.text}</h6>
                      <h4>{data.count}</h4>
                    </div>
                  </div>
                </div>
              </div>
            })
          }</div>
            <div
              className="
              d-flex
              justify-content-center
              mb-5
              col-12
              "
              style={{ width: "100%", height: "600px" }}
            >
              <Chart  />
            </div>
            
        </div>
        </>
     }
    />
  );
}

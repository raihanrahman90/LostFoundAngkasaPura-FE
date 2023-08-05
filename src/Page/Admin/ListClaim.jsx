import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import ListData from "./ListData";
import { AdminDefault } from "./AdminDefault";

export default function ListClaim() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null); // State untuk data yang akan diedit

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get(
        "http://103.150.92.47:8081/Admin/Item-Claim",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.data.data);
        setData(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <AdminDefault
      title={"Detail Claim"}
      body={
        <div className="container">
          {data.map((item, index) => (
            <ListData
              key={index}
              id={item.itemFoundId}
              name={item.name}
              status={item.status}
              claimDate={item.claimDate}
              description={item.description}
              image={item.image}
              itemFoundId={item.itemFoundId}
              itemLostId={item.itemLostId}
              userId={item.userId}
            />
          ))}
        </div>}/>
);
}
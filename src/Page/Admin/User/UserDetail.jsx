import React, { useEffect, useState } from "react";
import { AdminDefault } from "../AdminDefault";
import { useParams } from "react-router-dom";
import { getDetailUser } from "../../../Hooks/Admin/User";

export default function UserDetail() {
  // const location = useLocation();
  const routeParams = useParams();
  const userId = routeParams["id"];
  const [data, setData] = useState("");
  useEffect(() => {
    console.log(userId)
    getDetailUser(userId)
    .then((e)=>{
        setData(e.data);
    })        
  }, []);
  // console.log(from);
  return (
    <AdminDefault
      title="Detail User"
      body={
        <>
        <div className="row"> 
          <div className="container rounded border mt-3 col-12 col-md-6">
            <div className="pb-2 fw-bold form__group w-100">
              <input
                value={data.name}
                type="text"
                className="form__field"
                id="name"
                disabled
              />
              <label className="form__label" htmlFor="name">Nama</label>
            </div>
            <div className="pb-2 fw-bold form__group w-100">
              <input
                value={data.phone}
                type="text"
                className="form__field"
                id="category"
                disabled
              />
              <label className="form__label" htmlFor="category">No. HP</label>
            </div>
            <div className="pb-2 fw-bold form__group w-100">
              <input
                value={data.email}
                type="text"
                className="form__field"
                id="status"
                disabled
              />
              <label className="form__label" htmlFor="status">Email</label>
            </div>
            
          </div>
        </div>

        </>
      }
    />
  );
}
import React from "react";
import Navbar from "./Navbar";

export const AdminDefault = ({title, body}) =>{

  return (
    <div className="bg-secondary h-100 roboto shadow admin">
      <div className="row h-100 px-0">
        <div className="col-lg-2 col-md-3 col-sm-4 px-0">
          <Navbar />
        </div>

        <div
          className="col-lg-10 col-md-9 col-sm-8 py-5 bg-white shadow px-5"
        >
          <div className="rounded shadow h-100 p-3">
            <h3>{title}</h3>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}
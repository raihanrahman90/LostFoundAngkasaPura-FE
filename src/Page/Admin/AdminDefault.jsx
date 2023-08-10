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
          className="col-lg-10 col-md-9 col-sm-8 bg-white shadow px-0">
          <div className="shadow" id="navbar">
            
          </div>
          <div className="rounded shadow px-5 my-3 mx-3 admin-main py-3">
            <h4>{title}</h4>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import Navbar from "./Navbar";

export const AdminDefault = ({title, body}) =>{

  return (
    <div className="bg-secondary h-100 px-3 roboto shadow admin">
      <div className="row pt-5 pb-5 h-100">
        <div className="col-lg-2 col-md-3 col-sm-4">
          <Navbar />
        </div>

        <div
          className="col-lg-10 col-md-9 col-sm-8 pt-5 bg-white rounded"
        >
          <div className="d-flex justify-content-between row">
            <h3>{title}</h3>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}
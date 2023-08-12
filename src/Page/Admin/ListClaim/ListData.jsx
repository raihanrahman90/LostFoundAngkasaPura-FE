import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function ListData({
  id,
  name,
  status,
  claimDate,
  itemFoundId,
}) {

  const datanavigate = {
    id  : id,
    itemFoundId : itemFoundId 
  }
 

  return (
    <div>
      <div className="border rounded p-3 mb-3 me-5 d-flex justify-content-between">
        <div className="row">
          <div className="col-4">Nama Barang</div>
          <div className="col-8">: {name}</div>
          <div className="col-4">Status</div>
          <div className="col-8">: {status}</div>
          <div className="col-4">Tanggal Claim</div>
          <div className="col-8">: {claimDate}</div>
        </div>
        <div className="d-flex justify-content-center my-auto">
          <Link
            className="btn btn-primary text-white"
            to={"/admin/DetailClaim"}
            state={{ from: datanavigate,  }}>
          
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}

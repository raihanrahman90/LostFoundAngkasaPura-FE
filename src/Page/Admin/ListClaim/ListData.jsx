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
  const tolakHandle = async () => {
    console.log("ini id",id)
    try {
      const token = Cookies.get('token');
      const response = await axios.post(
        `http://103.150.92.47:8081/Admin/Item-Claim/${id}/reject`,
        {
          rejectReason: 'JELEK BETUL EH FOTOMU',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Tolak response:', response.data);

    } catch (error) {
      console.error('Tolak error:', error);

    }
  };

  const terimaHandle = async () => {
    console.log("ini id",id)
    try {
      const token = Cookies.get('token');
      const response = await axios.post(
        `http://103.150.92.47:8081/Admin/Item-Claim/${id}/approve`,
        {
          claimLocation: "Gate 8",
          claimDate: "2023-07-31T06:54:27.031Z"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Claim Di teirma', response.data);
      alert("Claim Di Terima")

    } catch (error) {
      console.error('Tolak error:', error);

    }
  };

  

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
          <button className="btn btn-success me-1 text-white" onClick={terimaHandle}>Terima</button>
          <button onClick={tolakHandle} className="btn btn-danger me-1 text-white">
            Tolak
          </button>
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

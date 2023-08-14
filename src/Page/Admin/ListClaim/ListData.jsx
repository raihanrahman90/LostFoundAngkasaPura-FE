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
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  

  const datanavigate = {
    id  : id,
    itemFoundId : itemFoundId 
  }
  const tolakHandle = async () => {
    console.log("ini id",id)
    try {
      const token = Cookies.get('token');
      const response = await axios.post(
        `${BASE_URL}/Admin/Item-Claim/${id}/reject`,
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
        `${BASE_URL}/Admin/Item-Claim/${id}/approve`,
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
      alert(error.response.data.data);
    }
  };

  

  return (
    <tr>
      <td>{name}</td>
      <td>{claimDate}</td>
      <td>{
        (status=="Rejected"?
          <span className='badge bg-secondary'>Rejected</span>:
        status=="Approved"?
          <span className='badge bg-success'>Approved</span>:
        status=="Confirmation"?
          <span className='badge bg-warning'>Confirmation</span>:<></>)
      }</td>
      <td>
        <Link
          className="btn btn-primary text-white"
          to={"/admin/ItemClaim/"+id}
          state={{ from: datanavigate,  }}>
          Detail
        </Link>
      </td>
    </tr>
  );
}

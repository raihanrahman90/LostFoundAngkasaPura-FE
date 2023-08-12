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
      alert(error.response.data.data);
    }
  };

  

  return (
    <tr>
      <td>{name}</td>
      <td>{claimDate}</td>
      <td>{status}</td>
      <td>
        <Link
          className="btn btn-primary text-white"
          to={"/admin/DetailClaim/"+id}
          state={{ from: datanavigate,  }}>
        
          Detail
        </Link>
      </td>
    </tr>
  );
}

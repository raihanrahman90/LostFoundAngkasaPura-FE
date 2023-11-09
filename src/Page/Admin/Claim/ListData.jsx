import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Status } from '../../../Constants/Status';
import { statusBadge } from '../../../Util/Utils';

export default function ListData({
  id,
  name,
  itemFoundStatus,
  status,
  claimDate,
  itemFoundId,
}) {
  const datanavigate = {
    id  : id,
    itemFoundId : itemFoundId 
  }
  return (
    <tr>
      <td>{name}</td>
      <td>{claimDate}</td>
      <td>{statusBadge(itemFoundStatus)}</td>
      <td>{statusBadge(status)}</td>
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

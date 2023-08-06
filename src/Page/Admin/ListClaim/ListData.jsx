import React from 'react';
import { Link } from 'react-router-dom';

export default function ListData({
  id,
  name,
  status,
  claimDate,
}) {

  return (
    <div>
      <div className="border rounded p-3 mb-3 me-5 d-flex justify-content-between">
        <div className="row">
          <div className="col-4">
            Nama Barang
          </div>
          <div className="col-8">
            : {name}
          </div>
          <div className="col-4">
            Status 
          </div>
          <div className="col-8">
            : {status}
          </div>
          <div className="col-4">
            Tanggal Claim  
          </div>
          <div className="col-8">
            : {claimDate}
          </div>
        </div>
        <div className='d-flex justify-content-center my-auto'>
          <button className="btn btn-success me-1 text-white">
            Terima
          </button>
          <button className="btn btn-danger me-1 text-white">
            Tolak
          </button>
          <Link
            className="btn btn-primary text-white"
            to="/admin/DetailClaim"
            state={{ from : id}}
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}

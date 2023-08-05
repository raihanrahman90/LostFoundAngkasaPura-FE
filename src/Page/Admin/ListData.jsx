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
        <div className="d-flex">
          <p>
            id : <br />
            {id}
          </p>
          <p className="ms-5">
            Nama Barang : <br />
            {name}
          </p>
          <p className="ms-5">
            Status : <br />
            {status}
          </p>
          <p className="ms-5 ">
            Tanggal Claim : <br />
            {claimDate}
          </p>
        </div>
        <div>
          <button className="border border-0 pb-2 bg-success text-white px-3 border-dark text-dark me-3 fw-bold pt-2 rounded text-decoration-none">
            Terima
          </button>
          <button className="border border-0 pb-2 bg-danger text-white px-3 border-dark text-dark me-3 fw-bold pt-2 rounded text-decoration-none">
            Tolak
          </button>
          <Link
            className="border border-0 pb-2 bg-secondary text-white px-3 border-dark text-dark me-3 fw-bold pt-2 rounded text-decoration-none"
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

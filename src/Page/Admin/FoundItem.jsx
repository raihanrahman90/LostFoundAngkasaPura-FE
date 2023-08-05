import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

export default function FoundItem() {
  const [data, setData] = useState([]);
  const [kategori, setKategori] = useState("");
  const [tgl, setTgl] = useState("");
  const [valueKategori, setValueKategori] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);


  const handleKategori = (e) => {
    setKategori(e.target.value);
  }

  const handleTgl = (e) => {
    setTgl(e.target.value);
  }

  const fetchDataWithFilters = async () => {
    const url = `http://103.150.92.47:8081/Admin/Item-Found?foundDate=${tgl}&category=${kategori}`;
    const token = Cookies.get("token");
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.data.data);

      setTotalPages(Math.ceil(res.data.data.totalItems / res.data.data.itemsPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataPagination = async (page) => {
    const url = `http://103.150.92.47:8081/Admin/Item-Found?page=${page}`;
    const token = Cookies.get("token");
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.data.data);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    axios.get("http://103.150.92.47:8081/Admin/Item-Found", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setData(res.data.data.data);
      setPage(res.data.data.total);
      setTotalPages(Math.ceil(res.data.data.totalItems / res.data.data.itemsPerPage));
      // setPage(1);
      // console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

    axios.get("http://103.150.92.47:8081/Admin/Item-Found/Category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setValueKategori(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  return (
    <div className="bgDashboard">
      <div className="row pt-5 pb-5">
        <div className="col-lg-2 col-md-3 col-sm-4 ">
          <Navbar />
        </div>

        <div
          className="col-md-10 pt-5 "
          style={{ backgroundColor: "white", borderRadius: "30px" }}
        >
          <h1 className="pb-5 ">Found Item</h1>
          <div className="d-flex justify-content-end pb-4">
            {/* Filter Modal */}
            {/* ... (Modal button and content) */}
            
            {/* Add New Item Link */}
            <Link
              className="border border-0 bg-primary text-white px-3 pb-2 border-dark text-dark me-3 fw-bold pt-2 rounded text-decoration-none"
              to="/admin/AddItem"
            >
              ADD NEW ITEM
            </Link>
          </div>
          <div className="table">
            <table className="table table-bordered pt-5">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Nama Barang</th>
                  <th>Kategori</th>
                  <th>Tanggal Ditemukan</th>
                  <th>Status</th>
                  <th>Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.foundDate}</td>
                    <td>{item.status}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <nav aria-label="Page navigation example">
            <ul className="pagination float-start">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link bg-primary text-white"
                  onClick={() => fetchDataPagination(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              <li>
              <div className="text-center text-white rounded bg-primary py-2">
                          Page {currentPage} of {page}
                        </div>
              </li>
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link bg-primary text-white"
                  onClick={() => fetchDataPagination(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
          
        </div>
      </div>
    </div>
  );
}

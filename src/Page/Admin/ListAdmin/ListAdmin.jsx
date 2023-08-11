import React, { useState, useEffect } from "react";
import { AdminDefault } from "../AdminDefault";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';

export default function ListAdmin() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://103.150.92.47:8081/admin/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data.data);
      setTotalPages(res.data.data.pageTotal);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get("token");
      console.log(id);
      const response = await axios.delete(`http://103.150.92.47:8081/admin/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      alert("Berhasil menghapus admin");
      fetchData();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      alert("Gagal menghapus admin");
    }
  };
  
  const nextButton = async ()=>{
    setCurrentPage(currentPage+1);
  }
  const prevButton = ()=>{
    setCurrentPage(currentPage-1);
  }
  return (
    <AdminDefault
      title={"List Admin"}
      body={
        <>
          <div className="mt-5">
            <div className="w-100">
              <Link to="/Admin/CreateAdmin" className="btn btn-primary text-white float-right">Add Admin</Link>
            </div>
            <div className="mt-2 table">
              <table className="w-100 table-bordered pt-5 rounded">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Access</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.access}</td>
                      <td><button className="bg-danger text-white btn" onClick={() => handleDelete(item.id)}>Hapus</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
             {/* Pagination */}
          <nav aria-label="pagination" className="d-flex">
                <button
                  className={`page-item ${currentPage === 1 ? 'disabled' : ''} text-secondary`}
                  onClick={prevButton}
                  disabled={currentPage === 1}
                >{"<"}
                </button>
                <div className="text-center d-flex justify-content-center my-auto">
                  Page {currentPage} of {totalPages}
                </div>     
                <button
                  className={`page-item ${currentPage === totalPages ? 'disabled' : ''} float-end text-secondary`}
                  onClick={nextButton}
                  disabled={!hasMore}
                >
                  {">"}
                </button>
          </nav>
          </div>
        </>
      }
    />
  );
}

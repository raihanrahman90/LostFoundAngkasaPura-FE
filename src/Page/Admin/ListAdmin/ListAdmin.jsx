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
  const [categoryAdmin, setCategoryAdmin] = useState("Admin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, [currentPage]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const fetchData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(`${BASE_URL}/admin/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data.data);
      setTotalPages(response.data.data.pageTotal);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get("token");
      console.log(id);
      const response = await axios.delete(`${BASE_URL}/admin/admin/${id}`, {
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

  // /admin/admin?name=raihan&email=09&access=SuperAdmin
  
  const handleAdmin = async () => {
    console.log(name, email, categoryAdmin)
    try{
      const token = Cookies.get("token");
      const response = await axios.get(`${BASE_URL}/admin/admin?name=${name}&email=${email}&access=${categoryAdmin}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.data.data);
      setData(response.data.data.data);
      setTotalPages(response.data.data.pageTotal);
    }catch(e){
      console.log(e);
    }
  }
  return (
    <AdminDefault
      title={"List Admin"}
      body={
        <>
          <div className="mt-5">
            <div className="d-flex justify-content-between">

            <div className="w-100">
              <Link to="/Admin/CreateAdmin" className="btn btn-primary text-white float-right">Add Admin</Link>
            </div>
            <button type="button" class="mr-2 me-5 bg-primary text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Filter
          </button>
            </div>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <form class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Filter</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div className="mb-3">
                    <input type="text" className="form-control mb-3" id="Name" placeholder="Name" onChange={(e)=>{setName(e.target.value)}} />
                    <input type="email" className="form-control mb-3" id="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
                    <select className="form-select" id="status" onChange={(e)=> {setCategoryAdmin(e.target.value)}}>
                      <option value="Admin">Admin</option>
                      <option value="SuperAdmin">Super Admin</option>
                    </select>
                  </div>
                  {/* End of Form filter */}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" onClick={handleAdmin}  class="btn btn-primary text-white" data-bs-dismiss="modal">Apply Filters</button>
                </div>
              </form>
            </div>
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

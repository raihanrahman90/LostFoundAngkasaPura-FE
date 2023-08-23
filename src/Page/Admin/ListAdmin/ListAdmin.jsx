import React, { useState, useEffect } from "react";
import { AdminDefault } from "../AdminDefault";
import { getListAdmin } from "../../../Hooks/Admin/Admin"; 
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';
import jwt from "jsonwebtoken";



export default function ListAdmin() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);


  const jwtToken = () => {
    const token = Cookies.get("token");
    // const decoded = decode(token);
    // console.log(decoded);
  }

  useEffect(() => {
    jwtToken();
  },[])

  const navigate = useNavigate();
  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, [currentPage]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const fetchData = async () => {
    try{
      const response = await getListAdmin({page, name:null,email:null,access:null}); 
      // console.log(response);
      setData(response.data.data);
      setTotalPages(response.data.pageTotal);
      setHasMore(response.data.isHasMore);
    }catch(e){
      if(e.statusCode===401) navigate("admin");
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
      // console.log(response.data);
      alert("Berhasil menghapus admin");
      fetchData();
    } catch (error) {
      if(err.response.status==401){
        navigate("/admin");
      }else{
        alert(err.response.data);
      };
    }
  };
  
  useEffect(() => {}, [data, page]);
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
                      <Link
                        to={`/Admin/DetailAdmin/${item.id}`}
                        className="btn btn-primary text-white"
                      >
                        Detail
                      </Link>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
             {/* Pagination */}
             <div className="d-flex justify-content-center ">
          <button onClick={(e)=>setPage(page-1)} className={page==1?"d-none":""}>{"<"}</button>
          <button disabled className="mx-1">{page}{hasMore}</button>
          <button onClick={(e)=>setPage(page+1)} className={!hasMore?"d-none":""}>{">"}</button>
          </div>
          </div>
        </>
      }
    />
  );
}

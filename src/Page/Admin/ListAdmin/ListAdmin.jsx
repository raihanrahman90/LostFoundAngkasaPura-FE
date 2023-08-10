import React, { useState, useEffect } from "react";
import { AdminDefault } from "../AdminDefault";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';

export default function ListAdmin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://103.150.92.47:8081/admin/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data.data);
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
  
  return (
    <AdminDefault
      title={"List Admin"}
      body={
        <>
          <div className="mt-5">
            <div className="w-100">
              <Link to="/Admin/CreateAdmin" className="btn btn-primary text-white float-right">Add Admin</Link>
            </div>
            <div className="mt-2 rounded border">
              <table className="table table-bordered pt-5 rounded">
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
          </div>
        </>
      }
    />
  );
}

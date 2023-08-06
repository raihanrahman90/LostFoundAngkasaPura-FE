import React, { useState, useEffect } from "react";
import { AdminDefault } from "./AdminDefault";
import axios from "axios";
import Cookies from "js-cookie";

export default function ListAdmin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get("http://103.150.92.47:8081/admin/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.data);
        setData(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    const token = Cookies.get("token");
    axios
      .delete(`http://103.150.92.47:8081/admin/admin?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => {
            console.log(res);
            alert("Berhasil menghapus admin");
            }
        )
        .catch((err) => {
            console.log(err);
            alert("Gagal menghapus admin");
        }
        );

  }

  return (
    <AdminDefault
      title={"List Admin"}
      body={
        <>
          <div className="mt-5">
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
                      {data.map((item, index) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.access}</td>
                            <td><button className="bg-danger" onClick={() => {}} >Hapus</button></td>
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

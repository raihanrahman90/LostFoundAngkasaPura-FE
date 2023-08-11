import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ListData from "./ListData";
import { getListClaim } from "../../../Hooks/Admin/ItemClaim";
import { AdminDefault } from "../AdminDefault";
import { useNavigate } from "react-router-dom";

export default function ListClaim() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null); // State untuk data yang akan diedit
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  let navigate = useNavigate();
  const nextButton = async ()=>{
    setCurrentPage(currentPage+1);
  }
  const prevButton = ()=>{
    setCurrentPage(currentPage-1);
  }
  useEffect(() => {
    const token = Cookies.get("token");
    const getListData = async()=>{
      try{
        let listData = await getListClaim({page:currentPage});
        setData(listData.data.data);
      }catch(e){
        if(e.error ===401){
          navigate("/Admin", -1);
        };
      }
    }
    getListData();
  }, []);
  return (
    <AdminDefault
      title={"List Claim"}
      body={ 
        <div className="">
          <div className="table">
            <table className="table-bordered pt-5 rounded w-100" >
              <thead style={{backgroundColor:"black"}}>
                <tr>
                  <th>Nama Barang</th>
                  <th>Tanggal Claim</th>
                  <th>Status</th>
                  <th>Tindakan</th>
                </tr>
              </thead>
              <tbody>
              {data===null?<></>:data.map((item, index) => (
                <ListData
                  key={index}
                  id={item.id}
                  name={item.name}
                  status={item.status}
                  claimDate={item.claimDate}
                  description={item.description}
                  image={item.image}
                  itemFoundId={item.itemFoundId}
                  itemLostId={item.itemLostId}
                  userId={item.userId}
                />
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
      }/>
);
}
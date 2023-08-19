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
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(1);


  let navigate = useNavigate();
  const nextButton = async ()=>{
    setCurrentPage(currentPage+1);
  }
  const prevButton = ()=>{
    setCurrentPage(currentPage-1);
  }
  const handleFilter = ()=>{

  }
  
  const handleStatus = (e) => {
    setStatus(e.target.value);
  }
  useEffect(() => {
    const token = Cookies.get("token");
    const getListData = async()=>{
      try{
        let listData = await getListClaim({page,status:status});
        console.log(listData);
        setData(listData.data.data);
      }catch(e){
        if(e.error ===401){
          navigate("/Admin", -1);
        };
      }
    }
    getListData();
  }, [status, page]);
  return (
    <AdminDefault
      title={"List Claim"}
      body={ 
        <div className="">
          <button type="button" class="mr-2 me-5 bg-primary text-white ms-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Filter
          </button>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <form class="modal-content" onSubmit={handleFilter}>
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Filter</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div className="mb-3">
                    <label htmlFor="kategori" className="form-label">Status</label>
                    <select className="form-select" id="status" onChange={handleStatus}>
                      <option value="" selected>-</option>
                      <option value="Confirmation">Confirmation</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  {/* End of Form filter */}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </form>
            </div>
          </div>
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
          {/* <nav aria-label="pagination" className="d-flex">
            <button
              className={`page-item ${currentPage === 1 ? 'disabled' : ''} text-secondary`}
              onClick={prevButton}
              disabled={currentPage === 1}
            >{"<"}
            </button>
            <div className="text-center d-flex justify-content-center my-auto">
              Page {currentPage} of {totalPages}
            </div>    
            {currentPage == 1 ? <>
              <div className="d-none">
            <button
              className={`page-item ${currentPage === totalPages ? 'disabled' : ''} float-end text-secondary`}
              onClick={nextButton}
              disabled={!hasMore}
            >
              {">"}
            </button>
              
              </div>
            </> : 
              <button
              className={`page-item ${currentPage === totalPages ? 'disabled' : ''} float-end text-secondary`}
              onClick={nextButton}
              disabled={!hasMore}
            >
              {">"}
            </button>
              
              } 
           
          </nav> */}
          <div className="d-flex justify-content-center ">
          <button onClick={(e)=>setPage(page-1)} className={page==1?"d-none":""}>{"<"}</button>
          <button disabled className="mx-1">{page}{hasMore}</button>
          <button onClick={(e)=>setPage(page+1)} className={!hasMore?"d-none":""}>{">"}</button>
          </div>
        </div>
      }/>
);
}
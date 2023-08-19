import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import { AdminDefault } from "../AdminDefault";

export default function FoundItemList() {
  const [data, setData] = useState([]);
  const [kategori, setKategori] = useState("");
  const [tglStart, setTglStart] = useState("");
  const [tglEnd, setTglEnd] = useState("");
  const [valueKategori, setValueKategori] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [namaBarang, setNamaBarang] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const handleKategori = (e) => {
    setKategori(e.target.value);
  }

  const handleNamaBarang = (e) => {
    setNamaBarang(e.target.value);
    setCurrentPage(1);
  }

  const handleTglStart = (e) => {
    setTglStart(e.target.value);
    setCurrentPage(1);
  }
  const handleTglEnd = (e) => {
    setTglEnd(e.target.value);
    setCurrentPage(1);
  }

  const handleStatus = (e)=>{
    setStatus(e.target.value);
    setCurrentPage(1);
  }
  
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const fetchData= async () => {
    let url = `${BASE_URL}/Admin/Item-Found?page=${page}`;
    if(namaBarang.trim() != ""){
      url = `${url}&name=${namaBarang}`;
    }
    if(tglStart.trim() != ""){
      url = `${url}&foundDateStart=${tglStart}`;
    }
    if(kategori.trim() != ""){
      url = `${url}&category=${kategori}`;
    }
    if(status.trim()!=""){
      url = `${url}&status=${status}`;
    }

    const token = Cookies.get("token");
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      setData(res.data.data.data);
      setTotalPages(res.data.data.pageTotal);
      setHasMore(res.data.data.isHasMore);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(()=>{
    const token = Cookies.get("token");
    axios.get(`${BASE_URL}/Admin/Item-Found/Category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setValueKategori(res.data.data);
      // console.log(res.data.data);
    })
    .catch((err) => {
      if(err.response.status==401){
        navigate("/admin");
      };
    });
  },[])
  useEffect(() => {
    fetchData();
  }, [page, tglStart, tglEnd, kategori, namaBarang, status]);


  return (
    <AdminDefault
      title={"Found Item"}
      body={<>
        <div className="">
          <div className="d-flex justify-content-start pb-4 relative h-100">
            {/* popup filter */}
            <button type="button" class="mr-2 me-5 bg-primary text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Filter
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Filter</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    {/* Form filter */}
                    <div className="mb-3">
                      <label htmlFor="namaBarang" className="form-label">Nama Barang</label>
                      <input type="text" className="form-control" id="namaBarang" onChange={handleNamaBarang} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="kategori" className="form-label">Kategori</label>
                      <select className="form-select" id="kategori"  onChange={handleKategori}>
                        <option value="">--</option>
                        {valueKategori.map((item)=>{
                          return <option value={item.category}>{item.category}</option>
                        })}
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">Status</label>
                      <select className="form-select" id="status"  onChange={handleStatus}>
                        <option value="">--</option>
                        <option value="Found">Found</option>
                        <option value="Confirmed">Confirmed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tgl" className="form-label">Tanggal Ditemukan</label>
                      <input type="date" className="form-control" id="tgl"  onChange={handleTglStart} />
                      <input type="date" className="form-control" id="tgl"  onChange={handleTglEnd} />
                    </div>
                    {/* End of Form filter */}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <Link
              className="btn btn-primary text-white"
              to="/admin/AddItem"
            >
              Add New Item
            </Link>
          </div>
          <div className="table">
            <table className="table-bordered pt-5 rounded w-100" >
              <thead style={{backgroundColor:"black"}}>
                <tr>
                  <th>Nama Barang</th>
                  <th>Kategori</th>
                  <th>Tanggal Ditemukan</th>
                  <th>Status</th>
                  <th>Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  let status=<></>;
                  if(item.status==='Found') status = <div className="badge bg-primary">{item.status}</div>;
                  if(item.status==='Confirmed') status = <div className="badge bg-success">{item.status}</div>;
                    
                  return <>
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.foundDate}</td>
                    <td>{status}</td>
                    <td>
                      <Link
                        className="btn btn-primary text-white"
                        to={"/admin/ItemFound/" + item.id}
                        // state={{from: item}}
                      >
                        View
                      </Link>
                    </td>
                    {/* <td>{item.description}</td> */}
                  </tr></>
                  }
                )}
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
      </>}/>
  );
}

import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import { AdminDefault } from "../AdminDefault";

export default function FoundItemList() {
  const [data, setData] = useState([]);
  const [kategori, setKategori] = useState("");
  const [tgl, setTgl] = useState("");
  const [valueKategori, setValueKategori] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [namaBarang, setNamaBarang] = useState("");


  const handleKategori = (e) => {
    setKategori(e.target.value);
  }

  const handleNamaBarang = (e) => {
    setNamaBarang(e.target.value);
  }

  const handleTgl = (e) => {
    setTgl(e.target.value);
  }
  const nextButton = async ()=>{
    setCurrentPage(currentPage+1);
  }
  const prevButton = ()=>{
    setCurrentPage(currentPage-1);
  }
  const fetchData= async () => {
    let url = `http://103.150.92.47:8081/Admin/Item-Found?page=${currentPage}`;
    if(tgl.trim() != ""){
      url = `${url}&foundData=${tgl}`;
    }
    if(kategori.trim() != ""){
      url = `${url}&category=${kategori}`;
    }

    const token = Cookies.get("token");
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      console.log("isi total page "+res.data.data.pageTotal);
      setData(res.data.data.data);
      setTotalPages(res.data.data.pageTotal);
      setHasMore(res.data.data.isHasMore);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    const token = Cookies.get("token");

    axios.get("http://103.150.92.47:8081/Admin/Item-Found/Category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setValueKategori(res.data.data);
      // console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
    fetchData();
  }, [currentPage, tgl, kategori]);

  const handleFilter = async () => {
    const data = {
      namaBarang: namaBarang,
      kategori: kategori,
      tgl: tgl
    }

    console.log(data);  
  }

  return (
    <AdminDefault
      title={"Found Item"}
      body={<>
        <div className="">
          <div className="d-flex justify-content-end pb-4 relative h-100">
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
                        <option value="">Pilih Kategori</option>
                        {valueKategori.map((item)=>{
                          return <option value={item.category}>{item.category}</option>
                        })}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tgl" className="form-label">Tanggal Ditemukan</label>
                      <input type="date" className="form-control" id="tgl"  onChange={handleTgl} />
                    </div>
                    {/* End of Form filter */}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleFilter}>Apply Filters</button>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <Link
              className="border border-0 bg-primary text-white px-3 pb-2 border-dark text-dark me-3 fw-bold pt-2 rounded text-decoration-none"
              to="/admin/AddItem"
            >
              Add New Item
            </Link>
          </div>
          <div className="table">
            <table className="table table-bordered pt-5 rounded" >
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
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.foundDate}</td>
                    <td><div className="badge bg-primary">{item.status}</div></td>
                    <td>
                      <Link
                        className="btn btn-primary text-white"
                        to={`/admin/ViewDAta/`}
                        state={{ from: item  }}
                        >
                      View
                      </Link>
                    </td>
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
      </>}/>
  );
}

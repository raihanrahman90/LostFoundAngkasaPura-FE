import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
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


  const handleKategori = (e) => {
    setKategori(e.target.value);
  }

  const handleTgl = (e) => {
    setTgl(e.target.value);
  }
  const nextButton = ()=>{
    console.log("issi current page "+currentPage)
    setCurrentPage(currentPage+1);
    
    console.log("issi current page "+currentPage)
    fetchData();
  }
  const prevButton = ()=>{
    console.log("issi current page "+currentPage)
    setCurrentPage(currentPage-1);
    console.log("issi current page "+currentPage)
    fetchData();
  }
  const fetchData= async () => {
    const url = `http://103.150.92.47:8081/Admin/Item-Found?page=${currentPage}`;
    if(tgl.trim() != ""){
      url = `${url}&foundData=${tgl}`;
    }
    if(kategori.trim() != ""){
      url = `${url}&catetgory=${kategori}`;
    }

    const token = Cookies.get("token");
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
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
    })
    .catch((err) => {
      console.log(err);
    });
    fetchData();
  }, []);

  return (
    <AdminDefault
      title={"Found Item"}
      body={<>
      <div className="d-flex justify-content-end pb-4 relative h-100">
            {/* Filter Modal */}
            {/* ... (Modal button and content) */}
            
            {/* Add New Item Link */}
            <button className="mr-2">
              Filter
            </button>
            <Link
              className="border border-0 bg-primary text-white px-3 pb-2 border-dark text-dark me-3 fw-bold pt-2 rounded text-decoration-none"
              to="/admin/AddItem"
            >
              Add New Item
            </Link>
          </div>
          <div className="table">
            <table className="table table-bordered pt-5 rounded">
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
                    <td>{item.status}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <nav aria-label="pagination">
                <button
                  className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={prevButton}
                  disabled={currentPage === 1}
                >{"<"}
                </button>
                          Page {currentPage} of {totalPages}
                <button
                  className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={nextButton}
                  disabled={!hasMore}
                >
                  {">"}
                </button>
          </nav>
      </>}/>
  );
}

import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { AdminDefault } from "../AdminDefault";
import { LoadingPage } from "../../Loading";
import { statusBadge } from "../../../Util/Utils";
import { getCategory, getItemFound } from "../../../Hooks/Admin/Item";

export default function FoundItemList() {
  const [data, setData] = useState([]);
  const [kategori, setKategori] = useState("");
  const [tglStart, setTglStart] = useState("");
  const [tglEnd, setTglEnd] = useState("");
  const [valueKategori, setValueKategori] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [namaBarang, setNamaBarang] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleKategori = (e) => {
    setKategori(e.target.value);
  }

  const handleNamaBarang = (e) => {
    setNamaBarang(e.target.value);
    setPage(1);
  }

  const handleTglStart = (e) => {
    setTglStart(e.target.value);
    setPage(1);
  }
  const handleTglEnd = (e) => {
    setTglEnd(e.target.value);
    setPage(1);
  }

  const handleStatus = (e)=>{
    setStatus(e.target.value);
    setPage(1);
  }
  
  const fetchData= async () => {
    setLoading(true);
    try {
      const res = await getItemFound({page, namaBarang, tglStart, tglEnd, kategori, status});
      setData(res.data.data);
      setHasMore(res.data.data.isHasMore);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{
    getCategory()
    .then((res) => {
      setValueKategori(res.data);
      // console.log(res.data.data);
    })
    .catch((err) => {
      if(err.response.status==401){
        navigate("/admin");
      }
    });
  },[])

  useEffect(() => {
    fetchData();
  }, [page, tglStart, tglEnd, kategori, namaBarang, status]);


  return (
    <>
      {isLoading?<LoadingPage/>:<></>}
      <AdminDefault

        title={"Found Item"}
        body={<>
          <div className="">
            <div className="d-flex justify-content-start pb-4 relative h-100">
              {/* popup filter */}
              <button type="button" className="btn btn-primary mr-2 me-5 bg-primary text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Filter
              </button>
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Filter</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {/* Form filter */}
                      <div className="mb-3">
                        <label htmlFor="namaBarang" className="form-label">Nama Barang</label>
                        <input type="text" className="form-control" id="namaBarang" onChange={handleNamaBarang} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="kategori" className="form-label">Kategori</label>
                        <select className="form-select" id="kategori"  onChange={handleKategori}>
                          <option value="">--</option>
                          {valueKategori.map((item, index)=>{
                            return <option value={item.category} key={index}>{item.category}</option>
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
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                  {data.length==0?<>
                    <tr>
                      <td colSpan={5} className="text-center">Belum ada data ditambahkan</td>
                    </tr>
                  </>:<></>}
                  {data.map((item) => {
                    return <>
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.foundDate}</td>
                      <td>{statusBadge(item.status)}</td>
                      <td>
                        <Link
                          className="btn btn-primary text-white"
                          to={"/admin/FoundItem/" + item.id}
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
              <button onClick={()=>setPage(page-1)} className={"btn btn-primary "+page==1?"d-none":""}>{"<"}</button>
              <button disabled className="mx-1">{page}</button>
              <button onClick={()=>setPage(page+1)} className={hasMore?"d-none":""}>{">"}</button>
            </div>
          </div>
        </>}/>
      </>
  );
}

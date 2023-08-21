import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { AdminDefault } from "../AdminDefault";
import { LoadingPage } from "../../Loading";
import { getListUser } from "../../../Hooks/Admin/User";

export default function UserList() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchData= async () => {
    getListUser({page:page, name:name})
    .then((e)=>{
        setData(e.data.data);
        setHasMore(e.data.isHasMore);
    })
  };
  useEffect(() => {
    fetchData();
  }, [page, name]);


  return (
    <>
      {isLoading?<LoadingPage/>:<></>}
      <AdminDefault

        title={"User"}
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
                      <div className="mb-3">
                        <label htmlFor="namaBarang" className="form-label">Nama</label>
                        <input type="text" className="form-control" id="namaBarang" onChange={(e)=>setName(e.target.value)} />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table">
              <table className="table-bordered pt-5 rounded w-100" >
                <thead style={{backgroundColor:"black"}}>
                  <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>No. HP</th>
                    <th>Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    let status=<></>;
                    if(item.status==='Found') status = <div className="badge bg-primary">{item.status}</div>;
                    if(item.status==='Confirmed' || item.status ==="Closed") status = <div className="badge bg-success">{item.status}</div>;
                      
                    return <>
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        <Link
                          className="btn btn-primary text-white"
                          to={"/admin/user/" + item.id}
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
      </>
  );
}

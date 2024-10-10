import { useState, useEffect } from "react";
import ListData from "./ListData";
import { getListClaim } from "../../../Hooks/Admin/ItemClaim";
import { AdminDefault } from "../AdminDefault";
import { useNavigate } from "react-router-dom";
import { LoadingModal } from "../../Loading";

export default function ListClaim() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);


  let navigate = useNavigate();
  
  const handleStatus = (e) => {
    setStatus(e.target.value);
  }
  useEffect(() => {
    const getListData = async()=>{
      try{
        setLoading(true);
        let listData = await getListClaim({page,status:status});
        // console.log(listData);
        setData(listData.data.data);
        setLoading(false);
      }catch(e){
        setLoading(false);
        if(e.error ===401){
          navigate("/Admin", -1);
        }
      }
    }
    getListData();
  }, [status, page]);
  return (
    <AdminDefault
      title={"List Claim"}
      body={ 
<>
        <LoadingModal isLoading={isLoading}/>
        <div className="">
          <button type="button" className="mr-2 me-5 bg-primary text-white ms-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Filter
          </button>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <form className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Filter</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
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
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </form>
            </div>
          </div>
          <div className="table">
            <table className="table-bordered pt-5 rounded w-100" >
              <thead style={{backgroundColor:"black"}}>
                <tr>
                  <th>Nama Barang</th>
                  <th>Tanggal Pengambilan</th>
                  <th>Status Item</th>
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
                  itemFoundStatus={item.itemFoundStatus}
                />
              ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center ">
            <button onClick={()=>setPage(page-1)} className={page==1?"d-none":""}>{"<"}</button>
            <button disabled className="mx-1">{page}</button>
            <button onClick={()=>setPage(page+1)}>{">"}</button>
          </div>
        </div></>
      }/>
);
}
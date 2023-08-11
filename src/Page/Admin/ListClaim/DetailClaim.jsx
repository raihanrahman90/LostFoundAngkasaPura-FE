import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { BsFillPersonFill } from "react-icons/bs";
import { AdminDefault } from "../AdminDefault";
import { getDetailClaim } from "../../../Hooks/Admin/ItemClaim";

const Detail = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [shopComment, setShowCommet] = useState([])
  const [comment, setComment] = useState("")
  const [image64, setImage64] = useState("")
  const [item, setItem] = useState();
  const routeParams = useParams();
  useEffect(()=>{

  },[comment])
  useEffect(()=>{
    const fetchData = async()=>{
      let data = await getDetailClaim({id:routeParams["id"]});
      setItem(data.data);
    }
    fetchData();
  },[])
/*
  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get(`http://103.150.92.47:8081/Admin/Item-Claim?itemFoundId=${itemFoundId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "image/jpeg",
        },
      })
      .then((res) => {
        // console.log(res.data.data.data);
        setData(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [from]);

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get(`http://103.150.92.47:8081/Admin/Item-Comment?itemClaimId=${idItemClaim}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "image/jpeg",
        },
      })
      .then((res) => {
        setShowCommet(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [from]);
*/

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    const data = {
      itemClaimId: idItemClaim,
      value : comment,
      imageBase64 : image64 
  };
  const res = await axios.post(`http://103.150.92.47:8081/Admin/Item-Comment`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  console.log(res)
}

  return (
    <AdminDefault 
    title={"Detail Claim"}
    body={
      <>
       <div
          className="col-md-10 pt-5"
          style={{ backgroundColor: "white", borderRadius: "30px" }}
        >
          {item==null?<></>:<>
            <div className="row">
              <div className="col-3">Nama Barang</div>
              <div className="col-9">{item.name}</div>
            </div>
            <div className="row">
              <div className="col-3">Status</div>
              <div className="col-9">{item.status}</div>
            </div>
            <div className="row">
              <div className="col-3">Gambar</div>
              <div className="col-9"><img src={item.image} alt="image item" /></div>
            </div>
            <hr color="black" className="mt-5" />
            <h5>Keterangan Tambahan</h5>
            <div className="row">
              <div className=""></div>
            </div>
          </>}
            {/*
              <div>

                <div className="border rounded mb-5 w-50">
                  <BsFillPersonFill />
                  <span style={{ marginLeft: "10px" }}>user :</span>
                  <span style={{ marginLeft: "10px" }}>{item.proofDescription}</span>
                </div>

                <div className="">
                  {shopComment.map((item, index) => {
                    return (
                      <div key={index} className=" border mb-5 d-flex w-50">
                        <span>{item.value}</span>
                        <div className="d-flex ps-5">
                        <BsFillPersonFill />
                        <span  >admin-{item.userName}</span>
                        </div>
                      </div>
                    );
                  })}

                </div>

            <form className="d-flex" onSubmit={handleSubmitComment}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment"
              className="w-50 form-control"
            />
            <input type="file" onChange={handleFileInputChange} className="form-control ms-3 w-10" />
            <button type="submit" className="btn btn-primary ms-3">
              Submit
            </button>
          </form>
                </div>*/}
            </div>
        </>
      }
    />

  );
}
export default Detail;
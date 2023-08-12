import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { BsFillPersonFill } from "react-icons/bs";
import { AdminDefault } from "../AdminDefault";
import { getDetailClaim } from "../../../Hooks/Admin/ItemClaim";
import Loading from "../../Componen/Loading"

const Detail = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([])
  const [showComment, setShowComment] = useState(false);
  const [image64, setImage64] = useState("")
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  const routeParams = useParams();
  const itemFoundId = routeParams["id"];
  useEffect(()=>{

  },[comment])
  useEffect(()=>{
    const fetchData = async()=>{
      let data = await getDetailClaim({id:routeParams["id"]});
      setItem(data.data);
    }
    fetchData();
  },[])
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
  }, []);
  const getComment = async ()=>{
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
  }

  useEffect(() => {
    getComment();
  }, []);

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

const tolakHandle = async () => {
  // console.log("ini id",id)
  setLoading(true)
  try {
    const token = Cookies.get('token');
    const response = await axios.post(
      `http://103.150.92.47:8081/Admin/Item-Claim/${idItemClaim}/reject`,
      {
        rejectReason: 'JELEK BETUL EH FOTOMU',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Tolak response:', response.data);
    setLoading(false)

  } catch (error) {
    console.error('Tolak error:', error);

  }
};

const terimaHandle = async () => {
  setLoading(true)
  try {
    const token = Cookies.get('token');
    const response = await axios.post(
      `http://103.150.92.47:8081/Admin/Item-Claim/${idItemClaim}/approve`,
      {
        claimLocation: "Gate 8",
        claimDate: "2023-07-31T06:54:27.031Z"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Claim Di teirma', response.data);
    // alert("Claim Di Terima")
    setLoading(false)

  } catch (error) {
    console.error('Tolak error:', error);

  }
};


  return (
    <>
    {loading ? (<Loading />) : (
    <AdminDefault 
    title={"Detail Claim"}
    body={
      <>
          {item==null?<></>:<>
          
          <div className={"row table overflow-hidden min-h-80 "}> 
            <div className="col-md-6">
              <div className="row">
                <div className="col-12">
                  <h6>Detail Barang</h6>
                </div>
              </div>
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
            </div>
            <div className="col-md-6">
              <h6>Keterangan Klaim</h6>
              <div className="row">
                <div className="col-3">
                  Nomor Identitas
                </div>
                <div className="col-9">
                  {item.identityNumber}
                </div>
                <div className="col-3">
                  Deskripsi
                </div>
                <div className="col-9">
                  {item.proofDescription}
                </div>
                <div className="col-3">
                  Deskripsi Gambar
                </div>
                <div className="col-9">
                  <img src={item.proofImage}/>
                </div>
              </div>
            </div>
            <div className="col-12">
                {comment.map((item, index) => {
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
          </div>
          {item.status === "Confirmation" ? (
            <div className="float-end top"> 
            <button className="btn btn-success me-1 text-white me-5 px-5" onClick={terimaHandle}>Terima</button>
            <button onClick={tolakHandle} className="btn btn-danger px-5  me-1 text-white">
              Tolak
            </button>
            </div>):(null)}
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
        </>
      }
    />

  )}
  </>
  );
}
export default Detail;
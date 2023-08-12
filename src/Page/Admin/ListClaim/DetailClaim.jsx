import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { BsFillPersonFill } from "react-icons/bs";
import { AdminDefault } from "../AdminDefault";
import Loading from "../../Componen/Loading"

export default function Detail() {
  const location = useLocation();
  const { from } = location.state;
  const itemFoundId = from.itemFoundId;
  const idItemClaim = from.id;

  const [data, setData] = useState([]);
  const [shopComment, setShowCommet] = useState([])
  const [comment, setComment] = useState("")
  const [image64, setImage64] = useState("")
  const [loading, setLoading] = useState(false);

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
        // console.log(res.data.data);
        setShowCommet(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [from]);


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
  // console.log("ini id",idItemClaim)
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
       <div
          className="col-md-10 pt-5"
          style={{ backgroundColor: "white", borderRadius: "30px" }}
        >
          {/* <h1 className="pb-5">Detail Claim</h1> */}
          {data.map((item, index) => (
            <div key={index}>
          {data.status === "Confirmation" ? (
            <div className="float-end top"> 
          <button className="btn btn-success me-1 text-white me-5 px-5" onClick={terimaHandle}>Terima</button>
          <button onClick={tolakHandle} className="btn btn-danger px-5  me-1 text-white">
            Tolak
          </button>
          </div>
          ) : (
            null
          )}
          
              <div className="row">
                <h1>Data Barang</h1>
                <div className="col-3">
                  <p><strong>Nama Barang:</strong></p>
                  <p><strong>Status:</strong></p>
                  <label htmlFor=""><strong>Gambar</strong></label>
                </div>
                <div className="col-9">
                  <p>: {item.name}</p>
                  <p>: {item.status}</p>
                  <img src={item.image} alt="" style={{ width: "50%", height: "50%",  }} />
                </div>
              </div>
              <hr color="black" className="mt-5" />
              <div className="row">
                <div className="col-3">
                  <h5>Data Claim</h5>
                  <p><strong>Descripsi Bukti:</strong></p>
                  <p><strong>Gambar Bukti:</strong></p>
                </div>
                <div className="col-9">
                  <p>: {item.description}</p>
                  <img src={item.proofImage} alt="" style={{ width: "50%", height: "50%",  }} />
                </div>
              </div>
              <hr color="black" className="mt-5" />
              <h5>Keterangan Tambahan</h5>
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
              </div>
            </div>
          ))}
        </div>

      
      </>
    
  }
  />
  
  )}
  </>

  );
}

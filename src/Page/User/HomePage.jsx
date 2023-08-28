import {useEffect, useState} from "react";
import Headers from "./Headers";
import "../../Asset/style.css";
import Footer from "./Footer";
import { getListFoundItem } from "../../Hooks/User/ListFoundItem";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../Componen/Card";
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';
import carousel_1 from '../../Asset/carousel_1.jpg'
import carousel_2 from '../../Asset/carousel_2.jpg'
import carousel_3 from '../../Asset/carousel_3.jpg'

export default function HomePage() {
  const [barang, setBarang] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData= async()=>{
      var res = await getListFoundItem(1, 4, null,null,null);
      setBarang(res.data.data);
    }
    fetchData();
  },[])
  const carousel = [carousel_1, carousel_2, carousel_3]
  

  return (
    <div>
      <Headers />
      <MDBCarousel className="vh-80">
        {carousel.map(t=>{
          return<MDBCarouselItem
          className='w-100 d-block vh-80'
          itemId={1}
          src={carousel_1}
          alt='...'
          >
          <div className="bg-carousel"></div>
          <div className="z-5 position-relative mb-5">
            <h1 className="title text-white pb-5 fw-bold display-4 display-md-3">
              Temukan <span className="text-warning">Barangmu</span>
            </h1>
            <h5 className="text-white fs-5 fs-md-4">
              Cari barangmu yang hilang, Kami akan membantumu mencari barangmu
              yang <br />
              hilang dan mengabarikannya ke kamu
            </h5>
            <button className="buttonTitle bg-warning text-white px-3 rounded border-0 py-2 mt-4 fw-bold" onClick={(e)=>navigate("/Barang")}>
              Cari Barangmu
            </button>
          </div>
        </MDBCarouselItem>
        })}
      </MDBCarousel>
      <div className="row my-2 mx-2 justify-content-center hv-45 px-md-0">
        <div className="
            col-md-8 text-center d-flex rounded shadow 
            landingpage-card bg-white h-fit-content z-5 p-md-5 text-white mx-2 py-1">
          <div className="row">
            <div className="col-md-6">
              <div className="col-12 bg-primary rounded py-2">
                <p className="fw-bold fs-3">Laporkan Barang hilang</p>
                <p className="fs-md-6 text-center">
                  Anda kehilangan barang? Laporkan segera ke petugas kami, kami akan
                  berupaya mencari barang anda. Note: Jika Barang Tidak ditemukan
                  pada list barang setelah 1x24 jam, silahkan klik{" "}
                  <Link to="/report#header" className="text-white">disini</Link>.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-12  bg-success rounded py-2">
                <p className="fw-bold fs-3">Cari Barang Hilang</p>
                <p className="fs-6">
                  Semua informasi barang yang hilang yang telah ditemukan tersedia
                  di dalam web ini. Cari barang anda yang hilang di website ini dan
                  klaim kepemilikan barang anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="bgdasboard   ">
          <h1 className=" text-center text-white pb-5 fw-bold pt-5">
            Penemuan <span className="text-warning">Barang Hilang</span> Terbaru
          </h1>
          <div className="container">
            <div className="row g-5 p-0">
              {barang.map((item) => {
                return (
                    <Card key={item.id} id={item.id} image={item.image} description={item.description} name={item.name}/>
                );
              })}
            </div>
          </div>
          <div className="pb-5 text-center">
            <Link className="btn bg-warning text-white" to="/Barang">
              lihat semua
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-dark">
        <Footer />
      </div>
    </div>
  );
}

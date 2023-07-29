import React from 'react';
import Headers from './Headers';
import '../../Asset/style.css'; 
import Logo from '../../Asset/logo.png';

export default function HomePage() {

    const barang = [{
        id : 1,
        img: Logo,
        kategoti : "Elektronik",
        keterangan : "ditemukan tempat duduk bording pesawat",
    },
    {
        id : 2,
        img: Logo,
        kategoti : "Elektronik",
        keterangan : "ditemukan tempat duduk bording pesawat",
    },{
        id : 3,
        img: Logo,
        kategoti : "Elektronik",
        keterangan : "ditemukan tempat duduk bording pesawat",
    },
    {
        id : 4,
        img: Logo,
        kategoti : "Elektronik",
        keterangan : "ditemukan tempat duduk bording pesawat",
    },
]
  return (
    <div>
      <Headers />

      <div className="bgdasboard text-center">
        <h1 className="title text-white pb-5 fw-bold">Temukan <span className="text-warning">Barangmu</span></h1>
        <h5 className="text-white">Cari barangmu yang hilang, Kami akan membantumu mencari barangmu yang <br />hilang dan mengabarikannya ke kamu</h5>

        <button className="buttonTitle bg-warning text-white px-3 rounded border-0 py-2 mt-4 fw-bold" >Cari Barangmu</button>

      <div className="cardTitle position-absolute">
          <div className="  cardSection">
            <div class="card" style={{width: "100%"}}>
          <div className="container row">
                <div class="col-6 card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
                <div class="col-6 card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
                </div>
                </div>
               </div>

          </div>
        {/* </div> */}

        <h1 className='text-dark'>jamal</h1>
        <h1>jamal</h1>
      </div>

        <div className="listBarang  ">
            <div className='bgdasboard  '>
            <h1 className=" text-center text-white pb-5 fw-bold pt-3">Penemuan <span className="text-warning">Barang Hilang</span>  Terbaru</h1>
                <div className='d-flex justify-content-center '>
                    {barang.map((item) => {
                        return(
                            <div className="card mx-3 rounded" style={{width: "18rem"}}>
                                <img src={item.img} className='p-5' alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.kategoti}</h5>
                                    <p className="card-text">{item.keterangan}</p>
                                    <a href="#" className="btn btn-primary w-100 text-white fw-bold">Klaim Barang</a>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='pb-5 mb-5'>
                    <button className='bg-warning text-white border-0 d-flex justify-content-center my-3 rounded py-2 px-4 mx-auto'>
                        lihat semua 
                    </button>
                </div>

            </div>
        </div>
    </div>
  );
}

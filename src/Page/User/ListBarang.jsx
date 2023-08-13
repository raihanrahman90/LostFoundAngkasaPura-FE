import { useEffect, useState } from "react";
import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import "../../Asset/style.css";
import { getListFoundItem } from "../../Hooks/User/ListFoundItem";
import {
    Form,
    FormControl,
    InputGroup,
    Container,
    Row,
    Col
  } from "react-bootstrap";

export default function ListBarang() {

    const [dataKategori, setKategori] = useState("");
    const [dataName, setName] = useState("");
    const [barang, setBarang] = useState([]);
    const handleKategori = (e) => {
        setKategori(e.target.value);
    };

    const handleName = (e)=>{
        setName(e.target.value);
    }

    useEffect(()=>{
        getListFoundItem(page, 9, dataName, dataKategori, foundDateStart, foundDateEnd)
    })

    return (
        <div style={{backgroundColor:"white"}}>
            <Headers />

            <div className="bgdasboard text-center py-5">
                <h1 className="title text-white pb-3 fw-bold">Temukan <span className="text-warning">Barangmu</span></h1>
                <h5 className="text-white pb-3 ">Cari barangmu yang hilang, Kami akan membantumu mencari barangmu yang <br />hilang dan mengabarikannya ke kamu</h5>

                {/* <input className="inputs border border-secondary mb-2 mt-5 icon-rtl" type="text" placeholder="Cari Barang" /> */}
                {/* <Container className="mt-5  pb-5">
                    <Row className="d-flex justify-content-center">
                        <Col md={6}>
                            <Form className="d-flex justify-content-center">
                                <InputGroup>
                                    <FormControl type="search" className="me-2" placeholder="Search" prefix={AiOutlineSearch}>
                                    </FormControl>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container> */}
                <Container className="mt-5 pb-5">
                    <Row className="d-flex justify-content-center">
                        <Col md={6}>
                            <Form className="d-flex justify-content-center">
                                <InputGroup>
                                    <FormControl type="search" placeholder="Search" onChange={handleName}/>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>


                {/* </div> */}

            </div>


            <div className="container">
                {/* Sub Judul */}
                <div className="row">
                <div className="col-3">
                    <h4 className="text-start pt-5">Filter</h4>
                </div>
                <div className="col-9">
                    <h4 className="text-start pt-5">Daftar Barang Yang Ditemukan</h4>

                </div>
                </div>

                {/* Content */}
                <div className="row">
                    <div className="col-3">
                        <div>
                            <label className="pb-3 " htmlFor="kategori">Kategori : </label>
                            <select
                            onChange={handleKategori}
                            className="form-select"
                            id="kategori"
                            >
                                <option value="Kategori 5">Perhiasan</option>
                                <option value="Kategori 5">Tas</option>
                                <option value="Kategori 5">Dompet</option>
                                <option value="Kategori 5">Koper</option>
                                <option value="Kategori 5">Elektronik</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            <label className="pb-3 " htmlFor="kategori">Tanggal Ditemukan : </label>
                            <input type="date" className="form-control" id="kategori" />
                            <hr style={{width:'20%', border:'1px solid black'}} className="container"/>
                            <input type="date" className="form-control" id="kategori" /> 
                        </div>

                        <div className="pt-4">
                            <button className="btn btn-filter w-100 fw-bold bg-primary">Filter</button>
                        </div>
                        <div className="pt-2">
                            <button className="btn btn-hapus w-100 fw-bold">Hapus Filter</button>
                        </div>
                    </div>
                    <div className="col-9 pb-5">
                        <div className="my-3">
                            <div className='d-flex row'>
                                {barang.map((item) => {
                                    return(
                                        <>
                                            <div className="col-md-6 card mx-3 my-3 rounded" style={{width: "17rem"}}>
                                                <img src={item.img} className='p-5' alt="" />
                                                <div className="card-body">
                                                    <p className="card-category" style={{width:"50%"}}>{item.kategoti}</p>
                                                    <h5 className="card-title">{item.namaBarang}</h5>
                                                    <p className="card-text">{item.keterangan}</p>
                                                    <a href="#" className="btn btn-primary w-100 text-white fw-bold">Klaim Barang</a>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-dark">
                <Footer />
            </div>
        </div>
    );
}
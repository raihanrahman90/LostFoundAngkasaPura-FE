import { useEffect, useState } from "react";
import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import "../../Asset/style.css";
import { getListFoundItem, getCategory } from "../../Hooks/User/ListFoundItem";
import {
    Form,
    FormControl,
    InputGroup,
    Container,
    Row,
    Col
  } from "react-bootstrap";
import { Card } from "../Componen/Card";

export default function ListBarang() {

    const [kategori, setKategori] = useState("");
    const [dataName, setName] = useState("");
    const [barang, setBarang] = useState([]);
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [dataCategory, setDataCategory] = useState([]);
    const handleKategori = (e) => {
        setKategori(e.target.value);
    };

    const handleName = (e)=>{
        setName(e.target.value);
    }
    const handleStartDate = (e)=>{
        setStartDate(e.target.value);
    }
    const handleEndDate = (e)=>{
        setEndDate(e.target.value);
    }

    useEffect(()=>{
        getListFoundItem(page, 9, dataName, kategori, startDate, endDate)
        .then((e)=>{
            setBarang(e.data.data)
        })
    },[kategori, startDate, endDate])

    useEffect(()=>{
        getCategory()
        .then((e)=>{
            setDataCategory(e.data);
        })
    }, [])

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
                    <div className="col-12 col-md-3">
                        <div>
                            <label className="pb-3 " htmlFor="kategori">Kategori : </label>
                            <select
                            onChange={handleKategori}
                            className="form-select"
                            id="kategori"
                            >
                                <option value="">--</option>
                                {dataCategory.map(data=>{
                                    return <option value={data.category}>{data.category}</option>
                                })}
                            </select>
                        </div>

                        <div className="pt-4">
                            <label className="pb-3 " htmlFor="kategori">Tanggal Ditemukan : </label>
                            <input type="date" className="form-control" id="startdate" onChange={handleStartDate} value={startDate}/>
                            <hr style={{width:'20%', border:'1px solid black'}} className="container"/>
                            <input type="date" className="form-control" id="enddate" onChange={handleEndDate} value={endDate}/> 
                        </div>
                        <div className="pt-2">
                            <button className="btn btn-hapus w-100 fw-bold">Hapus Filter</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-9 pb-5">
                        <div className="my-3">
                            <div className='d-flex row'>
                                {barang.map((item) => {
                                    return(
                                        <Card key={item.id} id={item.id} name={item.name} description={item.description} image={item.image} category={item.category}/>
                                    )
                                })
                                }
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button>{"<"}</button>
                            <button disabled className="mx-1">1</button>
                            <button>{">"}</button>
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
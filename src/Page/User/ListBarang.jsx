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
import {FiAlertTriangle } from 'react-icons/fi';
import { Link } from "react-router-dom";

export default function ListBarang() {

    const [kategori, setKategori] = useState("");
    const [name, setName] = useState("");
    const [barang, setBarang] = useState([]);
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dataCategory, setDataCategory] = useState([]);
    const [isHasMore, setHasMore] = useState(false);
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
        getListFoundItem(page, 12, name, kategori, startDate, endDate)
        .then((e)=>{
            setBarang(e.data.data)
            setHasMore(e.data.isHasMore);
        })
    },[kategori, startDate, endDate, name, page])

    useEffect(()=>{
        getCategory()
        .then((e)=>{
            setDataCategory(e.data);
        })
    }, [])

    const handleReset = ()=>{
        setKategori('');
        setStartDate('');
        setEndDate('');
    }



    return (
        <div style={{backgroundColor:"white"}}>
            <Headers />

            <div className="bgdasboard text-center py-5">
                <h1 className="title text-white pb-3 fw-bold">Temukan <span className="text-warning">Barangmu</span></h1>
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


            <div className="container min-vh-50">
                {/* Sub Judul */}
                <div className="row">
                    <div className="col-12 col-md-3 order-2 order-md-1">
                        <h4 className="text-start pt-5">Filter</h4>
                    </div>
                    <div className="col-12 col-md-9 order-1 order-md-2">
                        <h4 className="text-start pt-5">Daftar Barang Yang Ditemukan</h4>
                        <p className="text-third"><FiAlertTriangle/> Note : Jika barang tidak Ditemukan pada list barang setelah 1x24 jam, silahkan hubungi <i>contact center</i>  
                        <Link to={"/report"} className="ms-1">disini</Link></p>
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
                            value={kategori}
                            >
                                <option value="">--</option>
                                {dataCategory.map(data=>{
                                    return <option value={data.category} key={data.category}>{data.category}</option>
                                })}
                            </select>
                        </div>

                        <div className="pt-4">
                            <label className="pb-3 " htmlFor="kategori">Tanggal Ditemukan : </label>
                            <input type="date" className="form-control" id="startdate" onChange={handleStartDate} value={startDate}/>
                            <hr style={{width:'20%', border:'1px solid black'}} className="container"/>
                            <input type="date" className="form-control" id="enddate" onChange={handleEndDate} value={endDate}/> 
                        </div>

                        <button className="w-100 mt-3 bg-danger text-white" onClick={handleReset} >
                            Reset
                        </button>
                    </div>
                    <div className="col-12 col-md-9 pb-5 min-vh-50 position-relative mb-5">
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
                        <div className="position-absolute bottom-0 w-100">
                            <div className="d-flex justify-content-center ">
                                <button onClick={()=>setPage(page-1)} className={page==1?"d-none":""}>{"<"}</button>
                                <button disabled className="mx-1">{page}{isHasMore}</button>
                                <button onClick={()=>setPage(page+1)} className={!isHasMore?"d-none":""}>{">"}</button>
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
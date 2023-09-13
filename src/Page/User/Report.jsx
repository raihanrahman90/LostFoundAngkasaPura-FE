import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import "../../Asset/style.css";
import customerService from "../../Asset/Customer Service.png"
import { Link } from 'react-router-dom';
export default function Report() {

    return (
        <div className="" style={{backgroundColor:"white"}}>
            <Headers />

            <div className="container pb-3 mt-3 py-5">
                <h2 className="fw-bold">Informasi Barang Hilang</h2>
            </div>

            <div className="container my-5 pb-5">
                <div className="row justify-content-center">
                    <div className='col-md-4 justify-content-center d-none d-md-flex'>
                        <div>
                            <img src={customerService} className='w-100 mt-5'/>
                        </div>
                    </div>
                    <div className="col-md-4 bg-primary rounded text-white px-3 py-5 row justify-content-center">
                        <p className='col-12 mb-3'>Hubungi contact center kami jika tidak dapat menemukan barang Anda pada website ini dalam 1x24 Jam</p>
                        <div className='col-10 fs-12px'>
                            <p>
                                E-mail: <Link to="https://mail.google.com/mail/u/0/?view=cm&tf=1&fs=1&to=cc172@ap1.co.id" className='text-white'>cc172@ap1.co.id</Link> <br/>
                                Twitter: <Link to="https://twitter.com/angkasapura172" className='text-white'>@Angkasapura172</Link><br/>
                                Instagram: <Link to = "https://www.instagram.com/angkasapura_172/" className='text-white'>@angkasapura_172</Link><br/>
                                Facebook: <Link to = "https://www.facebook.com/angkasapura172ap1" className='text-white'>Contact Center Angkasa Pura 172</Link><br/>
                                Call: 172
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-dark mt-5">
                <Footer />
            </footer>
        </div>
    );
}
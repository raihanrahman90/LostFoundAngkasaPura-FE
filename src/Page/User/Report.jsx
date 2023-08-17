import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import "../../Asset/style.css";
import customerService from "../../Asset/Customer Service.png"
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
                                E-mail: cc172@ap1.co.id <br/>
                                Twitter: @Angkasapura172<br/>
                                Instagram: @angkasapura_172<br/>
                                Facebook: Contact Center Angkasa Pura 172<br/>
                                Call: 142
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
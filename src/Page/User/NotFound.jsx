import Headers from './Headers';
import Footer from "./Footer";
import '../../Asset/user.css'; 
import "../../Asset/style.css";
import customerService from "../../Asset/404.png"
export default function NotFound() {

    return (
        <div className="" style={{backgroundColor:"white"}}>
            <Headers />

            <div className="container my-5 pb-5">
                <div className="row justify-content-center">
                    <div className='col-12 col-md-3 justify-content-center d-none d-md-flex'>
                        <div>
                            <img src={customerService} className='w-100 mt-5'/>
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
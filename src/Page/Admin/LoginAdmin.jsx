import React, { useEffect,useState } from 'react';
import Cookies from 'js-cookie';
import logo from '../../Asset/logo.png';
import bg from '../../Asset/background_1.png';
import { useNavigate } from 'react-router-dom';
import {login}from '../../Hooks/Admin/Admin';
import {getAccessToken} from '../../Hooks/Admin/Admin';
import Loading from "../Componen/Loading";

// import {getAccessToken} from '../../Hooks/Admin/Admin';


export default function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();



  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = await login({
      email: email,
      password: password,
    });
    if (data) {
      // console.log(data.data);
      Cookies.set('token', data.data);
      setLoading(false);
      navigate('/admin/Dashboard');
    }
  };


  useEffect(() =>{
    const checkAccessToken = async()=>{
      try{
        let accessToken = await getAccessToken();
        console.log(accessToken);
        return accessToken;
      }catch(e){
        if(e.message == 'Mohon login kembali'){
          alert("Token expired")
        }
      }
    }
    checkAccessToken().catch(console.error);
  }, []);

  return (
    <>
    {loading ? (<Loading />) : (
    <section className="vh-100 vw-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src={bg}
                alt="login form" className="img-fluid" />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">
                <form onSubmit={handleLogin}>
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                    <img src={logo} className='mx-auto' alt="" />
                  </div>
                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Sign into your account</h5>
                  <div className="form-outline mb-4">
                    <input type="email" onChange={(e) => {setEmail(e.target.value)}} id="form2Example17" className="form-control form-control-lg" placeholder="Email" required />
                  </div>
                  <div className="form-outline mb-4">
                    <input type="password" onChange={(e) => {setPassword(e.target.value)}} id="form2Example27" className="form-control form-control-lg" placeholder="Password" required/>
                  </div>
                  <div className="pt-1 mb-4">
                    <button className="border border-0 bg-primary text-white px-3 border-dark text-dark me-3 fw-bold mb-2 rounded p-3 w-100" type="submit">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    </section>
    )}
</>

  );
}

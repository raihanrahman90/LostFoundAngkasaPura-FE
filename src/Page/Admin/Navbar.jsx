import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Asset/logo.png';
import '../../Asset/style.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {

  let navigate = useNavigate();

  const logout = () => {
    Cookies.remove('token');
    navigate('/admin');
  };

  return (
    <div className='NavbarBG  mx-auto ps-5 '>
      <div className='justify-content-center align-items-center mb-3'>
        <img className='logoNav mb-5' src={logo} alt='Logo' />
        <h5 className='ml-2 mb-0 text-black'>Customer <span style={{color : "#FFF000"}}>Service</span> 
          </h5>
      </div>
      <ul style={{ listStyle: 'none', padding: '30px 0' }}>
        <li className='py-3'>
          <img src={logo} width={20} height={20} alt='' />
          <Link  style={{ textDecoration: 'none' }} to='/admin/dashboard'>
            <span className='menu_link '>
            Dashboard
            </span>
          </Link>
        </li>
        <li className='py-3'>
          <img src={logo} width={20} height={20} alt='' />
          <Link style={{ textDecoration: 'none'}} to='/admin/FoundItem'>
            <span className='menu_link '>
            Found Item
            </span>
          </Link>
        </li>
        <li className='py-3'>
          <img src={logo} width={20} height={20} alt='' />
          <Link style={{ textDecoration: 'none' }} to='/admin/CustomReport'>
            <span className='menu_link '>
            Customer Report
            </span>
          </Link>
        </li>
      </ul>
      
      {/* create button logout */}
      <div className='menu_link_singout'>
        <img src={logo} width={20} height={20} alt='' />
        <button className="btn bg-transparent btn-outline-primary border-0 text-dark py-3 " onClick={logout}  ><span  className='menu_link '>Log out</span></button>
      </div>

      {/* <div className='menu_link_singout pb-5' >
          
          <Link style={{ textDecoration: 'none' }}  to='/admin'>
            <span className='menu_link'>
            Sign Out
            </span>
          </Link>
        </div> */}
    </div>
  );
}

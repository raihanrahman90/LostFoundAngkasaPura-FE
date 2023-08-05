import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Asset/logo.png'
import '../../Asset/style.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { BsGraphDown, BsSearch, BsTicketDetailedFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";



export default function Navbar() {

  let navigate = useNavigate();

  const logout = () => {
    Cookies.remove('token');
    navigate('/admin');
  };

  return (
    <div className='NavbarBG  mx-auto h-full'>
      <ul style={{ listStyle: 'none', padding: '30px 0' }}>
        <li className='py-3 px-3'>
          <BsGraphDown style={{color: "black"}}/>
          <Link  style={{ textDecoration: 'none' }} to='/admin/dashboard'>
            <span className='menu_link '>
            Dashboard
            </span>
          </Link>
        </li>
        <li className='py-3 px-3'>
          <BsSearch style={{color: "black"}}/>
          <Link style={{ textDecoration: 'none'}} to='/admin/FoundItem'>
            <span className='menu_link '>
            Found Item
            </span>
          </Link>
        </li>

        <li className='py-3 px-3'>
        <BsTicketDetailedFill style={{color: "black"}}/>
          <Link style={{ textDecoration: 'none'}} to='/admin/ListClaim'>
            <span className='menu_link '>
            List Claim
            </span>
          </Link>
        </li>
      </ul>
      
      {/* create button logout */}
      <button className='menu_link_singout w-100 btn bg-transparent'>
        <BiLogOut style={{color: "black"}}/>
        <button className="btn btn-outline-primary border-0 text-dark " onClick={logout}  ><span  className='menu_link '>Log out</span></button>
      </button>
    </div>
  );
}

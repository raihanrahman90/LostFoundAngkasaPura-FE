import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Asset/logo.png';
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
  const listMenu = [
    {icon:<BsGraphDown style={{color: "black"}}/>, to:'/admin/dashboard', text:'Dashboard'},
    {icon:<BsSearch style={{color: "black"}}/>, to:'/admin/FoundItem', text:'Found Item'},
    {icon:<BsTicketDetailedFill style={{color: "black"}}/>, to:'/admin/ListClaim', text:'List Claim'}
  ]
  return (
    <div className='bg-white mx-auto px-xl-2 px-lg-0 position-relative h-100 rounded pt-5 sidebar shadow'>
      <ul style={{ listStyle: 'none', padding:'0px'}}>
        {listMenu.map(element => {
          return <li className='py-1 px-lg-3 px-md-1 text-dark my-3' style={{fontSize:'16px'}}>
            <Link className="decoration-none w-100" to={element.to}>
              {element.icon}
              <span className='menu_link'>
                {element.text}
              </span>
            </Link>
          </li>
        })}
      </ul>
      
      {/* create button logout */}
      <button className="btn btn-outline-primary border-0 text-dark my-5 sign-out w-100" onClick={logout}  >
        <BiLogOut style={{color: "black"}} className=''/>
        <span  className='menu_link '>
          Log out
        </span>
      </button>

    </div>
  );
}

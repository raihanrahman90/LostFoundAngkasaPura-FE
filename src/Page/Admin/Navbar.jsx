import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Asset/logo.png';
import '../../Asset/style.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { BsGraphDown, BsSearch, BsTicketDetailedFill } from "react-icons/bs";
import { BiLogOut, BiUser } from "react-icons/bi";



export default function Navbar() {

  let navigate = useNavigate();

  const logout = () => {
    Cookies.remove('token');
    navigate('/admin');
  };
  const listMenu = [
    {icon:<BsGraphDown/>, to:'/admin/dashboard', text:'Dashboard'},
    {icon:<BsSearch/>, to:'/admin/FoundItem', text:'Found Item'},
    {icon:<BsTicketDetailedFill/>, to:'/admin/ListClaim', text:'List Claim'},
    {icon:<BiUser/>, to:'/admin/ListAdmin', text:'List Admin'}

  ]
  return (
    <div className='bg-dark mx-auto px-xl-2 px-lg-0 position-relative h-100 pt-5 sidebar shadow'>
      <ul style={{ listStyle: 'none', padding:'0px'}}>
        {listMenu.map(element => {
          return <li className='py-1 px-lg-3 px-md-1 text-white my-3 pe-xl-5 menu_link' style={{fontSize:'16px'}}>
            <Link className="decoration-none w-100 ml-3" to={element.to}>
              {element.icon}
              <span className='ms-3'>
                {element.text}
              </span>
            </Link>
          </li>
        })}
        <li className="mt-auto">
          <button className="decoration-none w-100 ml-3" onClick={logout}> 
              <span className=''>
                Log out
              </span>
          </button>
        </li>
      </ul>
      

    </div>
  );
}

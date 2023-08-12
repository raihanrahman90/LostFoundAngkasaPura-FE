import React, {useState} from "react";
import {AiOutlineMenu} from "react-icons/ai";
import { Link } from 'react-router-dom';
import '../../Asset/style.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { BsGraphDown, BsSearch, BsTicketDetailedFill } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import {IoMdNotifications} from 'react-icons/io';
import {CgProfile} from 'react-icons/cg';

export const AdminDefault = ({title, body}) =>{
  
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();

  const logout = () => {
    Cookies.remove('token');
    navigate('/admin');
  };
  const clickNotif=()=>{
    setShowNotif(!showNotif);
  }
  const listMenu = [
    {icon:<BsGraphDown/>, to:'/admin/dashboard', text:'Dashboard'},
    {icon:<BsSearch/>, to:'/admin/FoundItem', text:'Found Item'},
    {icon:<BsTicketDetailedFill/>, to:'/admin/ListClaim', text:'List Claim'},
    {icon:<BiUser/>, to:'/admin/ListAdmin', text:'List Admin'}
  ]
  return (
    <div className="bg-secondary h-100 roboto shadow admin 100-vh">
      <div className="row h-100 px-0">
        <div className="col-lg-2 col-sm-3 px-0 d-none d-md-block">
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
                <button onClick={logout} className="decoration-none w-100 ml-3"> 
                    <span className=''>
                      Log out
                    </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className={"position-fixed d-block d-md-none sidebar-mobile "+(showSidebar?"opened":"closed")}>
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
                <button onClick={logout} className="decoration-none w-100 ml-3"> 
                    <span className=''>
                      Log out
                    </span>
                </button>
              </li>
            </ul>
        </div>
        <div
          className="col-lg-10 col-md-9 col-sm-12 bg-white shadow px-0 col-12">
          <div className="shadow d-flex justify-content-start py-2" id="navbar">
            <button className="item d-md-none d-block" onClick={()=>setShowSidebar(!showSidebar)}>
              <AiOutlineMenu/>
            </button>
            <button className="item align-self-end ms-auto me-3">
              <IoMdNotifications onClick={clickNotif}/>
              <span className="notif-count">3</span>
            </button>
            <div className={"notif-dropdown "+(showNotif?"":"d-none")}>
                <div className="notif-list">
                  <p className="notif-title">
                  testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                  </p>
                  <p className="notif-subtitle">
                    testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                  </p>
                </div>
            </div>
            <button className="item me-5">
              <CgProfile/>
            </button>
          </div>
          <div className="rounded shadow px-1 px-md-5 my-3 mx-3 admin-main py-3 pt-5 admin-content">
            <h5 className="text-dark bold">{title}</h5>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}
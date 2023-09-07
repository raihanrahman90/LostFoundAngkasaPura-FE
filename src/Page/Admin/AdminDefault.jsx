import React, {useState, useEffect} from "react";
import {AiOutlineMenu} from "react-icons/ai";
import { Link } from 'react-router-dom';
import '../../Asset/style.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { BsGraphDown, BsSearch, BsTicketDetailedFill } from "react-icons/bs";
import { BiUser, BiUserCheck, BiUserCircle } from "react-icons/bi";
import {IoMdNotifications} from 'react-icons/io';
import {CgProfile} from 'react-icons/cg';
import { getListNotification } from "../../Hooks/Admin/Admin";

export const AdminDefault = ({title, body}) =>{
  
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [countNotification, setCountNotification] = useState(0);
  const [listNotification, setListNotification] = useState([]);
  let navigate = useNavigate();

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    navigate('/admin');
  };
  const clickNotif=()=>{
    if(showNotif){
      setShowNotif(false);
    }
    if(!showNotif){
      setShowNotif(true);
      setShowProfile(false);
    }
  }
  const clickProfile=()=>{
    if(showProfile){
      setShowProfile(false);
    }
    if(!showProfile){
      setShowProfile(true);
      setShowNotif(false);
    }
  }
  const listMenu = [
    {icon:<BsGraphDown/>, to:'/admin/dashboard', text:'Dashboard'},
    {icon:<BsSearch/>, to:'/admin/FoundItem', text:'Found Item'},
    {icon:<BsTicketDetailedFill/>, to:'/admin/ItemClaim', text:'List Claim'},
    {icon:<BiUser/>, to:'/admin/ListAdmin', text:'List Admin'},
    {icon:<BiUserCircle/>, to:'/admin/user', text:"User"}
  ]

  useEffect(()=>{
    getListNotification()
    .then((e)=>{
      setCountNotification(e.data.length);
      setListNotification(e.data);
    })

  },[])
  const gotoNotification=(url)=>{
    navigate(url);
  }
  return (
    <div className="bg-secondary h-100 roboto shadow admin max-vh-100 overflow-hidden">
      <div className="row px-0 h-100">
        <div className="col-lg-2 col-sm-3 px-0 d-none d-md-block">
          <div className='bg-dark mx-auto px-xl-3 px-lg-0 position-relative h-100 pt-5 sidebar shadow ps-5'>
            <ul style={{ listStyle: 'none', padding:'0px'}}>
              {listMenu.map(element => {
                return <li className='py-1 px-lg-3 px-md-1 text-white my-3 pe-xl-5 menu_link px-3' style={{fontSize:'16px'}}>
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
                return <li className='py-1 px-lg-3 px-md-1 text-white my-3 pe-xl-5 menu_link px-3' style={{fontSize:'16px'}}>
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
          className="col-lg-10 col-md-9 col-sm-12 bg-white shadow px-0 col-12 max-vh-100">
          <div className="shadow d-flex justify-content-start py-2 ps-5" id="navbar">
            <button className="item d-md-none d-block" onClick={()=>setShowSidebar(!showSidebar)}>
              <AiOutlineMenu/>
            </button>
            <button className="item align-self-end ms-auto me-3" onClick={clickNotif}>
              <IoMdNotifications />
              {countNotification==0?<></>:<span className="notif-count">{countNotification}</span>}
            </button>
            <div className={"notif-dropdown "+(showNotif?"":"d-none")}>
              {countNotification==0?<>
                <div className="notif-list">
                  <p className="notif-title">
                    Tidak ada notifikasi untuk saat ini
                  </p>
                </div>
              </>:listNotification.map(data=>{
                return <div className="notif-list" onClick={(e)=>gotoNotification(data.url)}>
                  <div className="notif-title">{data.title}</div>
                  <div className="notif-subtitle">{data.subtitle}</div>

                </div>
              })}
                
            </div>
            <button className="item me-5" onClick={clickProfile}>
              <CgProfile/>
            </button>
            <div className={"notif-dropdown "+(showProfile?"":"d-none")}>
                  <Link className="text-decoration-none text-dark fw-bold d-block notif-list w-100" to="/admin/Setting">
                  Setting
                  </Link>
            </div>
          </div>
          <div className="rounded shadow px-1 px-md-5 my-3 mx-3 py-3 pt-5 admin-content">
            <h5 className="text-dark bold">{title}</h5>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}
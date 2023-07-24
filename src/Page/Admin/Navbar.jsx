import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Asset/logo.png'

export default function Navbar() {
  return (
    <div className=' pt-5 bg-dark'>
      <img src={logo} alt="" />
      <h1>Customer Service</h1>
      <ul style={{listStyle: "none", paddingTop: 30, }}>
        <li className='py-3' >
            <img src={logo} width={20} height={20} alt="" />
           <Link style={{textDecoration: "none"}} to='/admin/dashboard'>Dashboard</Link>
        </li>
        <li className='py-3'>
            <img src={logo} width={20} height={20} alt="" />
           <Link style={{textDecoration: "none"}} to='/admin/dashboard'>Found Item</Link>
        </li>
        <li className='py-3'>
            <img src={logo} width={20} height={20} alt="" />
           <Link style={{textDecoration: "none"}} to='/admin/dashboard'>Customer Report</Link>
        </li>
        <li className='py-3'>
            <img src={logo} width={20} height={20} alt="" />
           <Link style={{textDecoration: "none"}} to='/admin/dashboard'>Report</Link>
        </li>
        <li className='py-3'>
            <img src={logo} width={20} height={20} alt="" />
           <Link style={{textDecoration: "none"}} to='/admin/dashboard'>Sing Out</Link>
        </li>
      </ul>
    </div>
  )
}

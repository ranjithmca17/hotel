import React from 'react'
import "./sidebar.css"
import add_icon from "../../assets/add_icon.png"
import oder_icon from "../../assets/order_icon.png"
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='sidebar'>
      
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
            <img src={add_icon} alt="" />
            <p>Add Items</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
            <img src={oder_icon} alt="" />
            <p>List Items</p>
        </NavLink>

        <NavLink to='/orders' className="sidebar-option">
            <img src={oder_icon} alt="" />
            <p>Order</p>
        </NavLink>
      </div>
    </div>
  )
}

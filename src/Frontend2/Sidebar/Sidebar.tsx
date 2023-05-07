import React from 'react';
import './style.scss';
import { SlHome, SlLogout } from 'react-icons/sl'
import { CiSettings } from 'react-icons/ci'
import { MdOutlineSupervisorAccount } from 'react-icons/md'
const Sidebar = () => {
  return (
    <div className="sidebar">
        <div>
            <div className="nav-brand">
              <h1>LOGO</h1>
            </div>
            <div className='side-bar-menu'>
              <div className="avatar">
                      <div className='avatar-img'>
                        <img src='./public/assets/Profile.png'/>
                      </div>
                      <div>
                          <p>Michael Smith</p>
                            <select name="" id="">
                              <option value="">Admin</option>
                            </select>
                      </div>
              </div>
              <ul className='dashboard-menu'>
                           
                  <li className='dashboard-menu-item'>
                    <span className='icon left-icon'><SlHome /></span>
                    <span>Home</span>
                  </li>
                  <li className='dashboard-menu-item'>
                    <span className='icon left-icon'><MdOutlineSupervisorAccount /></span>
                    Departments
                  </li>
                  <li className='dashboard-menu-item'>
                    Lecturers 
                    <span className='icon right-icon'><CiSettings /></span>
                  </li>
                  <li className='dashboard-menu-item'>
                    Statistics 
                    <span className='icon right-icon'><CiSettings /></span>
                  </li>
              </ul>
            </div>
        </div>
        <ul className="siderbar-bottom">
          <li>
            Setting 
            <span className='icon right-icon'><CiSettings /></span>
          </li>
          <li>
            Log out
            <span className='icon right-icon'><SlLogout /></span>
          </li>
        </ul>
    </div>
  )
}

export default Sidebar;
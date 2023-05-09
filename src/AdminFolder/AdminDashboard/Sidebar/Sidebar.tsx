import React, {useState, useEffect} from 'react';
import './index.scss';
import { SlHome, SlLogout } from 'react-icons/sl'
import { CiSettings } from 'react-icons/ci'
import { MdOutlineSupervisorAccount } from 'react-icons/md'
import { HiTrendingUp } from 'react-icons/hi';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {

  return (
    <div className="sidebar">
        <div>
            <div className="nav-brand">
              <p>P.Net</p>
            </div>
            <div className='side-bar-menu'>
              <div className="avatar">
                      <div className='avatar-img'>
                        <img src='/public/assets/Profile.png'/>
                      </div>
                      <div>
                          <p>Michael Smith</p>
                            <select name="" id="">
                              <option value="">Admin</option>
                            </select>
                      </div>
              </div>
              <ul className='dashboard-menu'>
                           
                  <li className='dashboard-menu-item home'>
                    <NavLink to='/dashboard/admin'>
                      <span className='icon left-icon'><SlHome /></span>
                      <span>Home</span>
                    </NavLink>
                    
                  </li>
                  <li className='dashboard-menu-item departments'>
                    <NavLink to='/dashboard/departments'>
                      <span className='icon left-icon'><HiOutlineBuildingOffice /></span>
                      <span>Departments</span>
                    </NavLink>
                    
                  </li>
                  <li className='dashboard-menu-item lecturers'>
                    <NavLink to='/dashboard/lecturers'>
                      <span className='icon left-icon'><MdOutlineSupervisorAccount /></span>
                      <span>Lecturers</span>
                    </NavLink>
                     
                  </li>
                  <li className='dashboard-menu-item statistics'>
                    <NavLink to='/dashboard/statistics'>
                      <span className='icon left-icon'><HiTrendingUp/></span>
                      <span>Statistics</span>
                    </NavLink>
                    
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
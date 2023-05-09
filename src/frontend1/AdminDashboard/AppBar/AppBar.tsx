import React from 'react';
import './index.scss';
import {RiSearch2Line} from 'react-icons/ri';
import {useLocation} from 'react-router-dom'

const AppBar = () => {
  const location = useLocation()
  return (
        <div className="main-content">
          <div className="top-bar">
            <div className='top-element'>
              <p>
                {
                  location.pathname==='/dashboard/admin'? "Home":
                  location.pathname==='/dashboard/departments'? "Departments":
                  location.pathname==='/dashboard/lecturers'? "Lecturers":
                  location.pathname==='/dashboard/statistics'? "Statistics": ""
                }
              </p>
              <span>May 5th 2023</span>
            </div>

            <div className='search-element'>
              <input type='text' id='search' name='search' placeholder='Search'/>
              <span className="icon">
                <RiSearch2Line/>
              </span>
            </div>
          </div>
        </div>
  )
}

export default AppBar;
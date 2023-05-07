import React from 'react';
import './homes.scss';
import FirstPage from '../FirstPage/FirstPage';
import {RiSearch2Line} from 'react-icons/ri';

const Homey = () => {
  return (
    // <div className='homey-container'>
    //     <div className='homey'>
    //     <div>
    //     <div className='heading'>Home</div>
    //     <p>May 5th 2023</p>
    //     </div>

    //     <div className='search-bar'>
    //         <input type='text' id='search' 
    //         name='search' 
    //         placeholder='Search'/>
    //         <div><img src='./public/assets/search.png'/></div>
    //     </div>
    //     </div>

    //     <div className='grid'>
    //         <div className='feature'>Lecturers</div>
    //         <div className='features'>Students</div>
    //         <div className='features'>Assignments</div>
    //         <div className='features'>Submission</div>
    //     </div>
        
        
    // </div>
  
        <div className="main-content">
          <div className="top-bar">
            <div className='top-element'>
              <p>Home</p>
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

export default Homey;
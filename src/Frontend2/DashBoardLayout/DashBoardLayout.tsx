import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import Homey from '../Homey/Homey'
import './dashboardLayout.scss';

const DashBoardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <section className='dashboard-layout'>
        <Sidebar/>
        <div className="mainContent">
        <Homey/>
        {children}
        </div>
    </section>
  )
}

export default DashBoardLayout
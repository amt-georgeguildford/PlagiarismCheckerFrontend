import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import ToolBar from './ToolBar/ToolBar';
import './index.scss';
import {Outlet} from 'react-router-dom'

const AdminDashboard = () => {

  return (
    <section className="dashboard-layout">
      <Sidebar/>
        <div className="main-content">
          <ToolBar/>
            {<Outlet />}
        </div>
    </section>
  )
}

export default AdminDashboard
import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import AppBar from './AppBar/AppBar';
import Home from './Home/Home';
import './index.scss';
import {Outlet} from 'react-router-dom'

const AdminDashboard = () => {

  return (
    <section className="dashboard-layout">
      <Sidebar/>
        <div className="main-content">
          <AppBar/>
            {<Outlet />}
        </div>
    </section>
  )
}

export default AdminDashboard
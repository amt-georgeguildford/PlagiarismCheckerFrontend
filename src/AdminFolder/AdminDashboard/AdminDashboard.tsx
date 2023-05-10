import  {useState} from 'react';
import Sidebar from './Sidebar/Sidebar';
import ToolBar from './ToolBar/ToolBar';
import './index.scss';
import {Outlet} from 'react-router-dom'
import Logout from '../../Components/Logout/Logout';

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <section className="dashboard-layout">
      <Sidebar setShowModal={setShowModal}/>
        <div className="main-content">
          <ToolBar/>
            {<Outlet />}
            {showModal && <Logout showModal={showModal} setShowModal={setShowModal}/>}
        </div>
    </section>
  )
}

export default AdminDashboard
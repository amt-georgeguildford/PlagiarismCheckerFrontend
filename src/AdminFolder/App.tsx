
import './App.css'
import AdminDashboard from './AdminDashboard/AdminDashboard'
import {Routes, Route, BrowserRouter as Router,} from 'react-router-dom'
import Home from './AdminDashboard/Home/Home'
import Departments from './AdminDashboard/Departments/Departments'
import Lecturers from './AdminDashboard/Lecturers/Lecturers'
import Statistics from './AdminDashboard/Statistics/Statistics'

function App() {
  

  return (
    <>
        <Router>
          <Routes>
            <Route path='/dashboard' element={<AdminDashboard />}>
              <Route path='admin' element={<Home />} />
              <Route path='departments' element={<Departments />} />
              <Route path='lecturers' element={<Lecturers />} />
              <Route path='statistics' element={<Statistics />} />

            </Route>
          </Routes>
        </Router>
        
    </>
  )
}

export default App

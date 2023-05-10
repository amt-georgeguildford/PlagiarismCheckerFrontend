import  {useState, useEffect} from 'react'
import './index.scss';
import axios from 'axios';
import { SERVER_URL } from '../../../Constants/Constants';
import { DatabaseStat } from '../../../utilis/Types';

const Home = () => {
  const [stats, setStats] = useState({} as DatabaseStat);
  // const [lecturerNumber, setLecturerNumber] = useState("");
  // const [studentNumber, setStudentNumber] = useState("");
  // const [totalAssignment, setTotalAssignment] = useState("");
  // const [submissions, setsubmissions] = useState("");




useEffect(()=>{
  const fetchDatabaseNumber= async ()=>{
    try {
      const databaseNumber= await axios(SERVER_URL+'api/v1/admin/stats')
      const {data}= databaseNumber.data
      setStats(data)
    } catch (error) {
      
    }
  }

  fetchDatabaseNumber()
},[])

  return (
    <div className='flex'>
        <div className='first-page'>
            <div className='page-items'>
                <div><img src='/public/assets/logo.png' alt=''/></div>
                {
                  Object.keys(stats).length>0 &&
                              <p>{stats.lecturers} Lecturers</p>
                }
                <small>currently registered</small>
            </div>
                 <div className='page-items'>
                     <div><img src='/public/assets/logo.png' alt=''/></div>
                      {
                        Object.keys(stats).length>0 &&
                                    <p>{stats.students} Students</p>
                      }
                     <small>currently enrolled</small>
                 </div>
                     <div className='page-items'>
                        <div><img src='/public/assets/logo.png' alt=''/></div>
                        {
                        Object.keys(stats).length>0 &&
                                    <p>{stats.assignments} Assignments</p>
                      }
                        <small>created</small>
                     </div>
                        <div className='page-items'>
                         <div><img src='/public/assets/logo.png' alt=''/></div>
                         {
                        Object.keys(stats).length>0 &&
                                    <p>{stats.submissions} Submission</p>
                      }
                         <small>made by students</small>
                        </div>
        </div>
                <div className='null-work'>
                     <img src='/public/assets/no-work-done.png' alt=''/>
                    
                        <p>You have not made any change
                        for your organisation yet</p>
                </div>
    </div>
  )
}

export default Home;
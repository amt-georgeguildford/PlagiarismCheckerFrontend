import React, {useState, useEffect} from 'react'
import './index.scss';
import axios from 'axios';

const Home = () => {
  const [collations, setCollations] = useState([]);
  const [lecturerNumber, setLecturerNumber] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [totalAssignment, setTotalAssignment] = useState("");
  const [submissions, setsubmissions] = useState("");

const fetchData = async() =>{
const response = await axios.get(`/api/dashboardInfo/data`);
const collations = await response.json();
setCollations(collations);
}

useEffect(() =>{
fetchData();
}, [collations]);

  return (
    <div className='flex'>
        <div className='first-page'>
            <div className='page-items'>
                <div><img src='/public/assets/logo.png' alt=''/></div>
                 <p>2,041 Students</p>
                <small>currently registered</small>
            </div>
                 <div className='page-items'>
                     <div><img src='/public/assets/logo.png' alt=''/></div>
                     <p>1,071 Students</p>
                     <small>currently enrolled</small>
                 </div>
                     <div className='page-items'>
                        <div><img src='/public/assets/logo.png' alt=''/></div>
                        <p>941 Assignments </p>
                        <small>created</small>
                     </div>
                        <div className='page-items'>
                         <div><img src='/public/assets/logo.png' alt=''/></div>
                         <p>202 Submissions</p>
                         <small>made by students</small>
                        </div>
        </div>
                <div className='null-work'>
                     <img src='/public/assets/no-work-done.png' alt=''/>
                    
                        <small>You have not made any change<br/>
                        for your organisation yet</small>
                </div>
    </div>
  )
}

export default Home;
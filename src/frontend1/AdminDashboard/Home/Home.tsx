import React from 'react'
import './index.scss';

const Home = () => {
  return (
    <div className='flex'>
        <div className='first-page'>
            <div className='page-items'>
                <div>Logo</div>
                 <p>2,041 Students</p>
                <small>currently registered</small>
            </div>
                 <div className='page-items'>
                     <div>Logo</div>
                     <p>1,071 Students</p>
                     <small>currently enrolled</small>
                 </div>
                     <div className='page-items'>
                        <div>Logo</div>
                        <p>941 Assignments </p>
                        <small>created</small>
                     </div>
                        <div className='page-items'>
                         <div>Logo</div>
                         <p>202 Submissions</p>
                         <small>made by students</small>
                        </div>
        </div>
                <div className='null-work'>
                     <img src='/public/assets/no-work-done.png'>
                     </img>
                        <small>You have not made any change<br/>
                        for your organisation yet</small>
                </div>
    </div>
  )
}

export default Home;
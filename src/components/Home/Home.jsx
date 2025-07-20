import React from 'react'
import "../../css/homestyle.css"
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

    const navigateToAddJob=()=>{
navigate("/post-job")
    }

    const navigateToSearchJob=()=>{
navigate("/find-job")
    }

    const navigateToInterview = ()=>{
        
    }

  return (
    <div>
      <span className='imgbtn'>
        <div className="img-item">
    <img src="/addjob.png" alt="Add Job" onClick={navigateToAddJob} title="Post Job"/>
    <p>Post Job</p>
  </div>
  <div className="img-item">
    <img src="/searchjob.png" alt="Search Job" onClick={navigateToSearchJob} title="Search Job"/>
    <p>Search Job</p>
  </div>
  <div className="img-item">
    <img src="/interview.png" alt="Interviews" onClick={navigateToInterview} title="Interviews"/>
    <p>Interviews</p>
  </div>
      </span>
    </div>
  )
}

export default Home

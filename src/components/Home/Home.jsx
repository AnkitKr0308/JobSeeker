import React from 'react'
import "../../css/homestyle.css"

function Home() {

    const navigateToAddJob=()=>{

    }

    const navigateToSearchJob=()=>{

    }

    const navigateToManageUsers = ()=>{
        
    }

  return (
    <div>
      <span className='imgbtn'>
        <img src="/addjob.png" alt="Add Job" onClick={navigateToAddJob} title="Post Job"/>
        <img src="/searchjob.png" alt="Search Job" onClick={navigateToSearchJob} title="Search Job"/>
        <img src="/manageuser.png" alt="Manage Users" onClick={navigateToManageUsers} title="Manage User"/>
      </span>
    </div>
  )
}

export default Home

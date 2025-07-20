import React from 'react'
import "../../css/homestyle.css"

function Home() {

  

    const navigateToManageUsers = ()=>{
        
    }

  return (
    <div>
      <span className='imgbtn'>
      
  <div className="img-item">
    <img src="/manageuser.png" alt="Manage Users" onClick={navigateToManageUsers} title="Manage User"/>
    <p>Manage Users</p>
  </div>
      </span>
    </div>
  )
}

export default Home

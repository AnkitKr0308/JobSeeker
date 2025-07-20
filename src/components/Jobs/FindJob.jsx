import React, { useEffect, useState } from 'react'
import Card from '../templates/Card'
import Button from '../templates/Button'
import { findJob } from '../../store/jobSlice'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

function FindJob({search=""}) {
    const dispatch = useDispatch()
    const [jobs, SetJobs] = useState([])

    useEffect(()=>{
        const fetchedJobs = async()=>{
try{
   const result =  await dispatch(findJob(search))
   console.log("Dispatch Result:", result);
console.log("Payload:", result.payload);

    SetJobs(Array.isArray(result.payload.fetchedjobdata )? result.payload.fetchedjobdata : [])
}catch(e){
    console.error("Error fetching jobs", e)
}

    }
    fetchedJobs()
    
    }, [dispatch, search])

      console.log(jobs)

  return (
    <div>
        {Array.isArray(jobs)&&jobs.map((job)=>(
            <div className="card-container" key={job.jobId} >
 <Card 

 
 title={`Job No: ${job.jobId}`}
 subtitle={`Title: ${job.title}`}
 description={`Skills Required: ${job.skillsRequired}`}
 footer={<>
    <NavLink key="view" to="#">View More</NavLink>
    <Button key="apply" label="Apply Now" />
  </>}
 /></div>
       
        ))}
     
    </div>
  )
}

export default FindJob

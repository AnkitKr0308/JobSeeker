import React, { useEffect, useState } from "react";
import Input from "../templates/Input";

import { getJobByJobID } from "../../store/jobSlice";
import { useDispatch, useSelector } from "react-redux";

function JobDetails({ jobid }) {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.job.loading);

  const fields = [
    { id: "jobId", label: "Job ID", readOnly: true },
    { id: "title", label: "Title", readOnly: true },
    {
      id: "description",
      label: "Description",
      readOnly: true,
      type: "text-area",
    },
    { id: "skillsRequired", label: "Skills Required", readOnly: true },
    { id: "qualifications", label: "Qualifications", readOnly: true },
    { id: "role", label: "Job Role", readOnly: true },
    { id: "locations", label: "Locations", readOnly: true },
    { id: "type", label: "Job Type", readOnly: true },
    { id: "experience", label: "Experience", readOnly: true },
  ];

  useEffect(() => {
    const getJobDetails = async () => {
      if (!jobid) return;
      try {
        const jobdetails = await dispatch(getJobByJobID(jobid));
        if (jobdetails?.payload?.result?.jobs?.[0]) {
          setFormData(jobdetails.payload.result.jobs[0]);
        }
      } catch (e) {
        console.error("Error getting job details", e);
      }
    };
    getJobDetails();
  }, [dispatch, jobid]);

  if (loading) return <p>Loading...</p>;

  const visibleFields = fields.filter(
    (field) =>
      formData[field.id] !== undefined &&
      formData[field.id] !== null &&
      formData[field.id] !== ""
  );

  return (
    <div className="postjob-container">
      <Input fields={visibleFields} formData={formData} />
    </div>
  );
}

export default JobDetails;

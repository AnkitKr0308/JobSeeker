import React, { useEffect, useState } from "react";
import Card from "../templates/Card";
import Input from "../templates/Input";
import { useDispatch, useSelector } from "react-redux";
import { appliedJobs } from "../../store/jobSlice";
import JobDetails from "./JobDetails";
import { NavLink } from "react-router-dom";

function AppliedJobs() {
  const [searchValue, SetSearchValue] = useState("");
  const [jobs, SetJobs] = useState([]);
  const dispatch = useDispatch();
  const [selectedJobId, setSelectedJobId] = useState(null);
  const loading = useSelector((state) => state.job.loading);

  const handleSearchChange = (e) => {
    const { id, value } = e.target;
    SetSearchValue((prev) => ({ ...prev, [id]: value }));
  };

  const fields = [
    {
      id: "searchbox",
      placeholder: "Search here...",
      type: "text",
    },
  ];

  const handleViewDetails = (jobId) => {
    setSelectedJobId((prevId) => (prevId === jobId ? null : jobId));
  };

  useEffect(() => {
    const fetchedJobs = async () => {
      try {
        const result = await dispatch(appliedJobs(searchValue.searchbox || ""));

        const allJobs = Array.isArray(result.payload.appliedjobs)
          ? result.payload.appliedjobs
          : [];

        const filteredJobs = allJobs.filter((job) =>
          job.title
            .toLowerCase()
            .includes((searchValue.searchbox || "").toLowerCase())
        );

        SetJobs(filteredJobs);
      } catch (e) {
        console.error("Error fetching jobs", e);
      }
    };
    fetchedJobs();
  }, [dispatch, searchValue]);

  return (
    <div className="findjob-container" style={{ marginTop: "12px" }}>
      <div className="searchbox">
        <Input
          fields={fields}
          onChange={handleSearchChange}
          formData={searchValue}
        />
      </div>
      <div>
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => {
            const isExpanded = selectedJobId === job.id;

            return (
              <div className="card-container" key={job.id}>
                <Card
                  isExpanded={isExpanded}
                  title={
                    isExpanded
                      ? `Job Details: ${job.jobId}`
                      : `Job No: ${job.jobId}`
                  }
                  subtitle={`Title: ${job.title}`}
                  description={job.skillsRequired}
                  footer={
                    <>
                      {isExpanded && (
                        <div className="job-details-inside-card">
                          <JobDetails jobid={job.jobId} />
                        </div>
                      )}
                      <div className="card-footer-content">
                        <NavLink
                          onClick={() => handleViewDetails(job.id)}
                          className="view-link"
                        >
                          {isExpanded ? "Hide Details" : "View Details"}
                        </NavLink>
                      </div>
                    </>
                  }
                />
              </div>
            );
          })
        ) : (
          <div className="no-jobs-message">
            {loading
              ? "Loading..."
              : searchValue.searchbox?.trim()
              ? `No jobs found for "${searchValue.searchbox}"`
              : "You haven't applied for any jobs yet."}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppliedJobs;

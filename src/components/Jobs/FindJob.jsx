import React, { useEffect, useState } from "react";
import Card from "../templates/Card";
import Button from "../templates/Button";
import { findJob } from "../../store/jobSlice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Input from "../templates/Input";
import "../../css/card.css";

function FindJob() {
  const dispatch = useDispatch();
  const [jobs, SetJobs] = useState([]);
  const [searchValue, SetSearchValue] = useState("");

  const handleSearchChange = (e) => {
    const { id, value } = e.target;
    SetSearchValue((prev) => ({ ...prev, [id]: value }));
  };

  const fields = [
    {
      id: "searchbox",
      placeholder: "Type here to search jobs...",
      type: "text",
    },
  ];

  useEffect(() => {
    const fetchedJobs = async (e) => {
      try {
        const result = await dispatch(findJob(searchValue.searchbox || ""));

        SetJobs(
          Array.isArray(result.payload.fetchedjobdata)
            ? result.payload.fetchedjobdata
            : []
        );
      } catch (e) {
        console.error("Error fetching jobs", e);
      }
    };
    fetchedJobs();
  }, [dispatch, searchValue]);

  return (
    <>
      <div className="searchbox">
        <Input
          fields={fields}
          onChange={handleSearchChange}
          formData={searchValue}
        />
      </div>
      <div>
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="card-container" key={job.jobId}>
              <Card
                title={`Job No: ${job.jobId}`}
                subtitle={`Title: ${job.title}`}
                description={`Skills Required: ${job.skillsRequired}`}
                footer={
                  <>
                    <NavLink key="view" to="#">
                      View Details
                    </NavLink>
                    <Button key="apply" label="Apply Now" />
                  </>
                }
              />
            </div>
          ))
        ) : (
          <div className="no-jobs-message">
            {searchValue.searchbox?.trim()
              ? `No jobs found for "${searchValue.searchbox}"`
              : "No jobs available at the moment."}
          </div>
        )}
      </div>
    </>
  );
}

export default FindJob;

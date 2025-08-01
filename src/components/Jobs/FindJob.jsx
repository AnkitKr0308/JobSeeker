import React, { useEffect, useState } from "react";
import Card from "../templates/Card";
import Button from "../templates/Button";
import { CheckAppliedJobs, findJob } from "../../store/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Input from "../templates/Input";
import "../../css/card.css";
import JobDetails from "./JobDetails";
import Slider from "../templates/Slider";
import ApplyJob from "./ApplyJob";
import Modal from "../templates/Modal";

function FindJob() {
  const dispatch = useDispatch();
  const [jobs, SetJobs] = useState([]);
  const [searchValue, SetSearchValue] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const loading = useSelector((state) => state.job.loading);
  const [openSlider, setOpenSlider] = useState(false);
  const [formResetKey, setFormResetKey] = useState(0);
  const [modalData, setModalData] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleCloseSlider = () => {
    setOpenSlider(false);
    setFormResetKey((prev) => prev + 1);
  };

  const handleSearchChange = (e) => {
    const { id, value } = e.target;
    SetSearchValue((prev) => ({ ...prev, [id]: value }));
  };

  const handleViewDetails = (jobId) => {
    setSelectedJobId((prevId) => (prevId === jobId ? null : jobId));
  };

  const fields = [
    {
      id: "searchbox",
      placeholder: "Type here to search jobs...",
      type: "text",
    },
  ];

  useEffect(() => {
    const fetchedJobs = async () => {
      try {
        const result = await dispatch(findJob());

        const allJobs = Array.isArray(result.payload.fetchedjobdata)
          ? result.payload.fetchedjobdata
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

  const handleApplyNow = async (jobId) => {
    setSelectedJobId(jobId);
    const checked = await dispatch(CheckAppliedJobs({ jobId }));
    if (
      checked.payload.result.success &&
      checked.payload.result.message === "You have already applied for this job"
    ) {
      setOpenModal(true);
      setModalData("You have already applied for this job");
    } else {
      setOpenSlider(true);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

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
            const isExpanded = selectedJobId === job.jobId;

            return (
              <div className="card-container" key={job.jobId}>
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
                          onClick={() => handleViewDetails(job.jobId)}
                          className="view-link"
                        >
                          {isExpanded ? "Hide Details" : "View Details"}
                        </NavLink>
                        <Button
                          className="apply-button"
                          label="Apply Now"
                          onClick={() => handleApplyNow(job.jobId)}
                        />
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
              : "No jobs available at the moment."}
          </div>
        )}
      </div>
      {openModal && (
        <Modal isOpen={openModal} onClose={closeModal} message={modalData}>
          <Button label="OK" onClick={closeModal} />
        </Modal>
      )}
      {
        <Slider
          isOpen={openSlider}
          title="Apply Job"
          onClose={handleCloseSlider}
        >
          <ApplyJob
            key={formResetKey}
            jobId={selectedJobId}
            onSuccess={handleCloseSlider}
          />
        </Slider>
      }
    </div>
  );
}

export default FindJob;

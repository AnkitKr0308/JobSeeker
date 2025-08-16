import React, { useEffect, useState } from "react";
import Input from "../templates/Input";
import Card from "../templates/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  applications,
  scheduleInterview,
  UpdateApplicationStatus,
} from "../../store/jobSlice";
import JobDetails from "./JobDetails";
import { NavLink } from "react-router-dom";
import Button from "../templates/Button";
import Slider from "../templates/Slider";
import ProjectSection from "../Navbar/Profile/ProjectSection";
import ProfileSection from "../Navbar/Profile/ProfileSection";
import WorkExSection from "../Navbar/Profile/WorkExSection";
import Modal from "../templates/Modal";
import Calendar from "../templates/Calendar";

function Applications() {
  const [searchValue, SetSearchValue] = useState("");
  const [appliedjobs, SetAppliedJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.job.loading);
  const [openSlider, setOpenSlider] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  // const [disableBtn, setDisableBtn] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [allJobs, setAllJobs] = useState([]);

  const handleCloseSlider = () => {
    setOpenSlider(false);
  };

  const updateApplicationStatusInState = (applicationId, newStatus) => {
    SetAppliedJobs((prev) =>
      prev.map((item) =>
        item.application.applicationId === applicationId
          ? {
              ...item,
              application: { ...item.application, status: newStatus },
            }
          : item
      )
    );
  };

  const handleUserProfile = async (application, userProfile) => {
    if (application && userProfile) {
      setSelectedApplication(application);
      setSelectedUserProfile(userProfile);
      setOpenSlider(true);

      if (application.status === "Applied") {
        const updatedstatus = "Application Viewed";
        const result = await dispatch(
          UpdateApplicationStatus({
            applicationId: application.applicationId,
            status: updatedstatus,
          })
        );
        if (result.payload?.success) {
          updateApplicationStatusInState(
            application.applicationId,
            updatedstatus
          );
        }
      }
    }
  };

  const searchFields = [
    {
      id: "searchbox",
      placeholder: "Type here to search jobs...",
      type: "text",
    },
  ];

  const userFields = [
    { id: "currentLocation", label: "Current Location", readOnly: true },
    { id: "noticePeriod", label: "Notice Period", readOnly: true },
    { id: "readyToRelocate", label: "Ready To Relocate?", readOnly: true },
  ];

  const handleViewDetails = (id) => {
    setSelectedJobId((prevId) => (prevId === id ? null : id));
  };

  const handleSearchChange = (e) => {
    const { id, value } = e.target;
    SetSearchValue((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const fetchedJobs = async () => {
      try {
        const result = await dispatch(applications());

        const allItems = Array.isArray(result.payload.result)
          ? result.payload.result
          : [];
        setAllJobs(allItems);
        SetAppliedJobs(allItems);
      } catch (e) {
        console.error("Error fetching jobs", e);
      }
    };
    fetchedJobs();
  }, [dispatch]);

  useEffect(() => {
    if (!searchValue.searchbox) {
      SetAppliedJobs(allJobs);
    } else {
      const query = searchValue.searchbox.toLowerCase();
      const fieldsToSearch = [
        "jobTitle",
        "jobId",
        "jobDescription",
        "skillsRequired",
        "jobQualifications",
        "jobLocations",
        "jobExperience",
        "userId",
      ];

      const filteredItems = allJobs.filter(({ application }) =>
        fieldsToSearch.some((field) =>
          application[field]?.toLowerCase().includes(query)
        )
      );
      SetAppliedJobs(filteredItems);
    }
  }, [searchValue, allJobs]);

  const chooseSlot = () => {
    setSelectedDateTime("");
    setOpenModal(true);
  };

  const confirmInterview = async () => {
    if (!selectedDateTime) {
      alert("Please select a date and time for the interview.");
      return;
    }
    const payload = {
      // id: selectedApplication.id,
      applicationId: selectedApplication.applicationId,
      jobId: selectedApplication.jobId,
      userId: selectedApplication.userId,
      interviewDate: selectedDateTime.toISOString(),
    };

    const result = await dispatch(scheduleInterview(payload));
    if (result?.payload?.success) {
      setOpenModal(false);
      // setDisableBtn(true);
      updateApplicationStatusInState(
        selectedApplication.applicationId,
        "Interview Scheduled"
      );
      setAlertMessage("Interview Scheduled");

      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  };

  const rejectApplication = async () => {
    const updatedstatus = "Rejected";

    const isConfirmed = window.confirm(
      "Are you sure you want to reject this application?"
    );

    if (!isConfirmed) {
      return;
    }

    const result = await dispatch(
      UpdateApplicationStatus({
        applicationId: selectedApplication.applicationId,
        status: updatedstatus,
      })
    );
    if (result.payload?.success) {
      updateApplicationStatusInState(
        selectedApplication.applicationId,
        updatedstatus
      );
      setAlertMessage("Application Rejected");

      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  };

  return (
    <div className="findjob-container" style={{ marginTop: "12px" }}>
      {alertMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor:
              alertMessage === "Interview Scheduled" ? "#4CAF50" : "#f44336",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            zIndex: 9999,
            boxShadow: "0px 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          {alertMessage}
        </div>
      )}
      <div className="searchbox">
        <Input
          fields={searchFields}
          onChange={handleSearchChange}
          formData={searchValue}
        />
      </div>
      <div>
        {Array.isArray(appliedjobs) && appliedjobs.length > 0 ? (
          appliedjobs.map(({ application, userProfile }) => {
            const isExpanded = selectedJobId === application.id;

            return (
              <div className="card-container" key={application.id}>
                <Card
                  isExpanded={isExpanded}
                  title={
                    isExpanded
                      ? `Job Details: ${application.jobId}`
                      : `Job No: ${application.jobId}`
                  }
                  status={application.status}
                  subtitle={`Title: ${application.jobTitle}`}
                  description={application.skillsRequired}
                  descriptionLabel="Skills Required"
                  subdescription={`${application.jobExperience} | ${application.jobQualifications} | ${application.jobLocations}`}
                  footer={
                    <>
                      {isExpanded && (
                        <>
                          <div className="job-details-inside-card">
                            <JobDetails jobid={application.jobId} />
                          </div>
                        </>
                      )}
                      <div
                        className="card-footer-content"
                        style={{ marginTop: "12px" }}
                      >
                        <NavLink
                          onClick={() => handleViewDetails(application.id)}
                          className="view-link"
                        >
                          {isExpanded ? "Hide Details" : "View Details"}
                        </NavLink>
                        <Button
                          className="btn-blue"
                          label="View User"
                          onClick={() =>
                            handleUserProfile(application, userProfile)
                          }
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

      {openSlider && selectedApplication && selectedUserProfile && (
        <Slider
          isOpen={openSlider}
          title="User Profile"
          onClose={handleCloseSlider}
        >
          <div
            className="job-details-inside-card"
            style={{ marginBottom: "15px" }}
          >
            <ProfileSection
              userId={selectedApplication.userId}
              formData={selectedUserProfile}
            />
            <ProjectSection
              formData={selectedUserProfile.projects}
              isEditing={false}
            />
            <WorkExSection
              formData={selectedUserProfile.workExperiences}
              isEditing={false}
            />
            <div className="profile-card">
              <Input fields={userFields} formData={selectedApplication || {}} />
              <div className="slider-footer-buttons-row">
                <Button
                  className="btn-blue"
                  label="Schedule Interview"
                  onClick={chooseSlot}
                  disabled={
                    selectedApplication?.status === "Interview Scheduled"
                  }
                />

                <Button
                  className="btn-red"
                  label="Reject"
                  onClick={rejectApplication}
                />
              </div>
            </div>
          </div>
        </Slider>
      )}
      {openModal && (
        <Modal
          isOpen={openModal}
          title="Select Interview Slot"
          onClose={() => setOpenModal(false)}
        >
          <Calendar value={selectedDateTime} onChange={setSelectedDateTime} />
          <Button label="Confirm" onClick={confirmInterview} />
        </Modal>
      )}
    </div>
  );
}

export default Applications;

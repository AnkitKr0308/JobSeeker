import React, { useEffect, useState } from "react";
import Input from "../templates/Input";
import Card from "../templates/Card";
import { useDispatch, useSelector } from "react-redux";
import { applications } from "../../store/jobSlice";
import JobDetails from "./JobDetails";
import { NavLink } from "react-router-dom";
import Button from "../templates/Button";
import Slider from "../templates/Slider";
import ProjectSection from "../Navbar/Profile/ProjectSection";
import ProfileSection from "../Navbar/Profile/ProfileSection";
import WorkExSection from "../Navbar/Profile/WorkExSection";

function Applications() {
  const [searchValue, SetSearchValue] = useState("");
  const [appliedjobs, SetAppliedJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.job.loading);
  const [openSlider, setOpenSlider] = useState(false);

  const handleCloseSlider = () => {
    setOpenSlider(false);
  };

  const handleUserProfile = (application, userProfile) => {
    if (application && userProfile) {
      setSelectedApplication(application);
      setSelectedUserProfile(userProfile);
      setOpenSlider(true);
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

        const filteredItems = allItems.filter((item) =>
          item?.application?.jobTitle
            ?.toLowerCase()
            .includes((searchValue.searchbox || "").toLowerCase())
        );

        SetAppliedJobs(filteredItems);

        console.log("Filtered Jobs:", filteredItems);
        SetAppliedJobs(filteredItems);
        console.log("All Jobs:", allItems);
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
                  subtitle={`Title: ${application.jobTitle}`}
                  description={application.skillsRequired}
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
                          className="apply-button"
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
              <div className="slider-footer-button">
                <Button className="apply-button" label="Schedule Interview" />
              </div>
            </div>
          </div>
        </Slider>
      )}
    </div>
  );
}

export default Applications;

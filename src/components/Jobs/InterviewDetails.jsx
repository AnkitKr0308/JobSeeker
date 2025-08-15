import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/InterviewDetails.css";
import { useSelector } from "react-redux";

function InterviewDetails() {
  const { state } = useLocation();
  const interview = state || null;
  const user = useSelector((state) => state.auth.data);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!interview) {
      navigate("/unauthorized");
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    const isAdmin = user.role === "Admin";
    const isEmployer = user.role === "Employer";
    const isApplicant =
      user.role === "Employee" && user.userId === interview.userId;

    if (isAdmin || isEmployer || isApplicant) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [interview, user, navigate]);

  useEffect(() => {
    if (isAuthorized === false) {
      navigate("/unauthorized");
    }
  }, [isAuthorized, navigate]);

  if (!interview) {
    return <div className="loading-text">Loading interview details...</div>;
  }

  const formattedDate = new Date(interview.interviewDate).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="interview-container">
      <h1 className="interview-title">{interview.title}</h1>

      <div className="interview-details">
        <p>
          <span className="label">Job ID:</span> {interview.jobId}
        </p>
        <p>
          <span className="label">Interview Date:</span> {formattedDate}
        </p>
      </div>
    </div>
  );
}

export default InterviewDetails;

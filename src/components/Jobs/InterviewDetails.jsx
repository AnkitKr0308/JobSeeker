import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../css/InterviewDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getInterviewbyId } from "../../store/jobSlice";

function InterviewDetails() {
  const { state } = useLocation();
  const { appId } = useParams();
  const [interview, setInterview] = useState(state || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  useEffect(() => {
    const interviewData = async () => {
      if (!user) return;

      try {
        const data = await dispatch(getInterviewbyId(appId));

        if (data.payload?.success) {
          setInterview(data.payload.interviewDetails);
        } else {
          navigate("/unauthorized");
        }
      } catch (err) {
        console.error("Error fetching interview:", err);
        setError("Failed to load interview details");
      } finally {
        setLoading(false);
      }
    };

    interviewData();
  }, [appId, dispatch, navigate, user]);

  if (!user) {
    return (
      <div className="loading-text">Not logged in. Redirecting to login...</div>
    );
  }

  if (loading) {
    return <div className="loading-text">Loading interview details...</div>;
  }

  if (error) {
    return <div className="error-text">{error}</div>;
  }

  if (!interview) {
    return <div className="loading-text">No interview found.</div>;
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

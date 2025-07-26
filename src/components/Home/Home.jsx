import React from "react";
import "../../css/homestyle.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.data);

  const navigateToAddJob = () => {
    navigate("/post-job");
  };

  const navigateToSearchJob = () => {
    navigate("/jobs");
  };

  const navigateToInterview = () => {};

  if (!user) return null;

  return (
    <div>
      <span className="imgbtn">
        {user && (user.role === "Admin" || user.role === "Employer") && (
          <div className="img-item">
            <img
              src="/addjob.png"
              alt="Add Job"
              onClick={navigateToAddJob}
              title="Post Job"
            />
            <p>Post Job</p>
          </div>
        )}

        <div className="img-item">
          <img
            src="/searchjob.png"
            alt="Search Job"
            onClick={navigateToSearchJob}
            title="Search Job"
          />
          <p>Search Job</p>
        </div>
        <div className="img-item">
          <img
            src="/interview.png"
            alt="Interviews"
            onClick={navigateToInterview}
            title="Interviews"
          />
          <p>Interviews</p>
        </div>
      </span>
    </div>
  );
}

export default Home;

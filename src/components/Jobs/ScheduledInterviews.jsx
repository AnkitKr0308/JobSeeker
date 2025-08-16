import React, { useEffect, useState } from "react";
import Card from "../templates/Card";
import { useDispatch, useSelector } from "react-redux";
import { appliedJobs } from "../../store/jobSlice";
import Input from "../templates/Input";
import { useNavigate } from "react-router-dom";

function ScheduledInterviews() {
  const dispatch = useDispatch();
  const [interviews, setInterviews] = useState([]);
  const loading = useSelector((state) => state.job.loading);
  const [searchValue, SetSearchValue] = useState("");
  const navigate = useNavigate();

  const fields = [
    {
      id: "searchbox",
      placeholder: "Search here...",
      type: "text",
    },
  ];

  const handleSearchChange = (e) => {
    const { id, value } = e.target;
    SetSearchValue((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const GetScheduledInterviews = async () => {
      try {
        const result = await dispatch(
          appliedJobs({ status: "Interview Scheduled" })
        );

        console.log(result);
        const allItems = Array.isArray(result.payload.appliedjobs)
          ? result.payload.appliedjobs
          : [];
        setInterviews(allItems);
      } catch (e) {
        console.error("Error fetching interview data");
      }
    };
    GetScheduledInterviews();
  }, [dispatch]);

  useEffect(() => {
    if (!searchValue.searchbox) {
      setInterviews(interviews);
    } else {
      const filteredItems = interviews.filter((job) => {
        const query = searchValue.searchbox.toLowerCase();
        const fieldsToSearch = ["title", "jobId"];

        return fieldsToSearch.some((field) =>
          job[field]?.toLowerCase().includes(query)
        );
      });
      setInterviews(filteredItems);
    }
  }, [searchValue, interviews]);

  return (
    <div className="findjob-container" style={{ marginTop: "12px" }}>
      <div className="searchbox">
        <Input
          fields={fields}
          onChange={handleSearchChange}
          formData={searchValue}
        />
      </div>
      {Array.isArray(interviews) && interviews.length > 0 ? (
        interviews.map((interview) => {
          const formattedDate = new Date(
            interview.interviewDate
          ).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <div className="card-container" key={interview.id}>
              <Card
                title={`Job No: ${interview.jobId}`}
                subtitle={`${interview.title}`}
                description={formattedDate}
                descriptionLabel="Interview Timing"
                onClick={() =>
                  navigate(`/interviews/${interview.applicationId}`, {
                    state: interview,
                  })
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
            : "No Interviews Scheduled."}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterviews;

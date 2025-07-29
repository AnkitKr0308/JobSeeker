import React, { useEffect, useState } from "react";
import Input from "../../templates/Input";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../../store/userSlice";
import "../../../css/profilestyle.css";
import "../../../css/buttonstyle.css";

function ProjectSection({ userId }) {
  const [formData, setFormData] = useState([]);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.data);

  const targetUserId = userId || loggedInUser?.userId;

  const projectFields = [
    { id: "title", label: "Title", readOnly: true },
    { id: "description", label: "Description", readOnly: true },
    { id: "skills", label: "Skills", readOnly: true },
  ];

  useEffect(() => {
    const loadProfile = async () => {
      if (!targetUserId) return;
      const res = await dispatch(userProfile(targetUserId));
      if (res?.payload?.success) {
        const projects = res.payload.profiledata.profiledata.projects;
        setFormData(projects || []);
      }
    };
    loadProfile();
  }, [dispatch, targetUserId, loggedInUser]);

  return (
    <div className="profile-container">
      <h2 className="profile-title">Projects</h2>
      <div className="profile-card">
        {formData.length > 0 ? (
          formData.map((project, index) => (
            <div className="profile-card" key={index}>
              <Input fields={projectFields} formData={project} />
            </div>
          ))
        ) : (
          <p>No projects available</p>
        )}
      </div>
    </div>
  );
}

export default ProjectSection;

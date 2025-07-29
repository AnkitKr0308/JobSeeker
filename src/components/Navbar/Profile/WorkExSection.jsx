import React, { useEffect, useState } from "react";
import Input from "../../templates/Input";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../../store/userSlice";
import "../../../css/profilestyle.css";
import "../../../css/buttonstyle.css";

function WorkExSection({ userId }) {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.data);

  const targetUserId = userId || loggedInUser?.userId;

  const workExFields = [
    { id: "company", label: "Company", readOnly: true },
    { id: "fromDate", label: "From", readOnly: true },
    { id: "toDate", label: "To", readOnly: true },
  ];

  useEffect(() => {
    const loadProfile = async () => {
      if (!targetUserId) return;
      const res = await dispatch(userProfile(targetUserId));
      if (res?.payload?.success) {
        const workex = res.payload.profiledata.profiledata.projects;
        setFormData(workex || []);
      }
    };
    loadProfile();
  }, [dispatch, targetUserId, loggedInUser]);

  return (
    <div className="profile-container">
      <h2 className="profile-title">Work Experiences</h2>
      <div className="profile-card">
        {formData.length > 0 ? (
          formData.map((project, index) => (
            <div className="profile-card" key={index}>
              <Input fields={workExFields} formData={project} />
            </div>
          ))
        ) : (
          <p>No Experience</p>
        )}
      </div>
    </div>
  );
}

export default WorkExSection;

import React, { useEffect, useState } from "react";
import Input from "../../templates/Input";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../../store/userSlice";
import "../../../css/profilestyle.css";
import Button from "../../templates/Button";
import "../../../css/buttonstyle.css";
import { useNavigate } from "react-router-dom";

function WorkExSection({ userId }) {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.data);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const navigate = useNavigate();

  const targetUserId = userId || loggedInUser?.userId;

  const workExFields = [
    { id: "company", label: "Company", readOnly: true },
    { id: "fromDate", label: "From", readOnly: true },
    { id: "toDate", label: "To", readOnly: true },
  ];

  //   const openChangePasswordModal = () => {
  //     navigate("/changepassword");
  //   };

  // useEffect(() => {
  //   const loadUserProfile = async () => {
  //     if (!user?.userId) return;

  //     const profile = await dispatch(userProfile(user.userId));
  //     const profiledata = profile?.payload?.profiledata;

  //     if (profiledata) {
  //       setFormData(profiledata);
  //     } else {
  //       setFormData({});
  //     }
  //   };

  //   loadUserProfile();
  // }, [dispatch, user?.userId]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!targetUserId) return;
      const res = await dispatch(userProfile(targetUserId));
      if (res?.payload?.success) {
        const workex = res.payload.profiledata.profiledata.projects;
        setFormData(workex || []);
        setIsOwnProfile(targetUserId === loggedInUser?.userId);
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

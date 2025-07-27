import React, { useEffect, useState } from "react";
import Input from "../../templates/Input";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../../store/userSlice";
import "../../../css/profilestyle.css";
import Button from "../../templates/Button";
import "../../../css/buttonstyle.css";
import { useNavigate } from "react-router-dom";
import ProfileSection from "./ProfileSection";
import ProjectSection from "./ProjectSection";
import WorkExSection from "./WorkExSection";

function Profile({ userId }) {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.data);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const navigate = useNavigate();

  const targetUserId = userId || loggedInUser?.userId;

  // const profileFields = [
  //   { id: "userId", name: "userId", label: "User ID", readOnly: true },
  //   { id: "name", name: "name", label: "Name", readOnly: true },
  //   { id: "email", name: "email", label: "Email", readOnly: true },
  //   { id: "bio", label: "About", readOnly: true, type: "text-area" },
  //   { id: "contact", name: "contact", label: "Contact", readOnly: true },
  //   { id: "gender", name: "gender", label: "Gender", readOnly: true },
  //   { id: "role", name: "role", label: "Role", readOnly: true },
  //   { id: "portfolioSkills", label: "Skills", readOnly: true },
  //   // { id: "projectID",  label: "Skills", readOnly: true },
  //   // { id: "projectTitle",  label: "Ti", readOnly: true },
  //   // { id: "portfolioSkills",  label: "Skills", readOnly: true },
  //   // { id: "portfolioSkills",  label: "Skills", readOnly: true },
  //   // { id: "portfolioSkills",  label: "Skills", readOnly: true },
  //   // { id: "portfolioSkills",  label: "Skills", readOnly: true },
  //   // { id: "portfolioSkills",  label: "Skills", readOnly: true },
  //   // { id: "portfolioSkills",  label: "Skills", readOnly: true },
  //   // { id: "portfolioSkills",  label: "Skills", readOnly: true },
  //   // { id: "portfolioSkills",  label: "Skills", readOnly: true },
  // ];

  const openChangePasswordModal = () => {
    navigate("/changepassword");
  };

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
      const profile = await dispatch(userProfile(targetUserId));
      if (profile?.payload?.success) {
        setFormData(profile.payload.profiledata.profiledata);
        setIsOwnProfile(targetUserId === loggedInUser?.userId);
      }
    };
    loadProfile();
  }, [dispatch, targetUserId, loggedInUser]);

  return (
    <div className="profile-container">
      <h2 className="profile-title">
        {isOwnProfile ? "My Profile" : "User Profile"}
      </h2>
      <div className="profile-card">
        <ProfileSection />
        <WorkExSection />
        <ProjectSection />

        {isOwnProfile && (
          <div className="btn">
            <Button label="Change Password" onClick={openChangePasswordModal} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

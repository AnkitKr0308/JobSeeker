import React, { useEffect, useState } from "react";
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
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.data);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const navigate = useNavigate();

  const targetUserId = userId || loggedInUser?.userId;

  const openChangePasswordModal = () => {
    navigate("/changepassword");
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!targetUserId) return;
      const profile = await dispatch(userProfile(targetUserId));
      if (profile?.payload?.success) {
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

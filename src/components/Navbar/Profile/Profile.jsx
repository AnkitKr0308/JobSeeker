import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfile, userProfileUpdate } from "../../../store/userSlice";
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
  const [isEditing, SetIsEditing] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [projectsData, setProjectsData] = useState([]);
  const [workExData, setWorkExData] = useState([]);

  const targetUserId = userId || loggedInUser?.userId;

  const openChangePasswordModal = () => {
    navigate("/changepassword");
  };

  const toggleEdit = () => {
    if (!isEditing) {
      if (projectsData.length === 0) setProjectsData([{}]);
      if (workExData.length === 0) setWorkExData([{}]);
    }
    SetIsEditing((prev) => !prev);
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!targetUserId) return;
      const profile = await dispatch(userProfile(targetUserId));
      if (profile?.payload?.success) {
        const data = profile.payload.profiledata.profiledata;
        setIsOwnProfile(targetUserId === loggedInUser?.userId);
        setProfileData(data);
        setProjectsData(data.projects || []);
        setWorkExData(data.workExperiences || []);
      }
    };
    loadProfile();
  }, [dispatch, targetUserId, loggedInUser]);

  const saveProfile = async () => {
    const payload = {
      contact: profileData.contact,
      gender: profileData.gender,
      name: profileData.name,
      email: profileData.email,
      bio: profileData.bio,
      skills: profileData.skills,
      projects: projectsData,
      workExperiences: workExData,
    };

    const res = await dispatch(userProfileUpdate(payload));
    if (res.payload?.success) {
      const updated = await dispatch(userProfile(targetUserId));
      if (updated.payload?.success) {
        const data = updated.payload.profiledata.profiledata;
        setProfileData(data);
        setProjectsData(data.projects || []);
        setWorkExData(data.workExperiences || []);
      }
      SetIsEditing(false);
      alert("Profile updated successfully!");
    } else {
      alert("Update failed: " + res.payload?.message);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header-actions">
        <h2 className="profile-title">
          {isOwnProfile ? "My Profile" : "User Profile"}
        </h2>
        {isOwnProfile && (
          <button type="button" className="add-button" onClick={toggleEdit}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        )}
      </div>

      <div className="profile-card">
        <ProfileSection
          isEditing={isEditing}
          formData={profileData}
          setFormData={setProfileData}
        />
        <WorkExSection
          isEditing={isEditing}
          formData={workExData}
          setFormData={setWorkExData}
        />
        <ProjectSection
          isEditing={isEditing}
          formData={projectsData}
          setFormData={setProjectsData}
        />

        {isOwnProfile && (
          <div className="btn">
            <Button
              label={isEditing ? "Save" : "Change Password"}
              onClick={isEditing ? saveProfile : openChangePasswordModal}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

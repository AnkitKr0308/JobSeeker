import React, { useEffect, useState } from "react";
import Input from "../../templates/Input";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../../store/userSlice";
import "../../../css/profilestyle.css";
import "../../../css/buttonstyle.css";

function ProfileSection({ userId }) {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.data);

  const targetUserId = userId || loggedInUser?.userId;

  const profileFields = [
    { id: "userId", name: "userId", label: "User ID", readOnly: true },
    { id: "name", name: "name", label: "Name", readOnly: true },
    { id: "email", name: "email", label: "Email", readOnly: true },
    { id: "bio", label: "About", readOnly: true, type: "text-area" },
    { id: "contact", name: "contact", label: "Contact", readOnly: true },
    { id: "gender", name: "gender", label: "Gender", readOnly: true },
    { id: "role", name: "role", label: "Role", readOnly: true },
    { id: "skills", label: "Skills", readOnly: true },
  ];

  useEffect(() => {
    const loadProfile = async () => {
      if (!targetUserId) return;
      const profile = await dispatch(userProfile(targetUserId));
      if (profile?.payload?.success) {
        setFormData(profile.payload.profiledata.profiledata);
      }
    };
    loadProfile();
  }, [dispatch, targetUserId, loggedInUser]);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <Input fields={profileFields} formData={formData} />
      </div>
    </div>
  );
}

export default ProfileSection;

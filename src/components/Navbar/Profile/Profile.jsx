import React, { useEffect, useState } from "react";
import Input from "../../templates/Input";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../../store/userSlice";
import "../../../css/profilestyle.css";
import Button from "../../templates/Button";
import "../../../css/buttonstyle.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);

  const navigate = useNavigate();

  const profileFields = [
    { id: "userId", name: "userId", label: "User ID", readOnly: true },
    { id: "name", name: "name", label: "Name", readOnly: true },
    { id: "email", name: "email", label: "Email", readOnly: true },
    { id: "contact", name: "contact", label: "Contact", readOnly: true },
    { id: "gender", name: "gender", label: "Gender", readOnly: true },
    { id: "role", name: "role", label: "Role", readOnly: true },
  ];

  const openChangePasswordModal = () => {
    navigate("/changepassword");
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user?.userId) return;

      const profile = await dispatch(userProfile(user.userId));
      const profiledata = profile?.payload?.profiledata;

      if (profiledata) {
        setFormData(profiledata);
      } else {
        setFormData({});
      }
    };

    loadUserProfile();
  }, [dispatch, user?.userId]);

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      <div className="profile-card">
        <Input fields={profileFields} formData={formData} />
        <div className="btn">
          <Button label="Change Password" onClick={openChangePasswordModal} />
        </div>
      </div>
    </div>
  );
}

export default Profile;

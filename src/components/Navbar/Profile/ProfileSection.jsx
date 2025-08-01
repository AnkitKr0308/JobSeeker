import React from "react";
import Input from "../../templates/Input";
import "../../../css/profilestyle.css";

function ProfileSection({ userId, isEditing, formData, setFormData }) {
  const profileFields = [
    { id: "userId", name: "userId", label: "User ID", readOnly: true },
    { id: "name", name: "name", label: "Name", readOnly: !isEditing },
    { id: "email", name: "email", label: "Email", readOnly: true },
    { id: "bio", label: "About", readOnly: !isEditing, type: "text-area" },
    { id: "contact", name: "contact", label: "Contact", readOnly: !isEditing },
    { id: "gender", name: "gender", label: "Gender", readOnly: true },

    { id: "skills", label: "Skills", readOnly: !isEditing },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="profile-container">
      {/* <div className="profile-header-actions">
        <h2 className="profile-title">My Profile</h2>
      </div> */}
      <div className="profile-card">
        <Input
          fields={profileFields}
          formData={formData}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default ProfileSection;

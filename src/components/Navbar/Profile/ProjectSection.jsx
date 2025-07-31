import React from "react";
import Input from "../../templates/Input";
import "../../../css/profilestyle.css";
import "../../../css/buttonstyle.css";

function ProjectSection({ userId, isEditing, formData, setFormData }) {
  const projectFields = [
    { id: "title", label: "Title", readOnly: !isEditing },
    { id: "description", label: "Description", readOnly: !isEditing },
    { id: "skills", label: "Skills", readOnly: !isEditing },
  ];

  const handleChange = (e, index) => {
    const { id, value } = e.target;
    const updated = [...formData];
    updated[index][id] = value;
    setFormData(updated);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Projects</h2>
      <div className="profile-card">
        {(isEditing ? (formData.length > 0 ? formData : [{}]) : formData)
          .length > 0 ? (
          (isEditing ? (formData.length > 0 ? formData : [{}]) : formData).map(
            (item, index) => (
              <div className="profile-card" key={index}>
                <Input
                  fields={projectFields}
                  formData={item}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            )
          )
        ) : (
          <p>No Experience</p>
        )}
      </div>
    </div>
  );
}

export default ProjectSection;

import React from "react";
import Input from "../../templates/Input";
import "../../../css/profilestyle.css";
import "../../../css/buttonstyle.css";

function ProjectSection({ userId, isEditing, formData = [], setFormData }) {
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

  const handleAddProject = () => {
    const newProject = { title: "", description: "", skills: "" };
    setFormData([...formData, newProject]);
  };

  const displayData = isEditing
    ? formData?.length > 0
      ? formData
      : [{}]
    : Array.isArray(formData) && formData.length > 0
    ? formData
    : null;

  return (
    <div className="profile-container">
      <div className="profile-header-actions">
        <h2 className="profile-title">Projects</h2>
        {isEditing && (
          <button
            type="button"
            className="add-button"
            onClick={handleAddProject}
          >
            + Add Project
          </button>
        )}
      </div>

      <div className="profile-card">
        {displayData ? (
          displayData.map((item, index) => (
            <div className="profile-card" key={index}>
              <Input
                fields={projectFields}
                formData={item}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
          ))
        ) : (
          <p>No Projects</p>
        )}
      </div>
    </div>
  );
}

export default ProjectSection;

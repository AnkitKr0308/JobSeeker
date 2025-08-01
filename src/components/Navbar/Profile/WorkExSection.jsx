import React from "react";
import Input from "../../templates/Input";
import "../../../css/profilestyle.css";
import "../../../css/buttonstyle.css";

function WorkExSection({ userId, isEditing, formData = [], setFormData }) {
  const workExFields = [
    { id: "company", label: "Company", readOnly: !isEditing },
    { id: "fromDate", label: "From", readOnly: !isEditing, type: "date" },
    { id: "toDate", label: "To", readOnly: !isEditing, type: "date" },
  ];

  const handleChange = (e, index) => {
    const { id, value } = e.target;
    const updated = [...formData];
    updated[index] = { ...updated[index], [id]: value };
    setFormData(updated);
  };

  const handleAddExperience = () => {
    const newExperience = { company: "", fromDate: "", toDate: "" };
    setFormData([...formData, newExperience]);
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
        <h2 className="profile-title">Work Experience</h2>
        {isEditing && (
          <button
            type="button"
            className="add-button"
            onClick={handleAddExperience}
          >
            + Add Experience
          </button>
        )}
      </div>
      <div className="profile-card">
        {displayData ? (
          displayData.map((item, index) => (
            <div className="profile-card" key={index}>
              <Input
                fields={workExFields}
                formData={item}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
          ))
        ) : (
          <p>No Work Experience</p>
        )}
      </div>
    </div>
  );
}

export default WorkExSection;

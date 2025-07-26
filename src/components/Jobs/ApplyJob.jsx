import React, { useState } from "react";
import Input from "../templates/Input";
import Button from "../templates/Button";
import { useDispatch, useSelector } from "react-redux";
import { applyJob } from "../../store/jobSlice";

function ApplyJob({ jobId, onSuccess }) {
  const user = useSelector((state) => state.auth.data);
  const [formData, SetFormData] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    SetFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleApplyClick = async () => {
    if (!user || !user.userId) {
      alert("User not logged in");
      return;
    }
    if (!jobId) {
      alert("Job ID missing");
      return;
    }

    const payload = {
      jobId: jobId,
      userId: user.userId,
      noticePeriod: parseInt(formData.noticePeriod, 10),
      readyToRelocate: formData.readyToRelocate,
      currentLocation: formData.currentLocation,
    };

    const res = await dispatch(applyJob(payload));

    if (res.payload.success) {
      alert(`Applied for ${jobId} successfully`);
      SetFormData("");
      if (onSuccess) onSuccess();
    }
  };

  const fields = [
    { id: "currentLocation", label: "What is your current location" },
    { id: "readyToRelocate", label: "Are you willing to relocate?" },
    { id: "noticePeriod", label: "What is your notice period? (in days)" },
  ];
  return (
    <div>
      <Input fields={fields} onChange={handleChange} formData={formData} />
      <div>
        <Button label="Apply" onClick={handleApplyClick} />
      </div>
    </div>
  );
}

export default ApplyJob;

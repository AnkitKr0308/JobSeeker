import React, { useState } from "react";
import Input from "../templates/Input";
import Button from "../templates/Button";
import "../../css/postjob.css";
import { useDispatch } from "react-redux";
import { postJob } from "../../store/jobSlice";
import Modal from "../templates/Modal";

function PostJob() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const fields = [
    { id: "title", label: "Title", required: true },
    { id: "role", label: "Job Role", required: true },
    { id: "experience", label: "Experience" },
    {
      id: "description",
      label: "Description",
      required: true,
      type: "text-area",
    },
    { id: "skillsRequired", label: "Skills Required", required: true },
    { id: "qualifications", label: "Qualifications" },

    { id: "locations", label: "Locations" },
    { id: "type", label: "Job Type" },
  ];

  const handleFormChange = async (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleJobSubmit = async () => {
    const jobdata = await dispatch(postJob(formData));

    if (jobdata.error) {
      alert(jobdata.error.message || "Unknown error");
      return;
    }

    if (jobdata.payload?.success) {
      setModalMessage(jobdata.payload.result.message);
      setOpenModal(true);
      setFormData({});
    } else {
      alert(jobdata.payload?.message || "Failed to post job");
    }
  };

  return (
    <div className="postjob-container">
      <h2 className="postjob-title">Post a New Job</h2>
      <Input fields={fields} onChange={handleFormChange} formData={formData} />

      <div className="postbtn-wrapper">
        <Button
          className="btn btn-blue postbtn"
          label="Post Job"
          onClick={handleJobSubmit}
        />
      </div>

      {openModal && (
        <Modal
          isOpen={openModal}
          title="Job Posted"
          message={modalMessage}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

export default PostJob;

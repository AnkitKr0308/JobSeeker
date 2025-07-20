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
    {
      id: "description",
      label: "Description",
      required: true,
      type: "text-area",
    },
    { id: "skillsRequired", label: "Skills Required", required: true },
    { id: "qualifications", label: "Qualifications", required: true },
  ];

  const handleFormChange = async (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleJobSubmit = async () => {
    try {
      const jobdata = await dispatch(postJob(formData));

      if (jobdata.payload?.success) {
        setModalMessage(jobdata.payload.result.message);

        setOpenModal(true);
      }
      setFormData({});
    } catch (e) {
      console.error("Error posting job", e);
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

import React, { useState } from "react";
import Input from "../templates/Input";
import Button from "../templates/Button";
import { useDispatch, useSelector } from "react-redux";
import { applyJob } from "../../store/jobSlice";
import Modal from "../templates/Modal";

function ApplyJob({ jobId, onSuccess }) {
  const user = useSelector((state) => state.auth.data);
  const [formData, SetFormData] = useState("");
  const dispatch = useDispatch();
  const [modalData, setModalData] = useState("");
  const [openModal, setOpenModal] = useState(false);

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
      status: "Applied",
    };

    const res = await dispatch(applyJob(payload));

    console.log(res);

    if (res.payload.success) {
      setOpenModal(true);
      setModalData(`Applied for ${jobId} successfully`);
    } else {
      alert(res.payload.message);
    }
  };

  const closeModal = () => {
    SetFormData("");
    setOpenModal(false);
    if (onSuccess) onSuccess();
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
      {openModal && (
        <Modal isOpen={openModal} onClose={closeModal} message={modalData}>
          <Button label="OK" onClick={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default ApplyJob;

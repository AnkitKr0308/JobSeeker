import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../templates/Modal";
import Input from "../../templates/Input";
import Button from "../../templates/Button";
import { updatePassword } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { userProfile } from "../../../store/userSlice";

function ChangePassword() {
  const userprofile = useSelector((state) => state.user.data.profiledata);
  const userId = useSelector((state) => state.auth.data.userId);
  const [openModal, setOpenModal] = useState(true);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatePasswordFields = [
    { id: "email", name: "modal-email", label: "Email", readOnly: true },
    {
      id: "password",
      name: "modal-password",
      label: "Password",
      type: "password",
      required: true,
    },
  ];

  const closeModal = () => {
    setOpenModal(false);
    navigate("/profile");
  };

  const savePassword = async () => {
    try {
      const update = await dispatch(updatePassword(formData));

      if (update.payload.message === "Password updated successfully") {
        await dispatch(userProfile(userId));

        alert("Password updated successfully");
        closeModal();
      } else {
        alert("Failed to update password");
      }
    } catch (e) {
      console.error("Failed to update password", e);
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    const fetchAndSetProfile = async () => {
      if (!userprofile && userId) {
        await dispatch(userProfile(userId));
      }
    };
    fetchAndSetProfile();
  }, [dispatch, userId, userprofile]);

  useEffect(() => {
    if (userprofile?.email) {
      setFormData({ email: userprofile.email, password: "" });
    }
  }, [dispatch, userId, userprofile]);

  return (
    <div>
      {openModal && (
        <Modal title="Change Password" isOpen={openModal} onClose={closeModal}>
          <div>
            <Input
              fields={updatePasswordFields}
              formData={formData}
              onChange={(e) => {
                const { id, value } = e.target;
                setFormData((prev) => ({ ...prev, [id]: value }));
              }}
            />
          </div>
          <div className="btn">
            <Button label="Save Password" onClick={savePassword} />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ChangePassword;

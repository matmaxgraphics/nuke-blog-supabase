import React, { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";

const DeleteButton = ({ onDelete, dataName = "item" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    try {
      await onDelete(); // Call the passed delete function
      toast.success(`${dataName} deleted successfully`);
    } catch (error) {
      toast.error(`Failed to delete ${dataName}`);
      console.error(`Error deleting ${dataName}:`, error);
    } finally {
      handleCloseModal(); // Close modal after action
    }
  };

  return (
    <>
      <a className="link-btn delete" onClick={handleOpenModal}>
        delete
      </a>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Delete ${dataName}`}
        onConfirm={handleConfirm}
      >
        <p>Are you sure you want to delete this {dataName}?</p>
      </Modal>
    </>
  );
};

export default DeleteButton;

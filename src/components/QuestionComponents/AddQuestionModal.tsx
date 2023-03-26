import { useState } from "react";
import Modal from "../UI/Modal";
import AddQuestion from "./AddQuestion";

const AddQuestionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add Question"
        buttonText="Add Question"
      >
        <AddQuestion onClose={() => handleClose()} />
      </Modal>
    </>
  );
};

export default AddQuestionModal;

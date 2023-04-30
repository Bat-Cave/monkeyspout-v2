import { useState } from "react";
import Modal from "../UI/Modal";
import FlagQuestion from "./FlagQuestion";
import type { Question } from "@prisma/client";

const FlagQuestionModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  handleClose: () => void;
  question: Question | null;
}> = ({ isOpen, setIsOpen, handleClose, question }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Flag Question"
        showButton={false}
      >
        <FlagQuestion question={question} onClose={() => handleClose()} />
      </Modal>
    </>
  );
};

export default FlagQuestionModal;

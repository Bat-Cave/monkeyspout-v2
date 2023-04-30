import Modal from "../UI/Modal";
import EditQuestion from "./EditQuestion";
import type { Question } from "@prisma/client";

const EditQuestionModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  handleClose: () => void;
  question: Question | null;
}> = ({ isOpen, setIsOpen, handleClose, question, ...props }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Edit Question"
        showButton={false}
        {...props}
      >
        <EditQuestion q={question} onClose={() => handleClose()} />
      </Modal>
    </>
  );
};

export default EditQuestionModal;

import { Cancel } from "iconoir-react";
import { PropsWithChildren } from "react";

const Modal: React.FC<
  PropsWithChildren & {
    buttonText: string;
    title: string;
    isOpen: boolean;
    setIsOpen: Function;
  }
> = ({
  buttonText = "Open Modal",
  title = "",
  isOpen = false,
  setIsOpen,
  children,
}) => {
  return (
    <>
      <button className="btn-primary btn" onClick={() => setIsOpen(!isOpen)}>
        {buttonText}
      </button>

      <input
        checked={isOpen}
        type="checkbox"
        className="modal-toggle"
        readOnly
      />
      <div className="modal">
        <div className="modal-box max-h-[calc(100vh-100px)]">
          <div className="m-0 mb-6 flex items-end justify-between">
            <p className="text-4xl">{title}</p>
            <button className="btn" onClick={() => setIsOpen(!isOpen)}>
              <Cancel />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;

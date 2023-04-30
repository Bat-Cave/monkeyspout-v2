import { Cancel } from "iconoir-react";
import type { PropsWithChildren, ReactElement } from "react";

const Modal: React.FC<
  PropsWithChildren & {
    buttonText?: string;
    showButton?: boolean;
    title: string;
    isOpen: boolean;
    setIsOpen: (arg0: boolean) => void;
  }
> = ({
  buttonText = "Open Modal",
  showButton = true,
  title = "",
  isOpen = false,
  setIsOpen,
  children,
}) => {
  return (
    <>
      {showButton ? (
        <button className="btn-primary btn" onClick={() => setIsOpen(!isOpen)}>
          {buttonText}
        </button>
      ) : null}
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

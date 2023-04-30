import React from "react";

const Spinner: React.FC<{ className?: string }> = ({
  className = "h-6 w-6",
  ...props
}) => {
  return (
    <span
      className={`aspect-square animate-spin rounded-full border-2 border-neutral-focus border-b-primary ${
        className || ""
      }`}
      {...props}
    ></span>
  );
};

export default Spinner;

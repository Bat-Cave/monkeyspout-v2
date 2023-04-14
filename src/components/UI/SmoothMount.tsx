import { AnimatePresence, motion } from "framer-motion";
import type { PropsWithChildren } from "react";

const SmoothMount: React.FC<
  PropsWithChildren & {
    className?: string;
    show: boolean | undefined;
    width?: boolean;
  }
> = ({ children, className, show, width, ...props }) => {
  return (
    <>
      <AnimatePresence initial={false}>
        {show ? (
          <motion.div
            initial={{
              height: 0,
              scale: 0,
              opacity: 0,
              width: width ? 0 : "auto",
            }}
            animate={{ height: "auto", scale: 1, opacity: 1, width: "auto" }}
            exit={{
              height: 0,
              scale: 0,
              opacity: 0,
              width: width ? 0 : "auto",
            }}
            transition={{ duration: 0.75, type: "spring" }}
            className={className}
            {...props}
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default SmoothMount;

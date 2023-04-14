import React from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

const Counter: React.FC<{ count: number }> = ({ count }) => {
  const splitNumber = count.toString().split("");

  return (
    <div className="flex h-4 overflow-hidden">
      {splitNumber.map((num, i) => (
        <Digit key={`digit-${num}-${i}`} digit={num} />
      ))}
    </div>
  );
};

const Digit: React.FC<{ digit: number | string }> = ({ digit, ...props }) => {
  const [ref, { height }] = useMeasure();
  return (
    <motion.div
      ref={ref}
      animate={{ y: -1 * Number(digit) * height }}
      className="flex flex-col"
      {...props}
    >
      {Array(10)
        .fill(false)
        .map((_, i) => (
          <span
            style={{ lineHeight: `${height}px` }}
            key={`digit-${digit}-${i}`}
          >
            {i}
          </span>
        ))}
    </motion.div>
  );
};

export default Counter;

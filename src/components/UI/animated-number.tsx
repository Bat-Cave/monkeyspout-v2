"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { type ComponentProps, useEffect } from "react";

function AnimatedNumber({
  value,
  ...props
}: { value: number } & ComponentProps<(typeof motion)["span"]>) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) =>
    Math.round(current as number).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span {...props}>{display}</motion.span>;
}

export default AnimatedNumber;

"use client";

import {
  type MotionValue,
  motion,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { useEffect, useRef } from "react";

const fontSize = 150;
const padding = 5;
const height = fontSize + padding;

export default function Counter({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20%" });
  const finalValue = inView ? value : 0;
  return (
    <div
      ref={ref}
      style={{ fontSize }}
      className="flex space-x-1 overflow-hidden rounded-xl border-2 border-slate-600 bg-slate-700 p-4 leading-none"
    >
      <Digit place={1000} value={finalValue} />
      <Digit place={100} value={finalValue} />
      <Digit place={10} value={finalValue} />
      <Digit place={1} value={finalValue} />
    </div>
  );
}

function Digit({ place, value }: { place: number; value: number }) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 300,
    damping: 30,
    mass: 1,
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <motion.div
      layout
      style={{ height }}
      className={"relative w-[1ch] tabular-nums transition-colors"}
    >
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </motion.div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-primary to-secondary bg-clip-text px-2 leading-none text-transparent"
    >
      {number}
    </motion.span>
  );
}

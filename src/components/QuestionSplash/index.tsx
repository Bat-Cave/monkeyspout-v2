import { QuestionMark } from "iconoir-react";
import { MotionConfig, motion } from "framer-motion";

const QuestionSplash = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };
  return (
    <MotionConfig transition={{ ease: "circOut", delay: 1 }}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="absolute inset-0 z-0 flex w-full items-end justify-center"
      >
        <motion.span
          initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
          animate={{ y: "-50vh", x: "30vh", rotate: 40, opacity: 1 }}
          className="absolute text-5xl"
        >
          <QuestionMark />
        </motion.span>
        <motion.span
          initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
          animate={{ y: "-35vh", x: "33vh", rotate: 50, opacity: 1 }}
          className="absolute text-7xl"
        >
          <QuestionMark />
        </motion.span>
        <motion.span
          initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
          animate={{ y: "-50vh", x: "-30vh", rotate: -40, opacity: 1 }}
          className="absolute text-5xl"
        >
          <QuestionMark />
        </motion.span>
        <motion.span
          initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
          animate={{ y: "-35vh", x: "-33vh", rotate: -50, opacity: 1 }}
          className="absolute text-7xl"
        >
          <QuestionMark />
        </motion.span>
      </motion.div>
    </MotionConfig>
  );
};

export default QuestionSplash;

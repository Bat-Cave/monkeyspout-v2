import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMeasure from "react-use-measure";
import Drop from "./Drop";
import { useQuestions } from "~/context/useQuestions";

const Bucket: React.FC<{ dropCount?: number }> = ({ dropCount = 1 }) => {
  const [ref, bounds] = useMeasure();
  const [dropsCreated, setDropsCreated] = useState<number[]>([1]);

  const { isLoading } = useQuestions();

  const dropLoaded = () => {
    if (dropsCreated.length < dropCount) {
      setDropsCreated((curr) => [...curr, curr.length]);
    }
  };

  return (
    <motion.div
      animate={{ height: bounds.height }}
      className="w-full max-w-lg overflow-hidden "
    >
      <div
        ref={ref}
        className="card flex w-full flex-col gap-4 border-2 border-slate-400 p-4"
      >
        <AnimatePresence mode="popLayout">
          {!isLoading ? (
            dropsCreated.map((_, i) => {
              return (
                <motion.div
                  initial={{ opacity: 0, x: -500 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 500 }}
                  transition={{ duration: 0.75, type: "spring" }}
                  key={`drop-${i}`}
                >
                  <Drop onLoad={() => dropLoaded()} />
                </motion.div>
              );
            })
          ) : (
            <>Loading</>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Bucket;

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMeasure from "react-use-measure";
import Drop from "./Drop";
import { useQuestions } from "~/context/useQuestions";
import Loading from "../Loading";

const Bucket: React.FC<{ dropCount?: number }> = ({ dropCount = 1 }) => {
  const [ref, bounds] = useMeasure();
  const [dropsCreated, setDropsCreated] = useState<number[] | undefined>([0]);
  const dropsRef = useRef<number[] | undefined>();
  dropsRef.current = dropsCreated;

  const { isLoading } = useQuestions();

  const dropLoaded = (i: number) => {
    if (dropsRef.current && dropsRef.current?.length < dropCount) {
      dropsRef.current?.push(i);
      setDropsCreated(dropsRef.current);
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
            dropsCreated?.map((_, i) => {
              return (
                <motion.div
                  initial={{ opacity: 0, x: -500 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 500 }}
                  transition={{ duration: 0.75, type: "spring" }}
                  key={`drop-${i}`}
                >
                  <Drop onLoad={() => dropLoaded(i + 1)} />
                </motion.div>
              );
            })
          ) : (
            <Loading />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Bucket;

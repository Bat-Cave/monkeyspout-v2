import { Question } from "@prisma/client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMeasure from "react-use-measure";
import { api } from "~/utils/api";
import Drop from "./Drop";

const Bucket: React.FC<{ dropCount?: number }> = ({ dropCount = 1 }) => {
  const [ref, bounds] = useMeasure();
  const [questions, setQuestions] = useState<Question[]>([]);
  const { data } = api.questions.getAll.useQuery();

  useEffect(() => {
    if (data?.length) {
      setQuestions(data);
    }
  }, [data]);

  const onComplete = (id: string) => {
    setQuestions((curr) => {
      const filtered = curr.filter((q) => q.id !== id);
      if (filtered.length < dropCount) {
        return [...filtered, ...[...(data?.filter((q) => q.id !== id) || [])]];
      }
      return filtered;
    });
  };

  useEffect(() => {
    console.log({ questions });
  }, [questions]);

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
          {questions.map((question) => (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, height: "auto" }}
              exit={{ height: 0, opacity: 0 }}
              key={question.id}
            >
              <Drop
                key={question.id}
                question={question}
                onComplete={onComplete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Bucket;

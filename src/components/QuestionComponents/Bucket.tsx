import type { Question } from "@prisma/client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMeasure from "react-use-measure";
import { api } from "~/utils/api";
import Drop from "./Drop";
import { pickAndRemoveRandomItem, shuffle } from "~/utils/tools";

const Bucket: React.FC<{ dropCount?: number }> = ({ dropCount = 1 }) => {
  const [ref, bounds] = useMeasure();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsShowing, setQuestionsShowing] = useState<Question[]>([]);
  const { data } = api.questions.getAll.useQuery();

  useEffect(() => {
    if (data?.length) {
      const shuffled = shuffle(data);

      if (!questionsShowing.length) {
        const newQs = [];
        let newQuestions = [];
        for (let i = 0; i < dropCount; i += 1) {
          const { item, newArray } = pickAndRemoveRandomItem(shuffled);
          newQs.push(item);
          newQuestions = newArray;
        }
        setQuestionsShowing(newQs);
        setQuestions(newQuestions);
      }
    }
  }, [data]);

  const getNewQuestion = () => {
    const { item, newArray } = pickAndRemoveRandomItem(questions);
    setQuestions(newArray);
    return item;
  };

  const onComplete = (index: number) => {
    setQuestionsShowing((curr) => {
      return curr.map((q, i) => {
        if (i === index) {
          console.log({ index });
          return getNewQuestion();
        }
        return q;
      });
    });
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
          {questionsShowing.length ? (
            questionsShowing.map((q, i) => (
              <motion.div
                initial={{ opacity: 0, x: -500 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 500 }}
                transition={{ duration: 0.75, type: "spring" }}
                key={q?.id}
              >
                <Drop
                  key={q?.id}
                  question={q}
                  onComplete={() => onComplete(i)}
                />
              </motion.div>
            ))
          ) : (
            <>Loading</>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Bucket;

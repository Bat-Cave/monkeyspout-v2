import type { Question } from "@prisma/client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { api } from "~/utils/api";
import { shuffle } from "~/utils/tools";

type QuestionsContextType = {
  queue: Question[];
  questions: Question[];
  isLoading: boolean;
  getNextInQueue: (arg0: () => void) => Question | undefined;
  setFilter: (arg0: string) => void;
};

const QuestionsContext = createContext<QuestionsContextType | undefined>(
  undefined
);

function QuestionsProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState("");
  const { data, isLoading } = api.questions.getByFilter.useQuery(filter);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [queue, setQueue] = useState<Question[]>([]);
  const queueRef = useRef<Question[]>();
  queueRef.current = queue;

  useEffect(() => {
    if (data?.length) {
      setQuestions(data);
      const shuffledData = shuffle(data);
      setQueue(shuffledData);
    }
  }, [data]);

  const getNextInQueue = (callback: () => void) => {
    let res;
    if (queueRef.current) {
      const currQueue = [...queueRef.current];
      const nextInQueue = currQueue.shift();
      if (nextInQueue) {
        currQueue.push(nextInQueue);
        queueRef.current = currQueue;
        setQueue(currQueue);
        res = nextInQueue;
      }
    }

    callback();
    return res;
  };

  const value = {
    queue: queueRef.current,
    questions,
    isLoading,
    getNextInQueue,
    setFilter,
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
}

function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error("useQuestions must be used within a QuestionsProvider");
  }
  return context;
}

export { QuestionsProvider, useQuestions };

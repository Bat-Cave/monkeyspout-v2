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
  getNextInQueue: () => Question | undefined;
};

const QuestionsContext = createContext<QuestionsContextType | undefined>(
  undefined
);

function QuestionsProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = api.questions.getAll.useQuery();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [queue, setQueue] = useState<Question[]>([]);
  const [busyQueue, setBusyQueue] = useState<{ (): void }[]>([]);
  const queueRef = useRef<Question[]>();
  const busyRef = useRef(false);
  queueRef.current = queue;

  useEffect(() => {
    if (data?.length && !questions.length) {
      setQuestions(data);
      const shuffledData = shuffle(data);
      setQueue(shuffledData);
    }
  }, [data, questions.length]);

  const executeQueue = () => {
    if (busyQueue.length > 0) {
      const nextFunction = busyQueue.shift();
      if (nextFunction) {
        nextFunction();
      }
    }
  };

  const getNextInQueue = () => {
    if (busyRef.current) {
      setBusyQueue((curr) => [...curr, getNextInQueue]);
    } else {
      if (queueRef.current) {
        busyRef.current = true;
        const currQueue = [...queueRef.current];
        const nextInQueue = currQueue.shift();
        if (nextInQueue) {
          currQueue.push(nextInQueue);
          setQueue(currQueue);
          busyRef.current = false;
          executeQueue();
          return nextInQueue;
        }
        busyRef.current = false;
        executeQueue();
      }
    }
  };

  const getInitialQuestion = (pos: number) => {
    queueRef.current;
  };

  const value = {
    queue: queueRef.current,
    questions,
    isLoading,
    getNextInQueue,
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

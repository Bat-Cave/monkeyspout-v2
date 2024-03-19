"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { shuffle } from "~/utils/tools";
import { questions as localQuestions } from "~/utils/quesitons";
import supabase from "~/lib/supabase";

type Question = any;

type QuestionsContextType = {
  queue: Question[];
  questions: Question[];
  getNextInQueue: (arg0: () => void) => Question | undefined;
  setFilter: (arg0: string) => void;
  loading: boolean;
};

const QuestionsContext = createContext<QuestionsContextType | undefined>(
  undefined
);

function QuestionsProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [queue, setQueue] = useState<Question[]>([]);
  const queueRef = useRef<Question[]>();
  queueRef.current = queue;

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data: q, error } = await supabase.from("Questions").select("*");

      if (!error) {
        setQuestions(q);
      } else {
        setQuestions(localQuestions);
      }
      setLoading(false);
    };

    void fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length) {
      const shuffled = shuffle(questions);
      setQueue(shuffled);
    }
  }, [questions]);

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
    getNextInQueue,
    setFilter,
    loading,
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

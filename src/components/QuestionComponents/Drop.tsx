import type { Question } from "@prisma/client";
import type { AnimationPlaybackControls } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";
import {
  CheckCircle,
  Copy,
  Pause,
  Play,
  SkipNext,
  TriangleFlag,
} from "iconoir-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useQuestions } from "~/context/useQuestions";
import { getCategoryColor } from "~/utils/quesitons";

const Drop: React.FC<{ onLoad: () => void }> = ({ onLoad }) => {
  const [ref, animate] = useAnimate();
  const [animation, setAnimation] = useState<AnimationPlaybackControls>();
  const [started, setStarted] = useState(true);
  const [copied, setCopied] = useState(false);
  const [question, setQuestion] = useState<Question | undefined>(undefined);
  const questionRef = useRef<Question | undefined>(undefined);
  questionRef.current = question;

  const { getNextInQueue, isLoading, queue } = useQuestions();

  const getNext = () => {
    const nextQ = getNextInQueue(onLoad);
    setQuestion(nextQ);
  };

  useEffect(() => {
    if (!isLoading && !question) {
      getNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, queue]);

  const toggleTimer = () => {
    if (started) {
      animation?.pause();
    } else {
      animation?.play();
    }
    setStarted(!started);
  };

  const handleCopy = () => {
    if (!copied) {
      setCopied(true);
    }
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  useEffect(() => {
    animation?.cancel();
    setAnimation(
      animate(
        ".absolute",
        { width: 0 },
        {
          duration: Number(questionRef.current?.timeout || 0) / 1000,
          ease: "linear",
          onUpdate: (latest) => {
            if (latest <= 0.01) {
              getNext();
            }
          },
        }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionRef.current]);

  console.log({
    "questionRef.current": questionRef.current?.category.split(","),
  });

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        initial={{ opacity: 0, x: -500 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 500 }}
        transition={{ duration: 0.75, type: "spring" }}
        key={questionRef.current?.id}
      >
        <div
          ref={ref}
          key={questionRef.current?.id}
          id={questionRef.current?.id}
          className="relative w-full overflow-hidden rounded-2xl border-2 border-secondary bg-gradient-to-br from-base-300 to-base-100 p-4 pb-2"
        >
          <span className="absolute top-0 left-0 h-2 w-full bg-gradient-to-tr from-primary to-secondary"></span>
          <p className="w-full">{questionRef.current?.question}</p>
          <div className="mt-2 flex w-full justify-between">
            <div className="flex w-full items-center gap-3">
              {questionRef.current?.category
                .split(",")
                .sort()
                .map((cat) => {
                  const color = getCategoryColor(cat);
                  return (
                    <div
                      className="flex h-5 items-center gap-1 rounded-md py-0 px-3 text-xs opacity-60 transition-opacity hover:opacity-100"
                      key={`${questionRef.current?.id}-${cat}`}
                      style={{ border: `1px solid ${color}` }}
                    >
                      {cat}
                    </div>
                  );
                })}
            </div>
            <div className="flex justify-end gap-1">
              <button
                className="btn-sm btn px-1 opacity-60 transition-all hover:btn-error hover:opacity-100"
                onClick={() => window.alert("need to add flagging ability")}
              >
                <TriangleFlag />
              </button>
              <button
                className="btn-sm btn px-1 opacity-60 transition-all hover:btn-info hover:opacity-100"
                onClick={() => getNext()}
              >
                <SkipNext />
              </button>
              <CopyToClipboard
                text={questionRef.current?.question || ""}
                onCopy={() => handleCopy()}
              >
                <button className="btn-sm btn px-1 opacity-60 transition-all hover:btn-secondary hover:opacity-100">
                  {copied ? <CheckCircle /> : <Copy />}
                </button>
              </CopyToClipboard>
              <button
                className="btn-sm btn px-1 opacity-60 transition-all hover:btn-primary hover:opacity-100"
                onClick={() => toggleTimer()}
              >
                {started ? <Pause /> : <Play />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Drop;

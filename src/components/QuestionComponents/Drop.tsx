import type { Question } from "@prisma/client";
import type { AnimationPlaybackControls } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import { CheckCircle, Copy, Pause, Play, SkipNext } from "iconoir-react";
import copy from "copy-to-clipboard";
import { useQuestions } from "~/context/useQuestions";

const Drop: React.FC<{ onLoad: () => void }> = ({ onLoad }) => {
  const [ref, animate] = useAnimate();
  const [animation, setAnimation] = useState<AnimationPlaybackControls>();
  const [started, setStarted] = useState(true);
  const [copied, setCopied] = useState(false);
  const [question, setQuestion] = useState<Question | undefined>(undefined);
  const [mounted, setMounted] = useState<boolean>(false);

  const { getNextInQueue } = useQuestions();

  const getNext = useCallback(() => {
    setQuestion(getNextInQueue());
  }, [getNextInQueue]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
    if (mounted) {
      onLoad();
      // getNext();
    }
  }, [mounted, onLoad]);

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
    setAnimation(
      animate(
        "span",
        { width: 0 },
        {
          duration: Number(question?.timeout || 0) / 1000,
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
  }, [question]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        initial={{ opacity: 0, x: -500 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 500 }}
        transition={{ duration: 0.75, type: "spring" }}
        key={question?.id}
      >
        <div
          ref={ref}
          key={question?.id}
          id={question?.id}
          className="relative w-full overflow-hidden rounded-2xl border-2 border-secondary bg-gradient-to-br from-base-300 to-base-100 p-4 pb-2"
        >
          <span className="absolute top-0 left-0 h-2 w-full bg-gradient-to-tr from-primary to-secondary"></span>
          <p className="w-full">{question?.question}</p>
          <div className="flex w-full justify-end gap-1">
            <button
              className="btn-sm btn px-1 hover:btn-info"
              onClick={() => getNext()}
            >
              <SkipNext />
            </button>
            <button
              className="btn-sm btn px-1 hover:btn-secondary"
              onClick={() =>
                copy(question?.question || "", { onCopy: handleCopy })
              }
            >
              {copied ? <CheckCircle /> : <Copy />}
            </button>
            <button
              className="btn-sm btn px-1 hover:btn-primary"
              onClick={() => toggleTimer()}
            >
              {started ? <Pause /> : <Play />}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Drop;

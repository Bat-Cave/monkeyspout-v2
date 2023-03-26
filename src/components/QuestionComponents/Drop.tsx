import type { Question } from "@prisma/client";
import type { AnimationPlaybackControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import { CheckCircle, Copy, Pause, Play, SkipNext } from "iconoir-react";
import copy from "copy-to-clipboard";

const Drop: React.FC<{
  question: Question;
  onComplete: Function;
}> = ({ question, onComplete }) => {
  const [ref, animate] = useAnimate();
  const [animation, setAnimation] = useState<AnimationPlaybackControls>();
  const [started, setStarted] = useState(true);
  const [copied, setCopied] = useState(false);
  const [completed, setCompleted] = useState(false);

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
          duration: Number(question.timeout) / 1000,
          ease: "linear",
          onUpdate: (latest) => {
            if (latest === 0 && !completed) {
              onComplete();
              setCompleted(true);
            }
          },
        }
      )
    );
  }, []);

  return (
    <div>
      <div
        ref={ref}
        key={question.id}
        id={question.id}
        className="relative w-full overflow-hidden rounded-2xl border-2 border-secondary bg-gradient-to-br from-base-300 to-base-100 p-4 pb-2"
      >
        <span className="absolute top-0 left-0 h-2 w-full bg-gradient-to-tr from-primary to-secondary"></span>
        <p className="w-full">{question.question}</p>
        <div className="flex w-full justify-end gap-1">
          <button
            className="btn-sm btn px-1 hover:btn-info"
            onClick={() => onComplete()}
          >
            <SkipNext />
          </button>
          <button
            className="btn-sm btn px-1 hover:btn-secondary"
            onClick={() => copy(question.question, { onCopy: handleCopy })}
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
    </div>
  );
};

export default Drop;

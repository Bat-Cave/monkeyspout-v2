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
import { useQuestions } from "@/context/useQuestions";
import { useUser } from "@clerk/nextjs";
import { defaultBucketConfig } from "./Bucket";
import SmoothMount from "../UI/SmoothMount";
import type { SizeType } from "@/app/(pages)/widget/page";
import type { Tables } from "@/types/supabase";
import { getCategoryColor } from "@/data/quesitons";

type Question = Tables<"Questions">;

const Drop: React.FC<{
  onLoad: () => void;
  onFlagClick: (arg0: Question | null) => void;
  size?: SizeType;
  showCategories?: boolean;
  showSkip?: boolean;
  showCopy?: boolean;
  showPlayPause?: boolean;
  backgroundColor?: string;
  backgroundColorEnd?: string;
  textColor?: string;
  borderColor?: string;
  countdownBarColor?: string;
  countdownBarEndColor?: string;
}> = ({
  onLoad,
  onFlagClick,
  size = "normal",
  showCategories = defaultBucketConfig.showCategories,
  showSkip = defaultBucketConfig.showSkip,
  showCopy = defaultBucketConfig.showCopy,
  showPlayPause = defaultBucketConfig.showPlayPause,
  backgroundColor = defaultBucketConfig.backgroundColor,
  backgroundColorEnd = defaultBucketConfig.backgroundColorEnd,
  textColor = defaultBucketConfig.textColor,
  borderColor = defaultBucketConfig.borderColor,
  countdownBarColor = defaultBucketConfig.countdownBarColor,
  countdownBarEndColor = defaultBucketConfig.countdownBarEndColor,
}) => {
  const [ref, animate] = useAnimate();
  const [animation, setAnimation] = useState<AnimationPlaybackControls>();
  const [started, setStarted] = useState(true);
  const [copied, setCopied] = useState(false);
  const [question, setQuestion] = useState<Question | undefined>(undefined);
  const questionRef = useRef<Question | undefined>(undefined);
  questionRef.current = question;
  const barBackground = `linear-gradient(45deg, ${
    countdownBarColor || "#d926aa"
  }, ${countdownBarEndColor || "#661ae6"})`;

  const { getNextInQueue, queue, loading } = useQuestions();
  const { user } = useUser();
  const role = user?.organizationMemberships[0]?.role;
  const isAdmin = role === "admin";

  const getNext = () => {
    const nextQ = getNextInQueue(onLoad);
    setQuestion(nextQ);
  };

  useEffect(() => {
    if (!loading && !question) {
      getNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, queue]);

  const toggleTimer = () => {
    if (started) {
      animation?.pause();
    } else {
      animation?.play();
    }
    setStarted(!started);
  };

  const stopTimer = () => {
    animation?.pause();
    setStarted(false);
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
          duration: Number(questionRef.current?.duration || 0) / 1000,
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

  const sizeStyleMap = {
    small: "text-xs",
    normal: "text-base",
    large: "text-2xl",
    "extra large": "text-5xl",
  };

  const handleFlagClick = () => {
    onFlagClick(questionRef.current || null);
    stopTimer();
  };

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
          key={`${questionRef?.current?.id || 0}` + "-inner"}
          id={`${questionRef?.current?.id || 0}`}
          className="relative w-full overflow-hidden rounded-2xl border-2 border-secondary p-4 pb-2 transition-all duration-200"
          style={{
            borderColor: borderColor,
            background: `linear-gradient(180deg, ${backgroundColor || ""}, ${
              backgroundColorEnd || ""
            }`,
          }}
        >
          <span
            className="absolute top-0 left-0 h-2 w-full"
            style={{
              background: barBackground,
            }}
          ></span>
          <p
            className={`mb-2 w-full ${sizeStyleMap[size]} transition-all duration-200`}
            style={{ color: textColor }}
          >
            {questionRef.current?.question}
          </p>
          <div
            className="flex w-full items-center justify-between overflow-hidden"
            style={{
              height:
                showCategories || showCopy || showPlayPause || showSkip
                  ? "32px"
                  : "auto",
            }}
          >
            <SmoothMount show={showCategories && showCategories} width>
              <div className="flex w-full items-center gap-2">
                {`${questionRef?.current?.category || ""}`
                  .split(",")
                  .sort()
                  .map((cat) => {
                    const color = getCategoryColor(cat);
                    return (
                      <div
                        className="flex h-[32px] items-center gap-1 rounded-md py-0 px-3 text-xs opacity-60 transition-opacity hover:opacity-100"
                        key={`${questionRef.current?.id || ""}-${cat}`}
                        style={{
                          border: `1px solid ${color}`,
                          color: textColor,
                        }}
                      >
                        {cat}
                      </div>
                    );
                  })}
              </div>
            </SmoothMount>
            <div className="flex w-full items-center justify-end self-end">
              <SmoothMount show={isAdmin}>
                <button
                  className="btn btn-sm mr-1 px-1 opacity-60 transition-all hover:btn-error hover:opacity-100"
                  onClick={() => handleFlagClick()}
                >
                  <span className="sr-only">Flag Question</span>
                  <TriangleFlag />
                </button>
              </SmoothMount>
              <SmoothMount show={showSkip && showSkip} width>
                <button
                  className="btn btn-sm mr-1 px-1 opacity-60 transition-all hover:btn-info hover:opacity-100"
                  onClick={() => getNext()}
                >
                  <span className="sr-only">Skip Question</span>
                  <SkipNext />
                </button>
              </SmoothMount>
              <SmoothMount show={showCopy && showCopy} width>
                <CopyToClipboard
                  text={questionRef.current?.question || ""}
                  onCopy={() => handleCopy()}
                >
                  <button className="btn btn-sm mr-1 px-1 opacity-60 transition-all hover:btn-secondary hover:opacity-100">
                    {copied ? <CheckCircle /> : <Copy />}
                  </button>
                </CopyToClipboard>
              </SmoothMount>
              <SmoothMount show={showPlayPause && showPlayPause} width>
                <button
                  className="btn btn-sm mr-1 px-1 opacity-60 transition-all hover:btn-primary hover:opacity-100"
                  onClick={() => toggleTimer()}
                >
                  {started ? <Pause /> : <Play />}
                </button>
              </SmoothMount>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Drop;

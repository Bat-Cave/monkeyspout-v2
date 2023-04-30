import type { Question } from "@prisma/client";
import type { SizeType } from "~/pages/widget";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMeasure from "react-use-measure";
import Drop from "./Drop";
import { useQuestions } from "~/context/useQuestions";
import Loading from "../Loading";
import FlagQuestionModal from "./FlagQuestionModal";

export type BucketConfig = {
  onLoad?: () => void;
  dropCount?: number;
  size?: SizeType;
  excludedCategories?: string[];
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
};

export const defaultBucketConfig: BucketConfig = {
  dropCount: 3,
  size: "normal",
  excludedCategories: [""],
  showCategories: true,
  showSkip: true,
  showCopy: true,
  showPlayPause: true,
  backgroundColor: "#20252E",
  backgroundColorEnd: "#2A303C",
  textColor: "#f1f5f9",
  borderColor: "#d926aa",
  countdownBarColor: "#661ae6",
  countdownBarEndColor: "#d926aa",
};

const Bucket: React.FC<BucketConfig> = ({
  onLoad = () => null,
  dropCount = defaultBucketConfig.dropCount || 3,
  size = defaultBucketConfig.size || "normal",
  excludedCategories = defaultBucketConfig.excludedCategories || [""],
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
  const [flaggedQuestion, setFlaggedQuestion] = useState<Question | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ref, bounds] = useMeasure();
  const [dropsCreated, setDropsCreated] = useState<number[] | undefined>([
    Date.now(),
  ]);
  const dropsRef = useRef<number[] | undefined>();
  dropsRef.current = dropsCreated;

  const { isLoading, setFilter } = useQuestions();

  const dropLoaded = () => {
    if (dropsRef.current && dropsRef.current?.length < dropCount) {
      setDropsCreated([...dropsRef.current, Date.now()]);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      onLoad();
    }
  }, [isLoading, onLoad]);

  useEffect(() => {
    setFilter([...excludedCategories]?.join(","));
  }, [excludedCategories, setFilter]);

  useEffect(() => {
    if (dropsRef.current?.length !== dropCount) {
      const diff = dropCount - (dropsRef.current?.length || 0);
      if (diff > 0) {
        setDropsCreated([...(dropsCreated || []), Date.now()]);
      }
      if (diff < 0) {
        const updatedDropsCreated = [...(dropsCreated || [])];
        updatedDropsCreated.pop();
        setDropsCreated(updatedDropsCreated);
      }
    }
  }, [dropCount, dropsRef.current?.length, dropsCreated]);

  const maxWidthMap = {
    small: "max-w-xs",
    normal: "max-w-md",
    large: "max-w-xl",
    "extra large": "max-w-4xl",
  };

  const onFlag = (q: Question | null) => {
    if (q) {
      setFlaggedQuestion(q);
      setIsOpen(true);
    }
  };

  return (
    <>
      <motion.div
        animate={{ height: bounds.height }}
        transition={{ type: "linear", duration: 0.25 }}
        className={`w-full overflow-hidden ${maxWidthMap[size]}`}
      >
        <div
          ref={ref}
          className="card flex w-full flex-col gap-4 border-2 border-slate-400 p-4"
        >
          <AnimatePresence mode="popLayout">
            {!isLoading ? (
              dropsRef.current?.map((d) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -500 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 500 }}
                    transition={{ type: "spring" }}
                    key={`drop-${d}`}
                  >
                    <Drop
                      onLoad={() => dropLoaded()}
                      onFlagClick={onFlag}
                      size={size}
                      showCategories={showCategories}
                      showSkip={showSkip}
                      showCopy={showCopy}
                      showPlayPause={showPlayPause}
                      backgroundColor={backgroundColor}
                      backgroundColorEnd={backgroundColorEnd}
                      textColor={textColor}
                      borderColor={borderColor}
                      countdownBarColor={countdownBarColor}
                      countdownBarEndColor={countdownBarEndColor}
                    />
                  </motion.div>
                );
              })
            ) : (
              <Loading />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <FlagQuestionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClose={() => setIsOpen(false)}
        question={flaggedQuestion}
      />
    </>
  );
};

export default Bucket;

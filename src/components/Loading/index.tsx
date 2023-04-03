import monkeySee from "~/assets/monkey-see.png";
import monkeyHear from "~/assets/monkey-hear.png";
import monkeySpeak from "~/assets/monkey-speak.png";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { forwardRef, useEffect, useState } from "react";
import type { LegacyRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Loading = forwardRef(({ ...props }, ref: LegacyRef<HTMLDivElement>) => {
  const images: StaticImageData[] = [monkeySee, monkeyHear, monkeySpeak];
  const [currImage, setCurrImage] = useState(0);
  const image = images[currImage] || "";

  useEffect(() => {
    const interval = setInterval(() => {
      if (currImage === images.length - 1) {
        setCurrImage(0);
      } else {
        setCurrImage(currImage + 1);
      }
    }, 500);

    return () => clearInterval(interval);
  });

  return (
    <div
      ref={ref}
      className="flex w-full items-center justify-center gap-4"
      {...props}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currImage}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <Image src={image} alt="monkey emojis" className="w-[50px]" />
        </motion.div>
      </AnimatePresence>
      <p className="text-3xl font-bold">Loading Questions</p>
    </div>
  );
});

Loading.displayName = "Loading";

export default Loading;

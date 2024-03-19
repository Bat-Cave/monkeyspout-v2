"use client";

import Bucket from "./QuestionComponents/Bucket";
import { useState } from "react";
import QuestionSplash from "./QuestionSplash";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <section className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-md flex-col items-center py-12 md:max-w-none">
      {loaded ? <QuestionSplash /> : null}
      <h1 className="z-20 my-12 w-full max-w-3xl text-left text-3xl font-extrabold md:text-center md:text-7xl">
        <span className="mr-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-5xl text-transparent md:text-7xl">
          Questions
        </span>
        when you need them
      </h1>
      <Bucket onLoad={() => setLoaded(true)} />
    </section>
  );
};

export default Hero;

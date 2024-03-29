"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import Bucket from "@/components/QuestionComponents/Bucket";
import logo from "../../../assets/logo.png";
import { useLayoutEffect } from "react";

export type SizeType = "small" | "normal" | "large" | "extra large";

const Widget: React.FC = () => {
  const searchParams = useSearchParams();

  const queryParams = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
    parseNumbers: true,
    parseBooleans: true,
  });

  useLayoutEffect(() => {
    document.documentElement.style.backgroundColor = "transparent";
  }, []);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <Bucket {...queryParams} />
        <Link
          href="/"
          className="mt-2 flex gap-2 rounded-md bg-primary px-2 py-1 text-primary-content"
        >
          <Image src={logo} alt="monkey emoji" className="w-7" />
          monkeyspout.com
        </Link>
      </div>
    </>
  );
};

export default Widget;

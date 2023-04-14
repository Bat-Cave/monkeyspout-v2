"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import Bucket from "~/components/QuestionComponents/Bucket";
import logo from "../../assets/logo.png";

export type SizeType = "small" | "normal" | "large" | "extra large";

const Widget: React.FC = () => {
  const searchParams = useSearchParams();

  const queryParams = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
    parseNumbers: true,
    parseBooleans: true,
  });

  return (
    <>
      <Head>
        <title>Monkey Spout | Widget</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-full flex-col items-center justify-center">
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

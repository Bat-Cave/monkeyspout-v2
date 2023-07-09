import { type NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import Layout from "~/components/Layout";
import Bucket from "~/components/QuestionComponents/Bucket";
import { api } from "~/utils/api";
import QuestionSplash from "~/components/QuestionSplash";
import { useMemo, useState } from "react";
import Link from "next/link";
import useWindowSize from "~/hooks/useWindowSize";
import { QuestionsProvider } from "~/context/useQuestions";
const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [loaded, setLoaded] = useState(false);
  const { data } = api.questions.getCount.useQuery();
  const { width } = useWindowSize();

  const fontSize = useMemo(() => {
    if (width >= 1024) {
      return "250px";
    }
    if (width < 1024 && width > 449) {
      return "150px";
    }
    if (width < 450) {
      return "100px";
    }
  }, [width]);

  const lineHeight = useMemo(() => {
    if (width >= 1024) {
      return "270px";
    }
    if (width < 1024 && width > 449) {
      return "170px";
    }
    if (width < 450) {
      return "110px";
    }
  }, [width]);

  return (
    <>
      <Head>
        <title>Monkey Spout</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <span className="absolute right-12 top-28 z-0 h-[500px] w-[600px] rotate-12 rounded-full bg-gradient-to-tr from-primary to-primary-focus opacity-30 blur-3xl"></span>
        <span className="absolute left-12 top-96 z-0 h-[300px] w-[400px] rotate-12 rounded-full bg-gradient-to-tr from-secondary to-secondary-focus opacity-30 blur-3xl"></span>
        <section className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-md flex-col items-center py-12 md:max-w-none">
          {loaded ? <QuestionSplash /> : null}
          <h1 className="z-20 my-12 w-full max-w-3xl text-left text-3xl font-extrabold md:text-center md:text-7xl">
            <span className="mr-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-5xl text-transparent md:text-7xl">
              Questions
            </span>
            when you need them
          </h1>
          <Bucket onLoad={() => setLoaded(true)} useLocalQuestions={true} />
        </section>

        <section className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center gap-4 overflow-hidden font-bold sm:gap-12">
          <div className="flex flex-col items-center">
            <div className="relative flex h-full w-full justify-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              <div className="absolute inset-0 z-30 bg-gradient-to-t from-base-300 via-transparent to-base-300"></div>
              <AnimatedNumbers
                includeComma
                animateToNumber={data || 0}
                fontStyle={{
                  fontSize: fontSize,
                  lineHeight: lineHeight,
                }}
                locale="en-US"
                configs={(number, index) => {
                  return {
                    mass: 2,
                    tension: 700 * (index * 0.1 + 1),
                    friction: 200,
                  };
                }}
              />
            </div>
            <p className="text-5xl">questions at the ready</p>
          </div>
          <p className="max-w-lg text-left text-lg sm:text-center sm:text-xl">
            Whether you&apos;re looking for icebreakers, interview questions, or
            just a fun game to play with friends, our categorized questions have
            got you covered. With a wide range of topics and regular updates,
            you&apos;ll never run out of fresh content. So why settle for boring
            small talk when you can spice up any conversation with our
            thought-provoking and engaging questions?
          </p>
        </section>

        <section className="relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center">
          <span className="absolute left-24 top-28 z-0 h-[300px] w-[400px] rotate-12 rounded-full bg-gradient-to-tr from-secondary to-secondary-focus opacity-30 blur-3xl"></span>
          <div className="z-10 flex w-full flex-col items-center justify-center">
            <h3 className="text-5xl font-bold">Customize to your liking</h3>
            <div className="mt-12 flex w-full max-w-md flex-col items-center gap-4 lg:max-w-3xl lg:flex-row">
              <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
                <p className="w-full text-left text-3xl font-bold sm:text-center lg:text-right">
                  Change the colors!
                </p>
              </div>
              <Bucket
                {...{
                  backgroundColor: "#ffffff",
                  backgroundColorEnd: "#ffffff",
                  borderColor: "#2737d9",
                  countdownBarColor: "#2737d9",
                  countdownBarEndColor: "#2737d9",
                  dropCount: 1,
                  textColor: "#000000",
                }}
              />
            </div>
            <div className="mt-12 flex w-full max-w-md flex-col items-center gap-4 lg:max-w-3xl lg:flex-row">
              <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
                <p className="w-full text-left text-3xl font-bold sm:text-center lg:text-right">
                  Hidden categories and controls!
                </p>
              </div>
              <Bucket
                {...{
                  dropCount: 1,
                  showCategories: false,
                  showCopy: false,
                  showPlayPause: false,
                  showSkip: false,
                }}
              />
            </div>
            <div className="mt-12 flex w-full max-w-md flex-col items-center gap-4 lg:max-w-3xl lg:flex-row">
              <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
                <p className="w-full text-left text-3xl font-bold sm:text-center lg:text-right">
                  Narrowed down questions to &quot;Fun&quot; category only
                </p>
              </div>
              <QuestionsProvider>
                <Bucket
                  {...{
                    backgroundColor: "#1FB2A5",
                    backgroundColorEnd: "#198E84",
                    borderColor: "#1FB2A5",
                    countdownBarColor: "#002334",
                    countdownBarEndColor: "#004a6e",
                    dropCount: 1,
                    excludedCategories: [
                      "Open-ended",
                      "Philosophical",
                      "Ethical",
                      "Career",
                      "Controversial",
                      "Creative",
                      "Hypothetical",
                      "Knowledge-based",
                      "Curiosity",
                      "Personal",
                      "Opinion-based",
                      "Relationship",
                      "Reflective",
                    ],
                    showCopy: false,
                    showPlayPause: false,
                    textColor: "#002334",
                    // useLocalQuestions: true,
                  }}
                />
              </QuestionsProvider>
            </div>
            <br />
            <br />
            <br />
            <Link
              href="/widget/create/"
              className="btn-primary btn h-24 w-full text-lg normal-case sm:w-80 sm:text-2xl"
            >
              Create your own widget
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;

import { type NextPage } from "next";
import Bucket from "~/components/QuestionComponents/Bucket";
import QuestionSplash from "~/components/QuestionSplash";
import Link from "next/link";
import { QuestionsProvider } from "~/context/useQuestions";
import QuestionCount from "~/components/question-count";
import Hero from "~/components/hero";

const Home: NextPage = () => {
  // const fontSize = useMemo(() => {
  //   if (width >= 1024) {
  //     return "250px";
  //   }
  //   if (width < 1024 && width > 449) {
  //     return "150px";
  //   }
  //   if (width < 450) {
  //     return "100px";
  //   }
  // }, [width]);

  // const lineHeight = useMemo(() => {
  //   if (width >= 1024) {
  //     return "270px";
  //   }
  //   if (width < 1024 && width > 449) {
  //     return "170px";
  //   }
  //   if (width < 450) {
  //     return "110px";
  //   }
  // }, [width]);

  return (
    <>
      <span className="to-primary-focus absolute right-12 top-28 z-0 h-[500px] w-[600px] rotate-12 rounded-full bg-gradient-to-tr from-primary opacity-30 blur-3xl"></span>
      <span className="to-secondary-focus absolute left-12 top-96 z-0 h-[300px] w-[400px] rotate-12 rounded-full bg-gradient-to-tr from-secondary opacity-30 blur-3xl"></span>
      <Hero />

      <QuestionCount />

      <section className="relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center">
        <span className="to-secondary-focus absolute left-24 top-28 z-0 h-[300px] w-[400px] rotate-12 rounded-full bg-gradient-to-tr from-secondary opacity-30 blur-3xl"></span>
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
    </>
  );
};

export default Home;

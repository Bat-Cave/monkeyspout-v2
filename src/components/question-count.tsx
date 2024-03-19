import supabase from "~/lib/supabase";
import Counter from "./counter";

const QuestionCount = async () => {
  const { count } = await supabase
    .from("Questions")
    .select("id", { count: "estimated" });

  return (
    <section className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center gap-4 overflow-hidden font-bold sm:gap-12">
      <div className="flex flex-col items-center">
        <div className="relative flex w-full justify-center bg-gradient-to-r from-primary to-secondary bg-clip-text pb-4 text-transparent">
          <div className="absolute inset-0 z-30 bg-gradient-to-t from-base-300/40 via-transparent to-base-300/60"></div>
          <Counter value={count || 1018} />
        </div>
        <p className="text-5xl">questions at the ready</p>
      </div>
      <p className="max-w-lg text-left text-lg sm:text-center sm:text-xl">
        Whether you&apos;re looking for icebreakers, interview questions, or
        just a fun game to play with friends, our categorized questions have got
        you covered. With a wide range of topics and regular updates,
        you&apos;ll never run out of fresh content. So why settle for boring
        small talk when you can spice up any conversation with our
        thought-provoking and engaging questions?
      </p>
    </section>
  );
};

export default QuestionCount;

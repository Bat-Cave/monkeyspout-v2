import { type NextPage } from "next";
import Head from "next/head";

import Layout from "~/components/Layout";
import Bucket from "~/components/QuestionComponents/Bucket";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Monkey Spout</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="my-12 w-full max-w-lg text-left text-3xl font-extrabold md:text-center md:text-7xl">
          <span className="mr-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-5xl text-transparent md:text-7xl">
            Questions
          </span>
          when you need them
        </h1>
        <Bucket dropCount={3} />
      </Layout>
    </>
  );
};

export default Home;

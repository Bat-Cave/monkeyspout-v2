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
        <h1 className="my-12 max-w-lg text-center text-7xl font-extrabold">
          <span className="mr-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Questions
          </span>
          when you need them
        </h1>
        <Bucket />
      </Layout>
    </>
  );
};

export default Home;

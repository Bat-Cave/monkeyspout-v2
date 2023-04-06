import { type NextPage } from "next";
import Head from "next/head";
import { format } from "date-fns";

import Layout from "~/components/Layout";
import AddQuestionModal from "~/components/QuestionComponents/AddQuestionModal";
import { useUser } from "@clerk/nextjs";
import { categories } from "~/utils/quesitons";

const Admin: NextPage = () => {
  const { isSignedIn, user } = useUser();
  const role = user?.organizationMemberships[0]?.role;

  if (!isSignedIn) {
    return <>Loading</>;
  }

  if (isSignedIn && role !== "admin") {
    return <>Not Allowed</>;
  }

  // const { data } = api.questions.getAll.useQuery();
  console.log(categories);
  return (
    <>
      <Head>
        <title>Monkey Spout | Admin</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="my-12 max-w-lg text-center text-7xl font-extrabold">
          <span className="mr-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin
          </span>
        </h1>
        <div className="grid w-full grid-cols-1 gap-1 pt-3 pb-11 md:grid-cols-2 lg:grid-cols-3">
          {categories?.map((category) => {
            const { label, color } = category;
            return (
              <div
                key={color}
                className="flex w-full items-center gap-2 rounded-lg bg-neutral p-2"
              >
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ background: color }}
                ></span>
                <p>{label}</p>
              </div>
            );
          })}
        </div>
        <div className="mb-3 flex w-full items-center justify-between md:max-w-5xl">
          <h2 className="text-4xl font-bold">Questions</h2>
          <AddQuestionModal />
        </div>
        {/* <div className="margin-x-auto w-full overflow-x-auto md:max-w-6xl">
          <table className="table-compact table w-full">
            <thead>
              <tr>
                <th>Created</th>
                <th>Updated</th>
                <th>Question</th>
                <th>Category</th>
                <th>Type</th>
                <th>Special</th>
                <th>Timeout</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((q) => {
                const {
                  id,
                  createdAt,
                  updatedAt,
                  question,
                  category,
                  type,
                  special,
                  timeout,
                } = q;
                return (
                  <tr key={id}>
                    <td>{format(createdAt, "MM/dd/yyyy")}</td>
                    <td>{format(updatedAt, "MM/dd/yyyy")}</td>
                    <td>{question}</td>
                    <td>{category}</td>
                    <td>{type}</td>
                    <td>{special}</td>
                    <td>{timeout}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
      </Layout>
    </>
  );
};

export default Admin;

import { type NextPage } from "next";
import type { Question } from "@prisma/client";
import Head from "next/head";
import { format } from "date-fns";
import Layout from "~/components/Layout";
import AddQuestionModal from "~/components/QuestionComponents/AddQuestionModal";
import { useUser } from "@clerk/nextjs";
import { categories } from "~/utils/quesitons";
import { api } from "~/utils/api";
import { Cancel, Check, EditPencil } from "iconoir-react";
import EditQuestionModal from "~/components/QuestionComponents/EditQuestionModal";
import { useState } from "react";
import Spinner from "~/components/Spinner";

const Admin: NextPage = () => {
  const [currQuestion, setCurrQuestion] = useState<Question | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [showResolvedFlags, setShowResolvedFlags] = useState(false);
  const { isSignedIn, user } = useUser();
  const role = user?.organizationMemberships[0]?.role;

  const ctx = api.useContext();
  const { data: flagData } = api.flags.getAll.useQuery();
  const { mutate, isLoading } = api.flags.update.useMutation({
    onSuccess: () => {
      void ctx.flags.getAll.invalidate();
    },
  });

  const handleQuestionEdit = (q: Question) => {
    setCurrQuestion(q);
    setEditOpen(true);
  };

  const handleMarkResolved = (id: number, resolved: boolean) => {
    void mutate({
      id,
      resolved: !resolved,
    });
  };

  if (!isSignedIn) {
    return <>Loading</>;
  }

  if (isSignedIn && role !== "admin") {
    return <>Not Allowed</>;
  }

  const filteredFlagData = flagData?.filter((flag) => {
    if (!showResolvedFlags) {
      return flag.resolved === false;
    } else {
      return true;
    }
  });
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
        <div className="mb-3 flex w-full items-center justify-between md:max-w-5xl">
          <h2 className="text-4xl font-bold">Flags</h2>
          <label className="label flex cursor-pointer gap-3">
            <span className="label-text">Show Resolved Flags</span>

            <input
              type="checkbox"
              className="toggle-primary toggle"
              checked={showResolvedFlags}
              onChange={() => setShowResolvedFlags(!showResolvedFlags)}
            />
          </label>
        </div>
        <div className="margin-x-auto w-full overflow-x-auto">
          <table className="table-compact table w-full">
            <thead>
              <tr>
                <th className="w-1/12">Created</th>
                <th className="w-3/12">Question</th>
                <th className="w-2/12">Issue</th>
                <th className="w-3/12">Description</th>
                <th className="w-3/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlagData?.length ? (
                filteredFlagData?.map((q) => {
                  const {
                    flagId,
                    createdAt,
                    question,
                    issue,
                    description,
                    resolved,
                  } = q;
                  return (
                    <tr key={flagId}>
                      <td>{format(createdAt, "MM/dd/yyyy")}</td>
                      <td>{question.question}</td>
                      <td>{issue}</td>
                      <td>{description}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleQuestionEdit(question)}
                            className="btn-xs btn px-2"
                          >
                            <EditPencil /> Edit Question
                          </button>
                          <button
                            onClick={() => handleMarkResolved(flagId, resolved)}
                            className="btn-xs btn px-2"
                          >
                            {isLoading ? (
                              <Spinner className="h-4 w-4 border-2" />
                            ) : (
                              <>
                                {resolved ? (
                                  <>
                                    <Cancel /> Mark Unresolved
                                  </>
                                ) : (
                                  <>
                                    <Check /> Mark Resolved
                                  </>
                                )}
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No flags</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
          <EditQuestionModal
            isOpen={editOpen}
            setIsOpen={setEditOpen}
            handleClose={() => setEditOpen(false)}
            question={currQuestion}
          />
        </div>
        <div className="my-3 flex w-full items-center justify-between md:max-w-5xl">
          <h2 className="text-4xl font-bold">Categories</h2>
        </div>
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

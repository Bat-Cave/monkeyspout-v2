import supabase from "@/lib/supabase";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/UI/card";
import AnimatedNumber from "@/components/UI/animated-number";

const Admin = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] } | undefined;
}) => {
  const perPage = 10;
  const { count: totalQuestions } = await supabase
    .from("Questions")
    .select("*", { count: "estimated" });

  const { count: totalFlags, error: flagsError } = await supabase
    .from("Flags")
    .select("*", { count: "estimated" });

  if (!totalQuestions || flagsError) {
    //TODO: Have this throw an error and add an error screen via error.tsx
    return <div>There was an error connecting to the database</div>;
  }

  const totalPages = Math.ceil((totalQuestions || 0) / perPage);
  const page =
    typeof searchParams?.page === "string" &&
    +searchParams?.page > 1 &&
    +searchParams?.page <= totalPages
      ? +searchParams?.page
      : 1;
  const { data: questions } = await supabase
    .from("Questions")
    .select("*")
    .range((page - 1) * perPage, page * perPage);

  if (!questions) {
    return <div>failed to load questions</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Card className="py-1">
          <CardHeader className="py-1 text-2xl">Questions</CardHeader>
          <CardContent className="flex flex-col items-center gap-2 py-2">
            <AnimatedNumber
              value={totalQuestions}
              className="text-6xl font-semibold"
            />{" "}
          </CardContent>
        </Card>
        <Card className="py-1">
          <CardHeader className="py-1 text-2xl">Flags</CardHeader>
          <CardContent className="flex flex-col items-center gap-2 py-2">
            <AnimatedNumber
              value={totalFlags || 0}
              className="text-6xl font-semibold"
            />{" "}
          </CardContent>
        </Card>
      </div>
      <DataTable columns={columns} data={questions} />
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-50">
          Showing{" "}
          <span className="font-semibold">{(page - 1) * perPage + 1}</span> to{" "}
          <span className="font-semibold">
            {Math.min(page * perPage, totalQuestions)}
          </span>{" "}
          of <span className="font-semibold">{totalQuestions}</span> users
        </p>
        <div className="space-x-2">
          <Link
            href={page >= 2 ? `/admin?page=${page - 1}` : "/"}
            className={`${
              page === 1 ? "pointer-events-none opacity-50" : ""
            } inline-flex items-center justify-center rounded-md border border-gray-300 bg-base-300 px-3 py-2 text-sm font-semibold text-gray-50`}
          >
            Previous
          </Link>
          <Link
            href={
              page < totalPages
                ? `/admin?page=${page + 1}`
                : `/admin?page=${page}`
            }
            className={`${
              page >= totalPages ? "pointer-events-none opacity-50" : ""
            } inline-flex items-center justify-center rounded-md border border-gray-300 bg-base-300 px-3 py-2 text-sm font-semibold text-gray-50 `}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;

"use client";

import type { Tables } from "@/types/supabase";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import { MoreHoriz } from "iconoir-react";
import { toast } from "sonner";

export const columns: ColumnDef<Tables<"Questions">>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const question = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="btn-secondary btn btn-sm h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHoriz className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                void navigator.clipboard.writeText(question.question || "");
                toast.success("Question copied to clipboard 👍");
              }}
            >
              Copy Question
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <p>View customer</p>
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "question",
    header: "Question",
    cell: ({ cell }) => {
      const value = cell.getValue();
      return (
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        <div className="max-w-sm truncate" title={`${value}`}>{`${value}`}</div>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const formatted = parseInt(row.getValue("duration")) / 1000;

      return <div className="text-right font-medium">{formatted}s</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const formatted = format(
        new Date(row.getValue("updated_at")),
        "mm/dd/yyyy"
      );

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated",
    cell: ({ row }) => {
      const formatted = format(
        new Date(row.getValue("updated_at")),
        "mm/dd/yyyy"
      );

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

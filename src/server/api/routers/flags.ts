import type { Flag } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const flagRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.flag.findMany({ include: { question: true } });
  }),
  create: publicProcedure
    .input(
      z.object({
        questionId: z.string(),
        issue: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }): Promise<Flag> => {
      const { questionId, issue, description } = input;
      const flag = await ctx.prisma.flag.create({
        data: {
          question: { connect: { id: questionId } },
          issue,
          description,
          resolved: false,
        },
      });

      return flag;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        resolved: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }): Promise<Flag> => {
      const { id, resolved } = input;
      const flag = await ctx.prisma.flag.update({
        where: { flagId: id },
        data: { resolved },
      });

      return flag;
    }),
});

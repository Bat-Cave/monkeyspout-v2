import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questionsRouter = createTRPCRouter({
  getCount: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.question.count();
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany();
  }),
  getByFilter: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const categories = input
      .split(",")
      .sort()
      .filter((cat) => cat !== "");
    const catQuery = categories.map((cat) => ({ category: { contains: cat } }));

    if (categories.length === 0) {
      return ctx.prisma.question.findMany();
    }

    return ctx.prisma.question.findMany({
      where: {
        NOT: {
          OR: catQuery,
        },
      },
    });
  }),
  create: publicProcedure
    .input(
      z.object({
        category: z.string(),
        type: z.string(),
        special: z.string(),
        question: z.string(),
        timeout: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { question, category, type, special, timeout } = input;
      const res = await ctx.prisma.question.create({
        data: { question, category, type, special, timeout },
      });

      return res;
    }),
});

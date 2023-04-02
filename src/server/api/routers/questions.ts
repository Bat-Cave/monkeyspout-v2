import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questionsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany({ take: 100 });
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
  generateDefault: publicProcedure
    .input(
      z.array(
        z.object({
          category: z.string(),
          type: z.string(),
          special: z.string(),
          question: z.string(),
          timeout: z.string(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.question.createMany({
        data: input,
      });
      return res;
    }),
});

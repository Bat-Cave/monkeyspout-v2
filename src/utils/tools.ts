import type { Question } from "@prisma/client";

export const shuffle = (array: Question[]) => {
  return array
    .map((val) => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ val }) => val);
};

export const pickAndRemoveRandomItem = (array: Question[]) => {
  const newArray = array;
  const index = Math.floor(Math.random() * newArray.length - 1);
  const item = newArray[index] as Question;
  newArray.splice(index, 1);
  return { item, newArray };
};

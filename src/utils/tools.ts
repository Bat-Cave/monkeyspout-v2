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

export const removeAndPushToEnd = (arr: number[], num: number): number[] => {
  const index = arr.indexOf(num);
  if (index !== -1) {
    arr.splice(index, 1);
    arr.push(num);
  }
  return arr;
};

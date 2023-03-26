import type { Question } from "@prisma/client";

export const shuffle = (array: Question[]) => {
  if (array.some((item) => item === undefined)) {
    throw new Error("Array cannot contain undefined values");
  }

  let currentIndex = array.length - 1;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    // @ts-ignore
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const pickAndRemoveRandomItem = (array: Question[]) => {
  const newArray = array;
  const index = Math.floor(Math.random() * newArray.length - 1);
  const item = newArray[index];
  newArray.splice(index, 1);
  return { item, newArray };
};

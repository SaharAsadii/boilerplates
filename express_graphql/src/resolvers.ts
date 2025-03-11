import { User } from "./models";

type Pet = {
  id: string;
  name: string;
  age: number;
  pictureUri: string;
  ownerName: string;
};

const getPet = (args: { id: string }) => {
  return User.find((pet: Pet) => pet.id === args.id);
};

export const root = {
  getPet
};

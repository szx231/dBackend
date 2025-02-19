import { hashSync, compareSync } from 'bcrypt';

export const createHash = (password: string) => {
  return hashSync(password, 10);
};

export const compare = (password: string, hash: string) => {
  return compareSync(password, hash);
};

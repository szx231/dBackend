import { compareSync, hashSync } from 'bcrypt';

export const createHash = (password: string) => {
  return hashSync(password, 10);
};

export const compareHashes = (password: string, hash: string) => {
  return compareSync(password, hash);
};

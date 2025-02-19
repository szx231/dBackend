import { dbService } from '@/services/index.js';
import { z } from 'zod';

const checkGender = async (value: string) => {
  const list = await dbService.info.getGenders();
  console.log(list, 'list');
  return list.includes(value);
};

const checkRelationType = async (value: string) => {};
const checkJobTitle = async (value: string) => {};
const checkLanguages = async (value: string) => {};

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  fullName: z.string(),
  dateBirth: z.date({ coerce: true }),
  gender: z.string().refine(checkGender, { message: 'Invalid gender type' }),
  partnerGender: z.string().refine(checkGender, { message: 'Invalid gender type' }),
  height: z.coerce.number(),
  relationType: z.string(),
  jobTitleId: z.string(),
  languages: z.array(z.string()),
});

export type RegisterUserBody = z.infer<typeof registerUserSchema>;

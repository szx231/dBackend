import { z } from 'zod';

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  fullName: z.string(),
  dateBirth: z.coerce.date(),
  gender: z.string(),
  partnerGender: z.string(),
  height: z.coerce.number(),
  relationType: z.string(),
  jobTitleId: z.string(),
  languages: z.array(z.string()),
});

export type RegisterUserBody = z.infer<typeof registerUserSchema>;

export const logInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LogInBody = z.infer<typeof logInSchema>;

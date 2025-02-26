import { z } from 'zod';

export const updateInterestsSchema = z.array(z.string());
export type UpdateInterestsBody = z.infer<typeof updateInterestsSchema>;

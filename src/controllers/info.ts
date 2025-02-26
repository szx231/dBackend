import { dbService } from '@/services/index.js';

export const getInterests = async () => {
  const interests = await dbService.info.getInterests();
  return interests;
};

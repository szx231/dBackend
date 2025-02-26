import { dbService } from '@/services/index.js';

export const getInterests = async () => {
  const interests = await dbService.info.getInterests();
  return interests;
};

export const getLanguages = async () => {
  const languages = await dbService.languages.getWithCountries();
  return languages;
};

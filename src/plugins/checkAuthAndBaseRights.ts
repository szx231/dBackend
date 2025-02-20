import { checkAuth } from '@/plugins/checkAuth.js';
import { checkForBaseRights } from '@/plugins/checkForBaseRights.js';

export const checkAuthAndBaseRights = [checkAuth, checkForBaseRights];

import { PrismaClient } from '@prisma/client';
import createDebug from 'debug';

const debug = createDebug('W7*:db connect');

export const dbConnect = async () => {
  debug('connecting to database');
  const prisma = new PrismaClient();
  return prisma;
};

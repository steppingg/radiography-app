// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

interface User {
  _id: string;
  email: string;
  password: string;
}

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const newUser = await prisma.user.create({
  //   data: {
  //     email: 'alice@prisma.io',
  //     password: '123123'
  //   },
  // })
  const users: User = await prisma.user.findMany()
  
  return res.json({users});
}

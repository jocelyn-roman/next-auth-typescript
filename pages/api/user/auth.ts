
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma";
import { PrismaClient, Prisma } from '@prisma/client'
import { hashPassword } from '@/lib/helpers';


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await loginUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

async function loginUserHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid Inputs" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { 
        email: email,
        password: hashPassword(password) 
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });
    await prisma.$disconnect();

    if (!user)
      return res.status(401).json({ message: "invalid credentials" });
      
    return res.status(200).json(user);
    
  } catch (e: any) {
    throw new Error(e);
  }
}
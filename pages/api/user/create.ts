
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma";
import { PrismaClient, Prisma } from '@prisma/client'
import { hashPassword } from '@/lib/helpers';


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await createUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

async function createUserHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let errors = [];
  const { name, email, password } = req.body;
 
  if (password.length < 6) {
    errors.push("password length should be more than 6 characters");
    return res.status(400).json({ errors });
  }

  try {
    const user = await prisma.user.create({
      data: { 
        name: name,
        email: email,
        password: hashPassword(password) 
      },
    });
    return res.status(201).json({ user });
    
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: e.message });
      }
      return res.status(400).json({ message: e.message });
    }
  }
  await prisma.$disconnect();
}
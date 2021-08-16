import prisma from '../../lib/prisma';

export const findUser = async (email) => {
  return await prisma.user.findUnique({
    where: { email: String(email) },
  });
};

export const createUser = async (user) => {
  await prisma.user.create({data: user});
  const newUser = await findUser(user.email);
  return newUser;
};

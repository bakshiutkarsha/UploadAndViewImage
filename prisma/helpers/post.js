import prisma from '../../lib/prisma';
import { findUser, createUser } from './user';
import { google_translate_with_cache } from './translate';

export const fetchPosts = async () => {
  return await prisma.post.findMany({
    include: { author: true },
    orderBy: [
       { createdAt: 'desc' },
    ]
  });
};

export const findPost = async (id) => {
  return await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  });
};

export const createPost = async (post) => {
  const user = await findUser(post.email);

  // If User is found then add authorId from existing user
  // else create a new user and add it's id as authorId
  if (user) {
    post.authorId = user.id;
  } else {
    const newUser = await createUser({email: post.email, name: post.name});
    post.authorId = newUser.id;
  }

  // Omitting extra values while posting 
  const { name, email, ...omittedPost } = post

  // Translate the content and add in db
  const translatedContent = await transalteContent(post.content);
  omittedPost.translate = translatedContent;

  const newPost = await prisma.post.create({data: omittedPost});
  return newPost;
};

const transalteContent = async (content) => {
  try {
    const result = await google_translate_with_cache(content, {
      from: "en",
      to: "hi",
    });
    
    return result;
  } catch(err){
      console.error(err);
  }
}
  
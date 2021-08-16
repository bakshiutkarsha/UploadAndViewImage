import { createPost } from '../../../prisma/helpers/post';

const handleCreatePost = async (postData, res) => {
  const response = await createPost(postData);
  res.status(201).send(response);
};

// POST /api/posts
export default async (req, res) => {
  const post = req.body;

  if (req.method === 'POST') {
    await handleCreatePost(post, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
};

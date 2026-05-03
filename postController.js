const posts = [
  {id: 1, title: "Post one"},
  {id: 2, title: "Post two"}
];

const getPosts = () => {
  return posts;
}

export const getPostsLength = () => {
  return posts.length;
}

export { getPosts };
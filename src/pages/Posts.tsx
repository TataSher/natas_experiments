import { useGetPostsQuery } from "../services/postsApi";

export default function Posts() {
  const { data, isLoading } = useGetPostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No posts found</div>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

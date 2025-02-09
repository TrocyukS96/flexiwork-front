"use client";
import { useDeletePost, useGetPosts } from "@/shared/api/queries/posts-queries";
import { PostItem } from "../ui/post-item";

export const PostsList = () => {
  const { isFetching, data } = useGetPosts();
  const deletePostMutation = useDeletePost()

  const posts = data?.data?.posts && Array.isArray(data.data?.posts) ? data.data.posts : []

  const deleteItem = (id: number) => {
    deletePostMutation.mutate(id);
  };

  if (isFetching) {
    return <div>...loading</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {posts.map((post:any) => (
        <PostItem key={post.id} post={post} handleDelete={deleteItem} />
      ))}
    </div>
  );
};

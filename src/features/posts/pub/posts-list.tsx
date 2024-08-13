"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PostItem } from "../ui/post-item";
import { BASE_URL } from "@/shared/constants";

export const PostsList = () => {
  const queryClient = useQueryClient();

  const { isFetching, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get(BASE_URL+'/posts');
      return response.data.posts as PostListElement[];
    },
  });

  const postDeleteMutation = useMutation({
    mutationFn: async(id: number) => {
      return await axios.delete(`${BASE_URL}/${id}`,);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  console.log("data", data);

  const deleteItem = (id: number) => {
    postDeleteMutation.mutate(id);
  };

  if (isFetching) {
    return <div>...loading</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {data?.map((post) => (
        <PostItem key={post.id} post={post} handleDelete={deleteItem} />
      ))}
    </div>
  );
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getQueryConfig } from "../api";
import { requestStatuses } from "@/shared/constants";

export const useGetPosts = () => {
  return useQuery({
    queryKey: [requestStatuses.GET_POSTS],
    queryFn: async () => {
      return await getQueryConfig({
        url: "/posts",
        method: "get",
      });
    },
  });
};

export const useDeletePost = () =>{
    const queryClient = useQueryClient();
    const fetchData = async(id:number) =>{
        return await getQueryConfig({
            url: `/posts/${id}`,
            method:'delete'
          });
    }

    return useMutation({
        mutationFn: fetchData,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [requestStatuses.GET_POSTS] });
        },
      });
}

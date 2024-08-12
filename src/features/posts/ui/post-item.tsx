import { Button } from "@/shared/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export const PostItem = ({
  post,
  handleDelete,
}: {
  post: PostListElement;
  handleDelete: (id: number) => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription className="flex justify-between items-center">
          <div>{post.description}</div>
          <Button onClick={()=>handleDelete(post.id)}>X</Button>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

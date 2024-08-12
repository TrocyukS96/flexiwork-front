type PostListElement = {
    id: number;
    title: string;
    description: string;
  };
  
  type CreatePostListElementCommand = {
    title: string;
    description: string;
  };
  
  type DeletePostListElementCommand = {
    id: string;
  };
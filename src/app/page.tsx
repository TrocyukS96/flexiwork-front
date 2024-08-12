import { PostsForm } from "@/features/posts/pub/posts-form";
import { PostsList } from "@/features/posts/pub/posts-list";
import { Button } from "@/shared/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen px-8 py-8">
      {/* <Button>Button</Button> */}
      <PostsForm />
      <PostsList />
    </main>
  );
}

'use-client'
import { PostsForm } from "@/features/posts/pub/posts-form";
import { PostsList } from "@/features/posts/pub/posts-list";
import WithAuth from "@/shared/hoks/withAuthGuard";

export default function Home() {
  return (
    <WithAuth>
      <main className="min-h-screen px-8 py-8">
        {/* <Button>Button</Button> */}
        <PostsForm />
        <PostsList />
      </main>
    </WithAuth>
  );
}

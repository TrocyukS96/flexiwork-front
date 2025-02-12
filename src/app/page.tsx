"use-client";
import WithAuth from "@/shared/hoks/withAuthGuard";
import MainLayout from "@/shared/layouts/MainLayout";

export default function Home() {
  return (
    <WithAuth>
      <MainLayout>
        <div>Главная 123</div>
      </MainLayout>
    </WithAuth>
  );
}

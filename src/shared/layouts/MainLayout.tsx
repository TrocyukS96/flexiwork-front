"use-client";
import { ReactElement } from "react";

export default function MainLayout({ children }: { children: ReactElement }) {

  return (
    <main className="h-screen flex justify-center items-center bg-center bg-cover bg-no-repeat">
        {children}
    </main>
  );
}

import { Navigation } from "@/entities/navigation";
import { ReactElement } from "react";

export default function MainLayout({ children }: { children: ReactElement }) {
  return (
    <div className="p-6 h-screen flex bg-black bg-center bg-cover bg-no-repeat">
      <Navigation/>
      <main className="flex-1 p-4 text-white">
        Центральный контент
        {children}
      </main>
    </div>
  );
}

"use-client";
import Image from "next/image";
import { ReactElement } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "../constants";

export default function AuthLayout({ children }: { children: ReactElement }) {
  const router = useRouter();
  const pathName = usePathname();
  const tabsTriggerClass = `
  h-full w-3/6 p-0
  bg-transparent
  backdrop-opacity-10
  text-2xl text-white 
  rounded-none
  data-[state=active]:bg-white/30
  data-[state=active]:text-white 
  data-[state=active]:backdrop-blur-sm
  data-[state=active]:rounded-t-md
  `;

  const tabContentClass = `
   mt-0 
   pt-9 pb-9 pl-14 pr-14 
   backdrop-blur-sm
   border border-white
   rounded-b-md
   bg-[rgba(34, 18, 80, 0.10)]
  `;

  return (
    <div className="h-screen flex justify-center items-center bg-auth-layout-bg bg-center bg-cover bg-no-repeat">
      <div className="flex flex-col gap-y-12">
        <Image
          src={"/images/auth-logo.png"}
          width={473}
          height={174}
          alt="application logo"
        />
        <div className="w-138">
          <Tabs
            defaultValue={pathName.replace(/^\/+|\/+$/g, "")}
            className=" bg-transparent"
          >
            <TabsList className=" w-full h-16 p-0 bg-transparent">
              <TabsTrigger
                className={tabsTriggerClass}
                value="login"
                onClick={() => {
                  router.push(routes.LOGIN);
                }}
              >
                Вход
              </TabsTrigger>
              <TabsTrigger
                className={tabsTriggerClass}
                value="registration"
                onClick={() => {
                  router.push(routes.REGISTRATION);
                }}
              >
                Регистрация
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className={tabContentClass}>
              {children}
            </TabsContent>
            <TabsContent value="registration" className={tabContentClass}>
              {children}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

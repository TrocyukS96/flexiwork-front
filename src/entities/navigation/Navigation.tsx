"use client";

import { Button } from "@/components/ui/button";
import { ACCESS_TOKEN, routes } from "@/shared/constants";
import { useRouter } from "next/navigation";

interface NavigationProps {}

const Navigation = ({}: NavigationProps) => {
    const router = useRouter();
    return (
        <div className="w-[150px] p-4 border border-white text-white">
        <nav>
          <ul>
            <li className="mb-2 text-white">
              <a href="#" className="">
                Профиль
              </a>
            </li>
            <li className="mb-2 text-white">
              <a href="#" className="">
                Заказы
              </a>
            </li>
            <li className="mb-2 text-white">
              <a href="#" className="">
                Услуги
              </a>
            </li>
            <li className="mb-2 text-white">
              <Button
                className="w-full h-12 text-xs text-white bg-[#9433DC] hover:bg-[#9433DC]"
                onClick={() => {
                  sessionStorage.removeItem(ACCESS_TOKEN);
                  router.push(routes.LOGIN);
                }}
              >
                Выйти
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    )
}

export default Navigation
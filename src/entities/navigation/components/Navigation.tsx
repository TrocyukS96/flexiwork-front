"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/shared/contexts/AuthContext";

interface NavigationProps {}

export const Navigation = ({}: NavigationProps) => {
    const { logout } = useAuth();
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
                onClick={logout}
              >
                Выйти
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    )
}
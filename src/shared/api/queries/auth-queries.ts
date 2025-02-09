"use client";
import { useMutation } from "@tanstack/react-query";
import { getQueryConfig } from "../api";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { BASE_URL, queryKeys } from "../../constants";

export const useLoginMutation = () => {

  const mutationFn = async (body: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<any, any>> => {
    return await getQueryConfig({
      body,
      url: "/auth/sign-in",
      isHideAuthorization:true,
    });

  };

  return useMutation({
    mutationFn,
    onSuccess: (e: AxiosResponse<any>) => {},
    onError: (e: AxiosError<any>) => {},
  });
};

export const useRegisterMutation = () => {
  const mutationFn = async (body: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<any, any>> => {

    return await getQueryConfig({
      body,
      url: "/auth/sign-up",
      isHideAuthorization:true
    });
  };

  return useMutation({
    mutationFn,
    onSuccess: (e: AxiosResponse<any>) => {},
    onError: (e: AxiosError<any>) => {},
  });
};

export const useFetchSession = () => {
  const router = useRouter();

  const fetchData = async () => {

    return axios.get(`${BASE_URL}/auth/session`, {
      withCredentials: true, // Включить отправку cookies
    });
  };

  return useQuery({
    queryKey: [queryKeys.SESSION],
    queryFn: fetchData,
    retry: 1, // Повторить запрос в случае ошибки (например, при временной проблеме)
    staleTime: 5 * 60 * 1000, // Кэшировать данные на 5 минут
    refetchOnWindowFocus: true, // Повторить запрос, если окно снова в фокусе
    refetchInterval: 60000, // Повторно запрашивать сессию каждую минуту
  },);
};

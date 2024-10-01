'use client'
import { useMutation } from "@tanstack/react-query";
import { getQueryConfig } from "./api/api";
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { queryKeys } from "./constants";

export const useLoginMutation = () => {

  const mutationFn = async (body: { email: string; password: string }):Promise<AxiosResponse<any, any>> => {
    return await getQueryConfig({
      body,
      url: "/auth/sign-in",
    });
  };

  return useMutation({
    mutationFn,
    onSuccess: (e: AxiosResponse<any>) => {},
    onError: (e: AxiosError<any>) => {},
  });
};

export const useRegisterMutation = () => {

  const mutationFn = async (body: { email: string; password: string }):Promise<AxiosResponse<any, any>> => {
    return await getQueryConfig({
      body,
      url: "/auth/sign-up",
    });
  };

  return useMutation({
    mutationFn,
    onSuccess: (e: AxiosResponse<any>) => {},
    onError: (e: AxiosError<any>) => {},
  });
};

export const useFetchSession = () => {
  const router = useRouter()
  const fetchData = async () => {
    return await getQueryConfig({
      body: {},
      url: "/auth/session",
      method:'get'
    });
  };

  return useQuery({
    queryKey: [queryKeys.SESSION],
    queryFn: fetchData,
    enabled: true, // Запускать запрос сразу
    refetchInterval: 60000, // Автоматический повторный запрос каждые 60 секунд
  });
};
'use client'
import { useMutation } from "@tanstack/react-query";
import { getQueryConfig } from "./api/api";
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { queryKeys } from "./constants";

export const useLoginMutation = () => {

  const mutationFn = async (body: { email: string; password: string }):Promise<AxiosResponse<any, any>> => {
    return axios.post('http://localhost:4200/api/auth/sign-in', body, {
      withCredentials: true, // Включить отправку cookies
    });
    // return await getQueryConfig({
    //   body,
    //   url: "/auth/sign-in",
      
    // });
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
      method:'get',

    });
  };

  // const fetchSession = async () => {
  //   const response = await axios.get('http://localhost:4200/api/auth/session', {
  //     withCredentials: true, // Включить отправку cookies
  //   });
  //   return response.data;
  // };

  const fetchSession = async () => {
    const response = await fetch('http://localhost:4200/api/auth/session', {
      method: 'GET',
      credentials: 'include', // Включение отправки cookies
    });
    const data = await response.json();
    return data;
  };

  return useQuery({
    queryKey: [queryKeys.SESSION],
    queryFn: fetchSession,
    enabled: true, // Запускать запрос сразу
    refetchInterval: 60000, // Автоматический повторный запрос каждые 60 секунд
    retry: 0,
    staleTime: 5 * 60 * 1000,
  });
};
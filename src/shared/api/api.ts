"use client";
import axios, { AxiosResponse } from "axios";
import { ACCESS_TOKEN, BASE_URL } from "../constants";

const headers = {
  // "Content-Type": "application/json;charset=utf-8",
  withCredentials: true,
  // Accept: 'application/json;charset=utf-8',
  // session_token: '',
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  // 'Access-Control-Allow-Credentials': 'true',
  // 'Access-Control-Allow-Headers': 'X-Requested-With, content-type',
  // 'X-Content-Type-Options': 'nosniff'
};

interface IQueryParams {
  // Authorization: string | null;
  // session_token: string | null;
  headers: { [key: string]: string | null };
  params?: { [key: string]: string | null };
}

interface IPostQueryConfigData<T> {
  body?: T;
  url: string;
  sessionToken?: string | null;
  params?: { [key: string]: string | boolean };
  isHideAuthorization?:boolean
  method?: "get" | "post" | "delete";
}

export const getQueryConfig = async (data: IPostQueryConfigData<any>) => {
  const headParam = {
    ...headers,
      Authorization:!data?.isHideAuthorization ? sessionStorage.getItem(ACCESS_TOKEN) : undefined,
  };

  const queryParams: any = {
    //   Authorization: sessionStorage.getItem('sessionToken'),
    //   session_token: sessionStorage.getItem('sessionToken'),
    headers: headParam,
  };

  if (data?.params) {
    queryParams.params = data?.params;
  }

  const url: string = BASE_URL + data?.url;

  if (data?.method && data.method === "get") {
    return await axios.get<undefined, AxiosResponse<any>>(url, {
      ...queryParams,
    });
  } else if(data.method === "delete"){
    return await axios.delete<undefined, AxiosResponse<any>>(url, {
      ...queryParams,
    });
  } else {
    return await axios.post<undefined, AxiosResponse<any>>(url, data.body, {
      ...queryParams,
    });
  }
};

export const BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4200/api";

export const queryKeys = {
  SESSION: "session",
};

export const routes = {
  REGISTRATION : '/registration',
  LOGIN : '/login',
  HOME:'/'
}

export const ACCESS_TOKEN = 'accessToken'

export const requestStatuses = {
  GET_POSTS: 'get-posts'
}

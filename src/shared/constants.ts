export const BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const queryKeys = {
  SESSION: "session",
};

export const routes = {
  REGISTRATION : '/registration',
  LOGIN : '/login',
  HOME:'/'
}

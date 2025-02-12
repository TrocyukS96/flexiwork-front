export interface LoginDto {
  accessToken: string;
  user: {
    email: string;
    id: number;
    name: string | null;
  };
}
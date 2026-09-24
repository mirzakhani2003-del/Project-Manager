export type UserRole = "manager" | "member";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  teamId: string;
}

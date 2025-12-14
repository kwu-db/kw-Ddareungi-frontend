import { repository } from "mysql2-wizard";

interface User {
  userId: number;
  username: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdDate: Date;
}

const repo = repository<User>({
  table: "users",
  keys: ["userId", "username", "name", "email", "role", "createdDate"],
});

async function read() {
  const results = await repo.select();
  return results;
}

async function authenticate(email: string): Promise<boolean> {
  const admin = await repo.selectOne({ email, role: "ADMIN" });
  return admin ? true : false;
}

async function getUserByEmail(email: string): Promise<{ userId: number; email: string; role: string } | null> {
  const user = (await repo.selectOne({ email })) as { userId: number; email: string; role: string } | null;
  if (user) {
    return {
      userId: user.userId,
      email: user.email,
      role: user.role,
    };
  }
  return null;
}

const adminService = {
  authenticate,
  read,
  getUserByEmail,
};
export default adminService;

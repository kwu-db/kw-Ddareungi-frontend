import { repository } from "mysql2-wizard";

const repo = repository({
  table: "users",
  keys: ["userId", "email", "role"],
});

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
  getUserByEmail,
};
export default adminService;

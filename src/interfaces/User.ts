export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  userId: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdDate: string;
  lastModifiedDate: string;
}


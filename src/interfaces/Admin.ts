export interface AdminRequestDto {
  name: string;
  email: string;
  password: string;
}

export interface AdminResponseDto {
  userId: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdDate: string;
  lastModifiedDate: string;
}

export interface UpdateAdminRequest {
  name?: string;
  email?: string;
  password?: string;
}

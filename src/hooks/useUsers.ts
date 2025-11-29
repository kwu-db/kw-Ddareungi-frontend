"use client";

import { useMutation } from "@tanstack/react-query";
import userService from "@/services/userService";
import { CreateUser } from "@/interfaces/User";

/**
 * 사용자 생성 훅
 */
export function useCreateUser() {
  return useMutation({
    mutationFn: (data: CreateUser) => userService.createUser(data),
  });
}


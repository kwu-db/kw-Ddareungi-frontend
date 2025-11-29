/**
 * 커스텀 훅의 공통 타입 정의
 */

export interface UseQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface UseMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<TData>;
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
}


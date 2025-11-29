export interface ToApi<T> {
  status: "success" | "error";
  statusCode: number;
  message: string;
  count: number;
  data: T;
}

import { createReverseProxy } from "@/utils/proxy";
import { API_BASE_URL } from "@/configs/api";
const origin = API_BASE_URL;
export const { GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD } =
  createReverseProxy(origin, {
    pathReplace: ["/api/server", ""],
  });
export const revalidate = 0;
export const dynamic = "force-dynamic";

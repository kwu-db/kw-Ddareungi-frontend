// API 기본 설정
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://ec2-43-201-119-165.ap-northeast-2.compute.amazonaws.com:8080";

export const API_VERSION = "/api/v1";

// 클라이언트는 /api/server로 요청 (프록시를 통해 백엔드로 전달)
const getApiUrl = () => {
  if (typeof window !== "undefined") {
    // 클라이언트 사이드: Next.js 프록시 사용
    return "/api/server";
  }
  // 서버 사이드: 직접 백엔드 서버 사용
  return `${API_BASE_URL}${API_VERSION}`;
};

// 공통 fetch 함수
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = getApiUrl();
  const url = `${baseUrl}${API_VERSION}${endpoint}`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers,
  };
  const response = await fetch(url, {
    ...options,
    headers,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      status: "error",
      statusCode: response.status,
      message: response.statusText,
    }));
    throw error;
  }
  return response.json();
}

export default fetchApi;

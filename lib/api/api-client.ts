import axios from "axios";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "https://services.realdevsquad.com/staging-todo";

export const apiClient = axios.create({
  baseURL: backendUrl,
  timeout: 30000,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config) => {
    config.headers.set("Content-Type", "application/json");
    return config;
  },
  (error) => {
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error))
    );
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // For cookie-based auth, redirect to login when unauthorized
      if (typeof window !== "undefined") {
        window.location.href = `${backendUrl}/v1/auth/google/login/`;
      }
    }
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error))
    );
  }
);

export async function logoutUser() {
  try {
    await apiClient.get("/v1/auth/google/logout/");
  } catch (e) {
    console.log(e);
  } finally {
    window.location.href = "/";
  }
}

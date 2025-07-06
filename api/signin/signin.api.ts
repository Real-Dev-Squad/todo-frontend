import { apiClient } from "@/utils/api-client"


export const signInWithGoogle = async () => {
  const response = await apiClient.get("/v1/auth/google/login")
  return response.data
}
import { isTokenAboutToExpire } from "../utils/token";
import { refreshToken, logout } from "./auth";

export async function authFetch(url, options = {}) {
  // ✅ Runs BEFORE request
  if (isTokenAboutToExpire()) {
    const refreshed = await refreshToken();

    if (!refreshed) {
      logout();
      throw new Error("Session expired");
    }
  }

  const token = localStorage.getItem("accessToken");

  // ✅ Actual API request happens here
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}

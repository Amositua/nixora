import { getTokenExpiry } from "../utils/token";

export async function refreshToken() {
  try {
    const res = await fetch("/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) return false;

    const data = await res.json();

    const expiry = getTokenExpiry(data.accessToken);

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("accessTokenExpiry", expiry);
    localStorage.setItem("user", JSON.stringify(data.user));

    return true;
  } catch {
    return false;
  }
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("accessTokenExpiry");
  localStorage.removeItem("user");
}

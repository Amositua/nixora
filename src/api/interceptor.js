
import api from "./api";
import { jwtDecode } from "jwt-decode";

const AUTH_EXCLUDED_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
];

let isRefreshing = false;
let refreshPromise = null;

function isTokenAboutToExpire(token) {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() > exp * 1000 - 60_000;
  } catch {
    return true;
  }
}

api.interceptors.request.use(async (config) => {
  if (AUTH_EXCLUDED_ROUTES.some(route => config.url?.includes(route))) {
    return config;
  }

  let accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  console.log("interceptor accesstoken:", accessToken)
  console.log("interceptor refresh token:", refreshToken)

  if (!accessToken || isTokenAboutToExpire(accessToken)) {
    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    if (!isRefreshing) {
      isRefreshing = true;

      refreshPromise = api
        .post("/auth/refresh", { refreshToken })
        .then((res) => {
          const newAccessToken = res.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          if (res.data.refreshToken) {
            localStorage.setItem("refreshToken", res.data.refreshToken);
          }
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          // window.location.href = "/login";
          throw new Error("Session expired");
        })
        .finally(() => {
          isRefreshing = false;
        });
    }

    await refreshPromise;
    accessToken = localStorage.getItem("accessToken");
  }

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

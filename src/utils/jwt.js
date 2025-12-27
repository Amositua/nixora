export function getTokenExpiry(token) {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp * 1000; // ms
}

export function isTokenAboutToExpire() {
  const expiry = localStorage.getItem("accessTokenExpiry");
  if (!expiry) return true;

  return Date.now() > expiry - 60_000; // 1 minute buffer
}

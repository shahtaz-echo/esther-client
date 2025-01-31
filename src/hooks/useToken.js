import { getAuthCookie, removeAuthCookie } from "./useCookie";

export const getTokens = () => {
  const { accessToken: cookieAccessToken, refreshToken: cookieRefreshToken } =
    getAuthCookie();

  const sessionAccessToken = sessionStorage.getItem("vta_auth_access");
  const sessionRefreshToken = sessionStorage.getItem("vta_auth_refresh");

  const accessToken = sessionAccessToken || cookieAccessToken;
  const refreshToken = sessionRefreshToken || cookieRefreshToken;

  return { accessToken, refreshToken, rememberMe: !!cookieRefreshToken };
};

export const clearTokens = () => {
  sessionStorage.removeItem("vta_auth_access");
  sessionStorage.removeItem("vta_auth_refresh");
  removeAuthCookie();
};

export const setSessionToken = (accessToken, refreshToken) => {
  sessionStorage.setItem("vta_auth_access", accessToken);
  sessionStorage.setItem("vta_auth_refresh", refreshToken);
};

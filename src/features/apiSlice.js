import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "@/features/auth/authSlice";
import { getTokens } from "@/hooks/useToken";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const MAX_RETRY_COUNT = 3;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const { accessToken } = getTokens();
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const { accessToken, refreshToken, rememberMe } = getTokens();
  let retryCount = 0;

  while (
    (!accessToken || (result.error && result.error.status === 401)) &&
    retryCount < MAX_RETRY_COUNT
  ) {
    retryCount++;
    try {
      if (refreshToken) {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh-token",
            method: "POST",
            body: { refreshToken },
            credentials: "include",
          },
          api,
          extraOptions
        );

        if (refreshResult.data?.success) {
          api.dispatch(
            userLoggedIn({
              accessToken: refreshResult?.data?.data?.accessToken,
              refreshToken: refreshResult?.data?.data?.refreshToken,
              rememberMe,
            })
          );

          // Retry the original request with new token
          result = await baseQuery(args, api, extraOptions);
          break;
        } else {
          api.dispatch(userLoggedOut());
          break;
        }
      } else {
        api.dispatch(userLoggedOut());
        break;
      }
    } catch (error) {
      console.error("Refresh token failed:", error);
      api.dispatch(userLoggedOut());
      break;
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["user-details", "user-projects", "tests", "project-tests"],
  endpoints: (builder) => ({}),
});
